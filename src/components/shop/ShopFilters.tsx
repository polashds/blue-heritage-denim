"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Category {
  name: string;
  slug: string;
  _count: { products: number };
}

interface Props {
  categories: Category[];
  sizes: string[];
  activeSizes: string[];
  activeCategory?: string;
  activeSort: string;
  hideCategories?: boolean;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function ShopFilters({
  categories,
  sizes,
  activeSizes,
  activeCategory,
  activeSort,
  hideCategories = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const push = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(sp.toString());
      params.delete("page");
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") {
          params.delete(k);
        } else if (Array.isArray(v)) {
          params.delete(k);
          v.forEach((item) => params.append(k, item));
        } else {
          params.set(k, v);
        }
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? "?" + qs : ""}`);
    },
    [router, pathname, sp]
  );

  const toggleSize = (size: string) => {
    const next = activeSizes.includes(size)
      ? activeSizes.filter((s) => s !== size)
      : [...activeSizes, size];
    push({ sizes: next.length ? next : null });
  };

  const clearAll = () => router.push(pathname);

  const hasActiveFilters =
    !!activeCategory ||
    activeSizes.length > 0 ||
    (activeSort && activeSort !== "newest");

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <p className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-3">
          Sort
        </p>
        <select
          value={activeSort || "newest"}
          onChange={(e) => push({ sort: e.target.value })}
          className="w-full font-body text-sm text-brand-text bg-brand-bg border border-brand-border px-3 py-2 appearance-none focus:outline-none focus:border-primary"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      {!hideCategories && categories.length > 0 && (
        <div>
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-3">
            Category
          </p>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => push({ category: null })}
                className={`font-body text-sm w-full text-left py-1 transition-colors ${
                  !activeCategory
                    ? "text-primary font-medium"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                All
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() =>
                    push({ category: cat.slug === activeCategory ? null : cat.slug })
                  }
                  className={`font-body text-sm w-full text-left py-1 flex items-center justify-between transition-colors ${
                    activeCategory === cat.slug
                      ? "text-primary font-medium"
                      : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  {cat.name}
                  <span className="text-[11px] text-brand-muted/60">
                    {cat._count.products}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div>
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-3">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`h-8 min-w-[36px] px-2 font-body text-xs border transition-colors ${
                  activeSizes.includes(size)
                    ? "border-primary bg-primary text-white"
                    : "border-brand-border text-brand-muted hover:border-brand-muted"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-brand-tan hover:text-brand-text transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-brand-text border border-brand-border px-4 py-2.5 hover:border-brand-muted transition-colors"
        >
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
            <path d="M0 1h14M3 5.5h8M5 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Filter & Sort
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <FilterPanel />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-[55] bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-[60] w-72 bg-brand-bg border-r border-brand-border p-6 overflow-y-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-muted">
                Filters
              </p>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-brand-muted hover:text-brand-text transition-colors"
                aria-label="Close filters"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <FilterPanel />
          </div>
        </>
      )}
    </>
  );
}
