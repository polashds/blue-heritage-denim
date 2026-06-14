import { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/storefront";
import ProductImage, { PLACEHOLDER } from "@/components/shop/ProductImage";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Blue Heritage Denim collections — Heritage, New Arrivals, Best Sellers, and Limited Edition.",
};
export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12 lg:mb-16">
        <p className="font-body text-[10px] tracking-[0.45em] uppercase text-brand-muted mb-3">
          Blue Heritage Denim
        </p>
        <h1 className="font-heading font-semibold text-brand-indigo text-4xl lg:text-5xl">
          Collections
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group block"
          >
            {/* Image */}
            <div className="aspect-[16/9] relative overflow-hidden bg-brand-surface">
              <ProductImage
                src={col.image ?? PLACEHOLDER}
                alt={col.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {col.featured && (
                <span className="absolute top-4 left-4 font-body text-[8px] font-semibold tracking-[0.2em] uppercase bg-brand-indigo text-white px-2.5 py-1.5">
                  Featured
                </span>
              )}
            </div>

            {/* Details */}
            <div className="pt-5 border-t border-brand-border mt-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading font-semibold text-brand-indigo text-xl group-hover:text-primary transition-colors duration-200">
                  {col.name}
                </h2>
                <span className="font-body text-[11px] text-brand-muted">
                  {col._count.products}{" "}
                  {col._count.products === 1 ? "piece" : "pieces"}
                </span>
              </div>
              {col.description && (
                <p className="font-body text-sm text-brand-muted leading-relaxed mt-2 line-clamp-2">
                  {col.description}
                </p>
              )}
              <span className="inline-block font-body text-[10px] tracking-[0.2em] uppercase text-primary mt-4 group-hover:underline underline-offset-2 transition-all">
                Shop Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
