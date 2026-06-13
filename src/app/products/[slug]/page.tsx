import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getProducts,
  formatPrice,
} from "@/lib/storefront";
import ImageGallery from "@/components/shop/ImageGallery";
import VariantSelectors from "@/components/shop/VariantSelectors";
import SizeGuide from "@/components/shop/SizeGuide";
import ProductCard from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const description =
    product.description ??
    `Shop ${product.name} — premium heritage denim from Blue Heritage Denim.`;
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt ?? product.name }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Related: same category, excluding this product, limit 4
  const related = await getProducts({
    categorySlug: product.category?.slug,
    limit: 5,
  }).then((items) => items.filter((p) => p.slug !== product.slug).slice(0, 4));

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.basePrice / 100,
      availability:
        product.variants.some((v) => v.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  const collectionLinks = product.collections.map((pc) => pc.collection);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-8">
          <Link href="/shop" className="hover:text-brand-text transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/shop/${product.category.slug}`}
                className="hover:text-brand-text transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-brand-text truncate max-w-[160px]">
            {product.name}
          </span>
        </nav>

        {/* Main grid: gallery | info */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            {/* Category + Collection tags */}
            <div className="flex flex-wrap items-center gap-2">
              {product.category && (
                <Link
                  href={`/shop/${product.category.slug}`}
                  className="font-body text-[9px] font-semibold tracking-[0.25em] uppercase text-brand-tan hover:text-brand-text transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
              {collectionLinks.map((col) => (
                <span
                  key={col.id}
                  className="font-body text-[9px] tracking-[0.2em] uppercase text-brand-muted border border-brand-border px-2 py-0.5"
                >
                  {col.name}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="font-heading font-semibold text-brand-indigo text-3xl lg:text-4xl leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            {product.description && (
              <p className="font-body text-brand-muted text-[15px] leading-[1.85]">
                {product.description}
              </p>
            )}

            {/* Variant selectors + price + Add to Cart */}
            <VariantSelectors
              variants={product.variants}
              basePrice={product.basePrice}
              productSlug={product.slug}
              productName={product.name}
              imageUrl={product.images[0]?.url ?? null}
            />

            {/* Body / detailed copy */}
            {product.body && (
              <div className="border-t border-brand-border pt-6">
                <p className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-3">
                  About This Piece
                </p>
                <p className="font-body text-sm text-brand-muted leading-[1.85]">
                  {product.body}
                </p>
              </div>
            )}

            {/* Size guide accordion */}
            <SizeGuide />

            {/* Free shipping note */}
            <div className="border-t border-brand-border pt-5 flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-brand-muted shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <path
                  d="M1 4h10v7H1V4zM11 6l3 2v3h-3V6zM3.5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-body text-[11px] text-brand-muted leading-relaxed">
                Free shipping on orders over{" "}
                <span className="text-brand-text">{formatPrice(200000)}</span>.
                Standard delivery 3–5 working days.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 lg:mt-28 border-t border-brand-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-semibold text-brand-indigo text-2xl">
                You May Also Like
              </h2>
              <Link
                href={product.category ? `/shop/${product.category.slug}` : "/shop"}
                className="font-body text-[10px] tracking-[0.2em] uppercase text-primary hover:underline underline-offset-2 transition-all"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
