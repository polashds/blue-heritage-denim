import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("A valid email address is required."),
});

function fireWebhook(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_MAGNET_WEBHOOK_URL;
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ success: false, error: first }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        service: "Lead Magnet: 10 AI Automations",
        source: LeadSource.LeadMagnet,
      },
    });

    fireWebhook({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      service: lead.service,
      source: lead.source,
      createdAt: lead.createdAt,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("lead-magnet error", e);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
