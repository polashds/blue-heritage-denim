import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Order Confirmed — Blue Heritage Denim" };
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ ref?: string }>;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref } = await searchParams;
  if (!ref) notFound();

  const order = await prisma.order.findUnique({
    where: { orderNumber: ref },
    include: { items: { orderBy: { id: "asc" } } },
  });
  if (!order) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24">
      {/* Success indicator */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mx-auto mb-6">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            className="text-brand-indigo"
            aria-hidden="true"
          >
            <path
              d="M4 13L10 19L22 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-brand-muted mb-3">
          Thank You
        </p>
        <h1 className="font-heading font-semibold text-brand-indigo text-3xl lg:text-4xl mb-4">
          Order Confirmed
        </h1>
        <p className="font-body text-brand-muted text-sm">
          Order{" "}
          <span className="font-semibold text-brand-text">{order.orderNumber}</span> placed on{" "}
          {order.createdAt.toLocaleDateString("en-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Payment instructions — bank transfer */}
      {order.paymentMethod === "BankTransfer" && (
        <div className="mb-8 p-6 bg-brand-surface border border-brand-border">
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-brand-tan mb-4">
            Action Required — Bank Transfer
          </p>
          <p className="font-body text-sm text-brand-muted mb-5">
            Please transfer{" "}
            <strong className="text-brand-text">{formatPrice(order.total)}</strong> to
            the account below. Use your order number as the payment reference.
          </p>
          <dl className="font-body text-sm space-y-2">
            {(
              [
                ["Bank", "BRAC Bank Ltd."],
                ["Account Name", "Blue Heritage Denim"],
                ["Account No.", "1234567890"],
                ["Branch", "Mirpur, Dhaka"],
                ["Reference", order.orderNumber],
                ["Amount", formatPrice(order.total)],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <dt className="text-brand-muted w-32 shrink-0">{label}</dt>
                <dd
                  className={`text-brand-text${
                    label === "Reference" ? " font-semibold tracking-wider" : ""
                  }`}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="font-body text-xs text-brand-muted mt-4">
            Your order will be confirmed within 24 hours of payment receipt.
          </p>
        </div>
      )}

      {/* COD note */}
      {order.paymentMethod === "COD" && (
        <div className="mb-8 p-4 bg-brand-surface border border-brand-border">
          <p className="font-body text-sm text-brand-muted">
            <span className="font-medium text-brand-text">Cash on Delivery</span> — you
            will pay{" "}
            <span className="font-medium text-brand-text">{formatPrice(order.total)}</span>{" "}
            when your order arrives.
          </p>
        </div>
      )}

      {/* Items ordered */}
      <div className="mb-8">
        <h2 className="font-heading font-medium text-brand-indigo text-lg mb-4 pb-3 border-b border-brand-border">
          Items Ordered
        </h2>
        <div className="divide-y divide-brand-border">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-body text-sm text-brand-text">{item.productName}</p>
                <p className="font-body text-xs text-brand-muted mt-0.5">
                  Size {item.size}
                  {item.wash ? ` · ${item.wash}` : ""} × {item.qty}
                </p>
              </div>
              <p className="font-body text-sm font-medium text-brand-text shrink-0">
                {formatPrice(item.unitPrice * item.qty)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-brand-border space-y-2">
          <div className="flex justify-between font-body text-sm">
            <span className="text-brand-muted">Subtotal</span>
            <span className="text-brand-text">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-brand-muted">Shipping</span>
            <span className="text-brand-text">
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between font-heading font-semibold text-base pt-2 border-t border-brand-border">
            <span className="text-brand-indigo">Total</span>
            <span className="text-brand-indigo">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="mb-10">
        <h2 className="font-heading font-medium text-brand-indigo text-lg mb-4 pb-3 border-b border-brand-border">
          Shipping To
        </h2>
        <div className="font-body text-sm space-y-1">
          <p className="font-medium text-brand-text">{order.customerName}</p>
          <p className="text-brand-muted">{order.address}</p>
          <p className="text-brand-muted">
            {order.city}, {order.district}
          </p>
          <p className="text-brand-muted">{order.email}</p>
          <p className="text-brand-muted">{order.phone}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="flex-1 h-12 flex items-center justify-center bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-primary transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="flex-1 h-12 flex items-center justify-center border border-brand-border text-brand-muted font-body text-[11px] tracking-[0.2em] uppercase hover:border-brand-muted hover:text-brand-text transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
