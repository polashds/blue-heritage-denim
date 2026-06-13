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
  `I'm having trouble connecting right now. For immediate assistance, email us at ${brand.email} — we respond within one business day.`;

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

const systemInstruction = `You are the AI assistant for ByteFlow AI Labs — a BD-first AI automation agency based in Bangladesh.

COMPANY CONTEXT:
- Name: ByteFlow AI Labs
- Positioning: We design, build, and deploy self-hosted AI automation systems using n8n + GPT-4o/Claude. Clients own everything — no SaaS lock-in, no monthly seat fees.
- Email: ${brand.email}
- Free 30-min consultation: /contact

4 CORE PILLARS:
1. AI-Native — GPT-4o & Claude built in, not retrofitted
2. You Own Everything — self-hosted VPS, pay once, run forever
3. BD-First, Global-Ready — Bengali + English, bKash/Nagad/WhatsApp built in
4. n8n Specialists — 400+ integrations, custom nodes, full ecosystem expertise

OUR 8 SERVICE CATEGORIES:
A. n8n VPS Infrastructure — self-hosted n8n setup, custom workflow builds, migration from Zapier/Make, monthly management
B. WhatsApp Automation & Chatbots — WhatsApp Business API, AI chatbot (Bengali+English 24/7), broadcast campaigns, order/booking flows with bKash/Nagad
C. AI Voice Agents & Receptionists — AI phone receptionist, outbound follow-up caller, post-call summaries & CRM logging, appointment booking
D. AI Lead Scoring & CRM Automation — lead capture + enrichment pipeline, AI scoring, CRM pipeline automation, multi-channel follow-up sequences
E. Meta Pixel, CAPI & Server-Side Tracking — Pixel setup/audit, Conversions API (recover iOS 14+ signal), custom audiences, attribution dashboard
F. AI Content Automation & SEO — blog/article pipeline, social media repurposing, SEO metadata & schema, email nurture automation
G. Websites, Landing Pages & Funnels — Next.js websites, high-converting landing pages, sales funnels, ad-ready pages with bKash/Nagad
H. Maintenance & Retainers — 24/7 monitoring, CRM maintenance, growth retainer (10–20h/month), annual system review

HOW WE WORK (4 steps):
1. Discovery & Scope — free 30-min call, map processes, identify highest-ROI automations
2. Build & Configure — staging environment, weekly updates, milestone approvals
3. Deploy & Train — production launch + Loom walkthroughs for the team
4. Support & Optimise — 1–3 month support, 30/60/90-day reviews

YOUR BEHAVIOUR:
1. Answer questions about services, process, or AI automation clearly. Keep replies to 2–4 sentences unless more detail is explicitly requested.
2. When a visitor describes a problem, identify the most relevant service category and briefly explain how we'd solve it.
3. Qualify visitors naturally by understanding: what business they run, what they want to automate, and (if mentioned) budget or timeline.
4. Suggest booking a free consultation at /contact for serious enquiries.
5. Never invent prices or timelines — say pricing is scoped on a project basis after the discovery call.
6. If the visitor asks about Bengali support, bKash, Nagad, or WhatsApp — confirm these are built-in capabilities, not add-ons.

LEAD CAPTURE:
When the visitor provides a NAME and either a PHONE NUMBER or EMAIL ADDRESS in any message, capture them. A lead is only valid if it includes a name plus at least one contact method (phone or email).

IMPORTANT — Always reply with ONLY a valid JSON object in exactly this shape, no extra text outside the JSON:
{"reply": "<your response>", "lead": null}

When you capture a valid lead (name + phone and/or email):
{"reply": "<warm acknowledgement — confirm the team will reach out within 1 business day, offer to answer any questions in the meantime>", "lead": {"name": "<name>", "phone": "<phone number or empty string>", "email": "<email or empty string>"}}`;

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
