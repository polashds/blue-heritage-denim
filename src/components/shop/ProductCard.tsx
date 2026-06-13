import Link from "next/link";
import { formatPrice } from "@/lib/storefront";
import type { ProductListItem } from "@/lib/storefront";
import ImagePlaceholder from "./ImagePlaceholder";
import SmartImage from "./SmartImage";

export default function ProductCard({ product }: { product: ProductListItem }) {
  const [primary, secondary] = product.images;
  const sizes = [...new Set(product.variants.map((v) => v.size))];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image area */}
      <div className="aspect-[4/5] overflow-hidden bg-brand-surface relative">
        {primary ? (
          <>
            <SmartImage
              src={primary.url}
              alt={primary.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                secondary ? "group-hover:opacity-0" : ""
              }`}
            />
            {secondary && (
              <SmartImage
                src={secondary.url}
                alt={secondary.alt ?? product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
              />
            )}
          </>
        ) : (
          <ImagePlaceholder alt={product.name} />
        )}

        {product.featured && (
          <span className="absolute top-3 left-3 font-body text-[8px] font-semibold tracking-[0.2em] uppercase bg-brand-indigo text-white px-2 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Details */}
      <div className="pt-4 pb-2">
        {product.category && (
          <p className="font-body text-[9px] font-medium tracking-[0.25em] uppercase text-brand-tan mb-1.5">
            {product.category.name}
          </p>
        )}
        <h3 className="font-heading font-medium text-brand-text text-[15px] leading-snug group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-baseline justify-between mt-2">
          <p className="font-body text-brand-text text-sm font-medium">
            {formatPrice(product.basePrice)}
          </p>
          {sizes.length > 0 && (
            <p className="font-body text-[10px] text-brand-muted">
              {sizes.length} size{sizes.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
