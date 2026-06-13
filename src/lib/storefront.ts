import { prisma } from "@/lib/db";
import { ProductStatus } from "@prisma/client";

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatPrice(paisa: number): string {
  const taka = paisa / 100;
  return `৳${taka.toLocaleString("en-BD")}`;
}

// ── Products ──────────────────────────────────────────────────────────────────

export type ProductListItem = Awaited<ReturnType<typeof getProducts>>[number];

export interface GetProductsOptions {
  categorySlug?: string;
  collectionSlug?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export async function getProducts(opts: GetProductsOptions = {}) {
  return prisma.product.findMany({
    where: {
      status: ProductStatus.Active,
      ...(opts.featured !== undefined && { featured: opts.featured }),
      ...(opts.categorySlug && { category: { slug: opts.categorySlug } }),
      ...(opts.collectionSlug && {
        collections: { some: { collection: { slug: opts.collectionSlug } } },
      }),
    },
    orderBy: { createdAt: "desc" },
    take: opts.limit,
    skip: opts.offset,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      basePrice: true,
      featured: true,
      category: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { position: "asc" }, take: 2 },
      variants: { select: { size: true, wash: true, stock: true, priceOverride: true } },
    },
  });
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({ featured: true, limit });
}

export type ProductDetail = NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>;

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, status: ProductStatus.Active },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
      variants: { orderBy: [{ size: "asc" }, { wash: "asc" }] },
      collections: {
        include: { collection: true },
        orderBy: { collection: { sortOrder: "asc" } },
      },
    },
  });
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCategories() {
  return prisma.category.findMany({
    where: { products: { some: { status: ProductStatus.Active } } },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      _count: { select: { products: { where: { status: ProductStatus.Active } } } },
    },
  });
}

// ── Collections ───────────────────────────────────────────────────────────────

export async function getCollections(featuredOnly = false) {
  return prisma.collection.findMany({
    where: {
      ...(featuredOnly && { featured: true }),
      products: { some: { product: { status: ProductStatus.Active } } },
    },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      featured: true,
      _count: {
        select: { products: { where: { product: { status: ProductStatus.Active } } } },
      },
    },
  });
}
