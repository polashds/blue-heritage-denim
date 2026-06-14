"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import ProductImage, { PLACEHOLDER } from "@/components/shop/ProductImage";

const FLAT_SHIPPING = 12000; // ৳120 in paisa
const FREE_THRESHOLD = 200000; // ৳2,000 in paisa

const PAYMENT_OPTIONS = [
  {
    id: "COD",
    name: "Cash on Delivery",
    description: "Pay when your order arrives.",
    available: true,
  },
  {
    id: "BankTransfer",
    name: "Manual Bank Transfer",
    description: "Transfer to our account — we'll confirm within 24 hours.",
    available: true,
  },
  {
    id: "SSLCommerz",
    name: "SSLCommerz",
    description: "Online card payment. Coming soon.",
    available: false,
  },
  {
    id: "BKash",
    name: "bKash",
    description: "Mobile banking. Coming soon.",
    available: false,
  },
];

interface FormFields {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  notes: string;
  paymentMethod: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

const INITIAL: FormFields = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  notes: "",
  paymentMethod: "COD",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormFields>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => setMounted(true), []);

  const shipping = subtotal >= FREE_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  function set(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.customerName.trim()) errs.customerName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Valid email address required";
    if (form.phone.trim().length < 7) errs.phone = "Valid phone number required";
    if (!form.address.trim()) errs.address = "Street address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.district.trim()) errs.district = "District is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          district: form.district,
          notes: form.notes || undefined,
          paymentMethod: form.paymentMethod,
          items: items.map((i) => ({
            productName: i.productName,
            size: i.size,
            wash: i.wash ?? null,
            unitPrice: i.unitPrice,
            qty: i.qty,
          })),
        }),
      });
      const data = (await res.json()) as { orderNumber?: string; error?: { message?: string } };
      if (!res.ok) {
        setApiError(data.error?.message ?? "Failed to place order. Please try again.");
        return;
      }
      clearCart();
      router.push(`/orders/confirmation?ref=${data.orderNumber}`);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Loading skeleton while localStorage hydrates
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="font-body text-brand-muted text-sm animate-pulse">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-32 text-center">
        <p className="font-heading text-brand-indigo text-xl mb-4">Your bag is empty</p>
        <Link
          href="/shop"
          className="font-body text-sm text-primary underline underline-offset-2"
        >
          Browse Products →
        </Link>
      </div>
    );
  }

  const labelCls =
    "block font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-1.5";
  const inputCls = (field: keyof FormFields) =>
    `w-full bg-brand-bg border font-body text-sm text-brand-text px-4 py-3 placeholder:text-brand-muted/40 focus:outline-none transition-colors duration-150 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-brand-border focus:border-primary"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-brand-muted mb-2">
          Blue Heritage Denim
        </p>
        <h1 className="font-heading font-semibold text-brand-indigo text-3xl lg:text-4xl">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
          {/* ── Left: form ────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Customer info */}
            <section>
              <h2 className="font-heading font-medium text-brand-indigo text-lg mb-5 pb-3 border-b border-brand-border">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => set("customerName", e.target.value)}
                    placeholder="Your full name"
                    className={inputCls("customerName")}
                    autoComplete="name"
                  />
                  {errors.customerName && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.customerName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls("email")}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+880 17XX-XXXXXX"
                      className={inputCls("phone")}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping address */}
            <section>
              <h2 className="font-heading font-medium text-brand-indigo text-lg mb-5 pb-3 border-b border-brand-border">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Street Address *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="House no, road no, area"
                    className={inputCls("address")}
                    autoComplete="street-address"
                  />
                  {errors.address && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>City *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Dhaka"
                      className={inputCls("city")}
                      autoComplete="address-level2"
                    />
                    {errors.city && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>District *</label>
                    <input
                      type="text"
                      value={form.district}
                      onChange={(e) => set("district", e.target.value)}
                      placeholder="Dhaka"
                      className={inputCls("district")}
                    />
                    {errors.district && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.district}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Order Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    placeholder="Special instructions, landmarks, etc."
                    className={`${inputCls("notes")} resize-none`}
                  />
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section>
              <h2 className="font-heading font-medium text-brand-indigo text-lg mb-5 pb-3 border-b border-brand-border">
                Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-4 p-4 border transition-colors ${
                      !opt.available
                        ? "border-brand-border opacity-50 cursor-not-allowed"
                        : form.paymentMethod === opt.id
                        ? "border-brand-indigo bg-brand-indigo/5 cursor-pointer"
                        : "border-brand-border hover:border-brand-muted cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.id}
                      checked={form.paymentMethod === opt.id}
                      disabled={!opt.available}
                      onChange={() => opt.available && set("paymentMethod", opt.id)}
                      className="mt-0.5 accent-[#1E3A5F]"
                    />
                    <div>
                      <p className="font-body text-sm font-medium text-brand-text">{opt.name}</p>
                      <p className="font-body text-xs text-brand-muted mt-0.5">{opt.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Bank transfer details */}
              {form.paymentMethod === "BankTransfer" && (
                <div className="mt-4 p-5 bg-brand-surface border border-brand-border">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-3">
                    Transfer Details
                  </p>
                  <dl className="font-body text-sm space-y-2">
                    {[
                      ["Bank", "BRAC Bank Ltd."],
                      ["Account Name", "Blue Heritage Denim"],
                      ["Account No.", "1234567890"],
                      ["Branch", "Mirpur, Dhaka"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex gap-4">
                        <dt className="text-brand-muted w-28 shrink-0">{label}</dt>
                        <dd className="text-brand-text">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="font-body text-xs text-brand-tan mt-3">
                    Use your order number as the payment reference. Your order will be
                    confirmed within 24 hours.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* ── Right: order summary ───────────────────────────── */}
          <aside>
            <div className="border border-brand-border p-6 sticky top-[88px]">
              <h2 className="font-heading font-medium text-brand-indigo text-lg mb-5 pb-3 border-b border-brand-border">
                Order Summary
              </h2>

              <div className="space-y-5 mb-5">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="w-14 aspect-[3/4] shrink-0 relative overflow-hidden bg-brand-surface">
                      <ProductImage
                        src={item.imageUrl ?? PLACEHOLDER}
                        alt={item.productName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-indigo text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-brand-text leading-snug">
                        {item.productName}
                      </p>
                      <p className="font-body text-[11px] text-brand-muted mt-0.5">
                        {item.size}
                        {item.wash ? ` · ${item.wash}` : ""}
                      </p>
                      <p className="font-body text-sm font-medium text-brand-text mt-1">
                        {formatPrice(item.unitPrice * item.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-border pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="text-brand-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-brand-muted">Shipping</span>
                  <span className="text-brand-text">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="font-body text-[10px] text-brand-muted">
                    Free on orders over {formatPrice(FREE_THRESHOLD)}
                  </p>
                )}
                <div className="flex justify-between font-heading font-semibold text-base pt-3 border-t border-brand-border">
                  <span className="text-brand-indigo">Total</span>
                  <span className="text-brand-indigo">{formatPrice(total)}</span>
                </div>
              </div>

              {apiError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 font-body text-sm text-red-600">
                  {apiError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 py-4 bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Placing order…" : "Place Order →"}
              </button>

              <p className="font-body text-[10px] text-brand-muted text-center mt-3">
                By placing your order you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-1">
                  Terms
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
