import { prisma } from "@/lib/db";
import { Prisma, ProductStatus } from "@prisma/client";

// Re-export so server components can use a single import
export { formatPrice } from "@/lib/format";

// ── Shared filter builder ─────────────────────────────────────────────────────

export interface GetProductsOptions {
  categorySlug?: string;
  collectionSlug?: string;
  featured?: boolean;
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc";
  limit?: number;
  page?: number;
}

function buildWhere(opts: GetProductsOptions): Prisma.ProductWhereInput {
  const priceFilter =
    opts.minPrice !== undefined || opts.maxPrice !== undefined
      ? {
          basePrice: {
            ...(opts.minPrice !== undefined && { gte: opts.minPrice }),
            ...(opts.maxPrice !== undefined && { lte: opts.maxPrice }),
          },
        }
      : {};

  return {
    status: ProductStatus.Active,
    ...(opts.featured !== undefined && { featured: opts.featured }),
    ...(opts.categorySlug && { category: { slug: opts.categorySlug } }),
    ...(opts.collectionSlug && {
      collections: { some: { collection: { slug: opts.collectionSlug } } },
    }),
    ...(opts.sizes?.length && {
      variants: { some: { size: { in: opts.sizes } } },
    }),
    ...priceFilter,
  };
}

function buildOrderBy(
  sort?: string
): Prisma.ProductOrderByWithRelationInput {
  if (sort === "price_asc") return { basePrice: "asc" };
  if (sort === "price_desc") return { basePrice: "desc" };
  return { createdAt: "desc" };
}

// ── Products ──────────────────────────────────────────────────────────────────

export type ProductListItem = Awaited<ReturnType<typeof getProducts>>[number];

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  basePrice: true,
  featured: true,
  category: { select: { id: true, name: true, slug: true } },
  images: { orderBy: { position: "asc" as const }, take: 2 },
  variants: {
    select: { size: true, wash: true, stock: true, priceOverride: true },
  },
} satisfies Prisma.ProductSelect;

export async function getProducts(opts: GetProductsOptions = {}) {
  const limit = opts.limit ?? 12;
  const skip = opts.page ? (opts.page - 1) * limit : 0;

  return prisma.product.findMany({
    where: buildWhere(opts),
    orderBy: buildOrderBy(opts.sort),
    take: limit,
    skip,
    select: productListSelect,
  });
}

export async function getProductCount(
  opts: GetProductsOptions = {}
): Promise<number> {
  return prisma.product.count({ where: buildWhere(opts) });
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({ featured: true, limit });
}

export type ProductDetail = NonNullable<
  Awaited<ReturnType<typeof getProductBySlug>>
>;

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
      _count: {
        select: { products: { where: { status: ProductStatus.Active } } },
      },
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
        select: {
          products: { where: { product: { status: ProductStatus.Active } } },
        },
      },
    },
  });
}

// ── Sizes (for filter UI) ─────────────────────────────────────────────────────

export async function getSizes(): Promise<string[]> {
  const rows = await prisma.productVariant.findMany({
    select: { size: true },
    distinct: ["size"],
  });
  const sizes = rows.map((r) => r.size);
  // Numeric sizes ascending, then letter sizes alphabetically
  return sizes.sort((a, b) => {
    const aNum = parseInt(a, 10);
    const bNum = parseInt(b, 10);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (!isNaN(aNum)) return -1;
    if (!isNaN(bNum)) return 1;
    const order = ["XS", "S", "M", "L", "XL", "XXL"];
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    return a.localeCompare(b);
  });
}
