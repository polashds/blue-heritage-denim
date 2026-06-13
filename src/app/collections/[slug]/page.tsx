import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  getProducts,
  getProductCount,
  getCategories,
  getSizes,
} from "@/lib/storefront";
import ProductCard from "@/components/shop/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
  sort?: string;
  sizes?: string | string[];
  page?: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = await prisma.collection.findUnique({ where: { slug } });
  if (!col) return {};
  return {
    title: `${col.name} Collection`,
    description:
      col.description ??
      `Shop the ${col.name} collection from Blue Heritage Denim.`,
  };
}

function pagHref(
  base: string,
  sp: { sort?: string; sizes?: string | string[] },
  page: number
): string {
  const params = new URLSearchParams();
  if (sp.sort && sp.sort !== "newest") params.set("sort", sp.sort);
  const sizesArr = sp.sizes
    ? Array.isArray(sp.sizes)
      ? sp.sizes
      : [sp.sizes]
    : [];
  sizesArr.forEach((s) => params.append("sizes", s));
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `${base}${qs ? "?" + qs : ""}`;
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);

  const col = await prisma.collection.findUnique({ where: { slug } });
  if (!col) notFound();

  const sort = (sp.sort as "newest" | "price_asc" | "price_desc") ?? "newest";
  const rawSizes = sp.sizes;
  const sizes = rawSizes
    ? Array.isArray(rawSizes)
      ? rawSizes
      : [rawSizes]
    : [];
  const page = Math.max(1, parseInt((sp.page as string) ?? "1", 10));

  const opts = {
    collectionSlug: slug,
    sort,
    sizes: sizes.length ? sizes : undefined,
    page,
    limit: PAGE_SIZE,
  };

  const [products, total, categories, allSizes] = await Promise.all([
    getProducts(opts),
    getProductCount(opts),
    getCategories(),
    getSizes(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const base = `/collections/${slug}`;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-8">
        <Link
          href="/collections"
          className="hover:text-brand-text transition-colors"
        >
          Collections
        </Link>
        <span>/</span>
        <span className="text-brand-text">{col.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 lg:mb-12">
        <h1 className="font-heading font-semibold text-brand-indigo text-4xl lg:text-5xl">
          {col.name}
        </h1>
        {col.description && (
          <p className="font-body text-brand-muted text-base leading-relaxed mt-4 max-w-xl">
            {col.description}
          </p>
        )}
        <p className="font-body text-brand-muted text-sm mt-3">
          {total} {total === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Filters + Grid */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        <aside className="w-full lg:w-52 shrink-0">
          <ShopFilters
            categories={categories}
            sizes={allSizes}
            activeSizes={sizes}
            activeSort={sort}
            hideCategories
          />
        </aside>

        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="py-24 text-center border border-brand-border">
              <p className="font-heading text-brand-muted text-xl mb-4">
                No products match your filters
              </p>
              <Link
                href={base}
                className="font-body text-sm text-primary underline underline-offset-2"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Product pages"
                  className="flex items-center justify-center gap-1 mt-16"
                >
                  {page > 1 && (
                    <Link
                      href={pagHref(base, sp, page - 1)}
                      className="h-9 px-4 flex items-center font-body text-sm text-brand-muted border border-brand-border hover:border-brand-muted hover:text-brand-text transition-colors"
                    >
                      ← Prev
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <Link
                        key={n}
                        href={pagHref(base, sp, n)}
                        aria-current={n === page ? "page" : undefined}
                        className={`h-9 w-9 flex items-center justify-center font-body text-sm border transition-colors ${
                          n === page
                            ? "border-brand-indigo bg-brand-indigo text-white"
                            : "border-brand-border text-brand-muted hover:border-brand-muted hover:text-brand-text"
                        }`}
                      >
                        {n}
                      </Link>
                    )
                  )}
                  {page < totalPages && (
                    <Link
                      href={pagHref(base, sp, page + 1)}
                      className="h-9 px-4 flex items-center font-body text-sm text-brand-muted border border-brand-border hover:border-brand-muted hover:text-brand-text transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
