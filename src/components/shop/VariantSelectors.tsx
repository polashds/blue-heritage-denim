"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";

interface Variant {
  size: string;
  wash: string | null;
  stock: number;
  priceOverride: number | null;
}

interface Props {
  variants: Variant[];
  basePrice: number;
  productSlug: string;
  productName: string;
  imageUrl: string | null;
}

export default function VariantSelectors({
  variants,
  basePrice,
  productSlug,
  productName,
  imageUrl,
}: Props) {
  const { addItem } = useCart();

  const sizes = [...new Set(variants.map((v) => v.size))];
  const washes = [
    ...new Set(variants.map((v) => v.wash).filter(Boolean)),
  ] as string[];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedWash, setSelectedWash] = useState<string | null>(
    washes.length === 1 ? washes[0] : null
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function isSizeAvailable(size: string) {
    return variants.some(
      (v) =>
        v.size === size &&
        (selectedWash ? v.wash === selectedWash : true) &&
        v.stock > 0
    );
  }

  function isWashAvailable(wash: string) {
    return variants.some(
      (v) =>
        v.wash === wash &&
        (selectedSize ? v.size === selectedSize : true) &&
        v.stock > 0
    );
  }

  const selectedVariant =
    selectedSize !== null
      ? variants.find(
          (v) =>
            v.size === selectedSize &&
            (washes.length === 0 || v.wash === selectedWash)
        ) ?? null
      : null;

  const stock = selectedVariant?.stock ?? null;
  const isOutOfStock = stock !== null && stock === 0;
  const displayPrice =
    selectedVariant?.priceOverride != null
      ? selectedVariant.priceOverride
      : basePrice;

  function handleAddToCart() {
    if (!selectedSize || isOutOfStock || !selectedVariant) return;
    addItem({
      productSlug,
      productName,
      imageUrl,
      size: selectedSize,
      wash: selectedWash,
      unitPrice: displayPrice,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Price */}
      <p className="font-heading font-semibold text-brand-indigo text-2xl">
        {formatPrice(displayPrice)}
      </p>

      {/* Wash / colour */}
      {washes.length > 1 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted">
              Wash / Colour
            </span>
            {selectedWash && (
              <span className="font-body text-sm text-brand-text">{selectedWash}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {washes.map((wash) => {
              const available = isWashAvailable(wash);
              return (
                <button
                  key={wash}
                  type="button"
                  onClick={() =>
                    setSelectedWash(wash === selectedWash ? null : wash)
                  }
                  disabled={!available}
                  className={`h-9 px-3 font-body text-xs border transition-colors ${
                    selectedWash === wash
                      ? "border-brand-indigo bg-brand-indigo/10 text-brand-indigo"
                      : available
                      ? "border-brand-border text-brand-muted hover:border-brand-muted hover:text-brand-text"
                      : "border-brand-border text-brand-border line-through cursor-not-allowed"
                  }`}
                >
                  {wash}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted">
            Size
          </span>
          {selectedSize && (
            <span className="font-body text-sm text-brand-text">{selectedSize}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const available = isSizeAvailable(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size === selectedSize ? null : size);
                  setAdded(false);
                }}
                disabled={!available}
                className={`h-10 min-w-[44px] px-3 font-body text-sm border transition-colors ${
                  selectedSize === size
                    ? "border-brand-indigo bg-brand-indigo text-white"
                    : available
                    ? "border-brand-border text-brand-text hover:border-brand-muted"
                    : "border-brand-border text-brand-border line-through cursor-not-allowed"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock indicator */}
      {selectedVariant && (
        <p
          className={`font-body text-sm ${
            isOutOfStock
              ? "text-red-600"
              : stock! <= 3
              ? "text-brand-tan"
              : "text-brand-muted"
          }`}
        >
          {isOutOfStock
            ? "Out of stock"
            : stock! <= 3
            ? `Only ${stock} left`
            : "In stock"}
        </p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3">
        {/* Qty stepper */}
        <div className="flex items-center border border-brand-border shrink-0">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-[52px] flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center font-body text-sm text-brand-text select-none">
            {qty}
          </span>
          <button
            type="button"
            onClick={() =>
              setQty((q) =>
                stock !== null ? Math.min(q + 1, stock) : q + 1
              )
            }
            className="w-10 h-[52px] flex items-center justify-center text-lg text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!selectedSize || isOutOfStock}
          className={`flex-1 h-[52px] font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
            added
              ? "bg-green-700 text-white"
              : !selectedSize || isOutOfStock
              ? "bg-brand-surface text-brand-muted cursor-not-allowed"
              : "bg-brand-indigo text-white hover:bg-primary"
          }`}
        >
          {added
            ? "Added ✓"
            : isOutOfStock
            ? "Out of Stock"
            : !selectedSize
            ? "Select a Size"
            : "Add to Cart"}
        </button>
      </div>

      <p className="font-body text-[10px] text-brand-muted text-center">
        Free shipping on orders over ৳2,000
      </p>
    </div>
  );
}
