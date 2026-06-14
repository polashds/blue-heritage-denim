"use server";

import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";
import { z } from "zod";
import { COMPANY_EMAIL } from "@/lib/constants";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  message: z.string().optional(),
});

const WholesaleSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  volume: z.string().optional(),
  message: z.string().optional(),
});

function fireWebhook(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export async function submitContact(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    message: formData.get("message") || undefined,
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Please fill in your name." };

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        message: parsed.data.message || null,
        source: LeadSource.Contact,
      },
    });

    fireWebhook({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
      createdAt: lead.createdAt,
    });

    return { success: true };
  } catch (e) {
    console.error("submitContact error", e);
    return { success: false, error: `Something went wrong. Please email us at ${COMPANY_EMAIL}.` };
  }
}

export async function submitWholesale(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const raw = {
    company: formData.get("company"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    volume: formData.get("volume") || undefined,
    message: formData.get("message") || undefined,
  };

  const parsed = WholesaleSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Please fill in your name, company, and email." };

  const composedMessage = [
    `Company: ${parsed.data.company}`,
    parsed.data.volume ? `Monthly Volume: ${parsed.data.volume}` : null,
    parsed.data.message || null,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        message: composedMessage,
        source: LeadSource.Wholesale,
      },
    });

    fireWebhook({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
      createdAt: lead.createdAt,
    });

    return { success: true };
  } catch (e) {
    console.error("submitWholesale error", e);
    return { success: false, error: `Something went wrong. Please email us at ${COMPANY_EMAIL}.` };
  }
}
