import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";
import { brand } from "@/config/branding";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface CapturedLead {
  name: string;
  phone: string;
  email: string;
}

interface GeminiResponse {
  reply: string;
  lead: CapturedLead | null;
}

const FALLBACK_REPLY =
  `I'm having trouble connecting right now. For help, email us at ${brand.email} — we respond within one business day.`;

function fireWebhook(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {}
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch {}
  }
  return null;
}

// Neutral placeholder system instruction — replaced with full denim shopping assistant in Phase 8
const systemInstruction = `You are the customer service assistant for ${brand.name}.

ABOUT US:
- ${brand.name} makes premium heritage denim — built with exceptional materials, designed for modern everyday life.
- Email: ${brand.email}
- We are currently building out our online store. Full shopping functionality is coming soon.

YOUR BEHAVIOUR:
1. Be warm, knowledgeable, and concise. Keep replies to 2–4 sentences.
2. If asked about products, sizing, or collections, acknowledge the question and let the visitor know the full store is launching soon. Invite them to leave their contact details for early access.
3. Invite serious enquiries to email us directly at ${brand.email}.
4. For wholesale enquiries, confirm we offer trade pricing and ask them to send details via email.
5. Never invent prices or product specifications.

LEAD CAPTURE:
When the visitor provides a NAME and either a PHONE NUMBER or EMAIL ADDRESS, capture them as a lead.

IMPORTANT — Always reply with ONLY a valid JSON object in exactly this shape, no extra text outside the JSON:
{"reply": "<your response>", "lead": null}

When you capture a valid lead (name + phone and/or email):
{"reply": "<warm acknowledgement — confirm we'll be in touch and they'll get early access>", "lead": {"name": "<name>", "phone": "<phone or empty string>", "email": "<email or empty string>"}}`;

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];

  try {
    const body = await req.json();
    if (Array.isArray(body.messages)) {
      messages = body.messages;
    } else if (typeof body.message === "string" && body.message) {
      messages = [{ role: "user", text: body.message }];
    }
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "no user message" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  const firstUserIdx = messages.findIndex((m) => m.role === "user");
  const contents = messages.slice(firstUserIdx).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }));

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.35,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!res.ok) {
      console.error("Gemini API error", res.status, await res.text());
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const data = await res.json();
    const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let reply = FALLBACK_REPLY;
    let capturedLead: CapturedLead | null = null;

    const parsed = extractJson(rawText) as GeminiResponse | null;
    if (parsed && typeof parsed.reply === "string") {
      reply = parsed.reply;
      const l = parsed.lead;
      if (
        l &&
        typeof l.name === "string" &&
        l.name.trim() &&
        ((typeof l.phone === "string" && l.phone.trim()) ||
          (typeof l.email === "string" && l.email.trim()))
      ) {
        capturedLead = {
          name: l.name.trim(),
          phone: typeof l.phone === "string" ? l.phone.trim() : "",
          email: typeof l.email === "string" ? l.email.trim() : "",
        };
      }
    } else if (rawText) {
      reply = rawText;
    }

    let leadSaved = false;
    if (capturedLead) {
      try {
        const lastUserMessage = [...messages]
          .reverse()
          .find((m) => m.role === "user")?.text;

        const lead = await prisma.lead.create({
          data: {
            name: capturedLead.name,
            phone: capturedLead.phone || null,
            email: capturedLead.email || null,
            message: lastUserMessage ?? null,
            source: LeadSource.Chatbot,
          },
        });

        fireWebhook({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          message: lead.message,
          source: lead.source,
          createdAt: lead.createdAt,
        });
        leadSaved = true;
      } catch (e) {
        console.error("Chatbot lead creation failed", e);
      }
    }

    return NextResponse.json({ reply, ...(leadSaved ? { leadCaptured: true } : {}) });
  } catch (e) {
    console.error("Chat route error", e);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
