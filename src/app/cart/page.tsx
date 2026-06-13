"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import SmartImage from "@/components/shop/SmartImage";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

const FLAT_SHIPPING = 12000; // ৳120 in paisa
const FREE_THRESHOLD = 200000; // ৳2,000 in paisa

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shipping = subtotal >= FREE_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="font-body text-brand-muted text-sm animate-pulse">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-32 text-center">
        <h1 className="font-heading font-semibold text-brand-indigo text-3xl mb-4">
          Your Bag
        </h1>
        <p className="font-body text-brand-muted text-sm mb-6">
          You haven&apos;t added any items yet.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-primary transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-brand-muted mb-2">
          Blue Heritage Denim
        </p>
        <h1 className="font-heading font-semibold text-brand-indigo text-4xl">
          Your Bag
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
        {/* Item list */}
        <div>
          {/* Desktop column headers */}
          <div className="hidden md:grid grid-cols-[80px_1fr_120px_auto] gap-6 pb-3 border-b border-brand-border font-body text-[9px] tracking-[0.25em] uppercase text-brand-muted">
            <span className="col-span-2">Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
          </div>

          <div className="divide-y divide-brand-border">
            {items.map((item) => (
              <div
                key={item.key}
                className="py-6 grid grid-cols-[80px_1fr] md:grid-cols-[80px_1fr_120px_auto] gap-4 md:gap-6 items-start"
              >
                {/* Image */}
                <div className="w-20 aspect-[3/4] relative overflow-hidden bg-brand-surface shrink-0">
                  {item.imageUrl ? (
                    <SmartImage
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder alt={item.productName} />
                  )}
                </div>

                {/* Name + variant */}
                <div className="min-w-0">
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="font-heading font-medium text-brand-text text-base hover:text-primary transition-colors block"
                  >
                    {item.productName}
                  </Link>
                  <p className="font-body text-xs text-brand-muted mt-1">
                    Size {item.size}
                    {item.wash ? ` · ${item.wash}` : ""}
                  </p>
                  <p className="font-body text-sm text-brand-muted mt-1">
                    {formatPrice(item.unitPrice)} each
                  </p>
                  {/* Mobile: qty + remove inline */}
                  <div className="flex items-center gap-4 mt-4 md:hidden">
                    <div className="flex items-center border border-brand-border">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-9 h-9 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="w-9 text-center font-body text-sm text-brand-text select-none">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="font-body text-xs text-brand-muted hover:text-red-500 underline underline-offset-2 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Desktop qty stepper */}
                <div className="hidden md:flex items-center justify-center border border-brand-border self-start">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="w-9 h-9 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-9 text-center font-body text-sm text-brand-text select-none">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="w-9 h-9 flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Desktop: line total + remove */}
                <div className="hidden md:flex flex-col items-end gap-3 self-start">
                  <p className="font-body text-sm font-medium text-brand-text">
                    {formatPrice(item.unitPrice * item.qty)}
                  </p>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="font-body text-[10px] text-brand-muted hover:text-red-500 underline underline-offset-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="font-body text-sm text-brand-muted hover:text-brand-text transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary sidebar */}
        <aside>
          <div className="border border-brand-border p-6 sticky top-[88px]">
            <h2 className="font-heading font-semibold text-brand-indigo text-lg mb-5 pb-4 border-b border-brand-border">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
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
                  Free shipping on orders over {formatPrice(FREE_THRESHOLD)}
                </p>
              )}
              <div className="flex justify-between font-heading font-semibold text-base pt-3 border-t border-brand-border">
                <span className="text-brand-indigo">Total</span>
                <span className="text-brand-indigo">{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full h-12 flex items-center justify-center bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-primary transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
