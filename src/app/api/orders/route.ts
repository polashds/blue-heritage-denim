import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

const FLAT_SHIPPING = 12000; // ৳120 in paisa
const FREE_THRESHOLD = 200000; // ৳2,000 in paisa

const ItemSchema = z.object({
  productName: z.string().min(1),
  size: z.string().min(1),
  wash: z.string().nullable().optional(),
  unitPrice: z.number().int().positive(),
  qty: z.number().int().positive(),
});

const OrderSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(3),
  city: z.string().min(2),
  district: z.string().min(2),
  notes: z.string().optional(),
  paymentMethod: z.enum(["COD", "BankTransfer"]),
  items: z.array(ItemSchema).min(1),
});

function generateOrderNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `BHD-${rand}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON" } }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Validation failed", issues: parsed.error.issues } },
      { status: 422 }
    );
  }

  const d = parsed.data;
  const subtotal = d.items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const shipping = subtotal >= FREE_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  // Collision-safe order number
  let orderNumber = generateOrderNumber();
  for (let i = 0; i < 5; i++) {
    const exists = await prisma.order.findUnique({ where: { orderNumber } });
    if (!exists) break;
    orderNumber = generateOrderNumber();
  }

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: d.customerName,
      email: d.email,
      phone: d.phone,
      address: d.address,
      city: d.city,
      district: d.district,
      notes: d.notes,
      subtotal,
      shipping,
      total,
      paymentMethod: d.paymentMethod as PaymentMethod,
      paymentStatus: PaymentStatus.Pending,
      items: {
        create: d.items.map((i) => ({
          productName: i.productName,
          size: i.size,
          wash: i.wash ?? null,
          unitPrice: i.unitPrice,
          qty: i.qty,
        })),
      },
    },
    include: { items: true },
  });

  // Fire-and-forget webhook for n8n automation (amounts in BDT taka, not paisa)
  const webhookUrl = process.env.N8N_ORDER_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_order",
        orderNumber: order.orderNumber,
        customer: {
          name: order.customerName,
          email: order.email,
          phone: order.phone,
        },
        shipping_address: {
          address: order.address,
          city: order.city,
          district: order.district,
        },
        payment: {
          method: order.paymentMethod,
          status: order.paymentStatus,
        },
        items: order.items.map((i) => ({
          name: i.productName,
          size: i.size,
          wash: i.wash ?? null,
          qty: i.qty,
          unitPrice: Math.round(i.unitPrice / 100),
          lineTotal: Math.round((i.unitPrice * i.qty) / 100),
        })),
        totals: {
          subtotal: Math.round(order.subtotal / 100),
          shipping: Math.round(order.shipping / 100),
          total: Math.round(order.total / 100),
        },
        currency: "BDT",
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ orderNumber: order.orderNumber });
}
