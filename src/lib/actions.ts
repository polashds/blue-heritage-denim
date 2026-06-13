"use server";

import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";
import { z } from "zod";
import { COMPANY_EMAIL } from "@/lib/constants";

const ContactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
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
    company: formData.get("company") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    budget: formData.get("budget") || undefined,
    message: formData.get("message") || undefined,
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Please fill in your name." };

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company || null,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        service: parsed.data.service || null,
        budget: parsed.data.budget || null,
        message: parsed.data.message || null,
        source: LeadSource.Contact,
      },
    });

    fireWebhook({
      id: lead.id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      budget: lead.budget,
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
