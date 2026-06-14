"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import ProductImage, { PLACEHOLDER } from "@/components/shop/ProductImage";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, subtotal, count } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 bottom-0 z-[80] w-full max-w-[420px] bg-brand-bg border-l border-brand-border flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border shrink-0">
          <div>
            <h2 className="font-heading font-semibold text-brand-indigo text-xl">
              Your Bag
            </h2>
            {count > 0 && (
              <p className="font-body text-[11px] text-brand-muted mt-0.5">
                {count} {count === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="text-brand-border mb-4"
              aria-hidden="true"
            >
              <path
                d="M8 8h4l5 16h14l3-11H13M28 30a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18 30a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-body text-brand-muted text-sm mb-4">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="font-body text-[11px] tracking-[0.2em] uppercase text-primary underline underline-offset-2"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {items.map((item) => (
              <div key={item.key} className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-[72px] aspect-[3/4] shrink-0 relative overflow-hidden bg-brand-surface">
                  <ProductImage
                    src={item.imageUrl ?? PLACEHOLDER}
                    alt={item.productName}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.productSlug}`}
                      onClick={closeDrawer}
                      className="font-heading font-medium text-brand-text text-sm leading-snug hover:text-primary transition-colors"
                    >
                      {item.productName}
                    </Link>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="shrink-0 text-brand-muted hover:text-brand-text transition-colors mt-0.5"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path
                          d="M1 1L10 10M10 1L1 10"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="font-body text-[11px] text-brand-muted mt-1">
                    {item.size}
                    {item.wash ? ` · ${item.wash}` : ""}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-brand-border">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-body text-sm text-brand-text select-none">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-body text-sm font-medium text-brand-text">
                      {formatPrice(item.unitPrice * item.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-border px-6 py-5 space-y-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-brand-muted">Subtotal</span>
              <span className="font-heading font-semibold text-brand-indigo text-xl">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="font-body text-[10px] text-brand-muted">
              Shipping calculated at checkout
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full h-12 flex items-center justify-center bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-primary transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full h-10 flex items-center justify-center border border-brand-border text-brand-muted font-body text-[11px] tracking-[0.2em] uppercase hover:border-brand-muted hover:text-brand-text transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
