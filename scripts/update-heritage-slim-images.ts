/**
 * Re-runnable script: attach the 9 real product photos to Heritage Slim.
 * Safe to run multiple times — it deletes and recreates the image rows each run.
 *
 * Usage:
 *   npx tsx scripts/update-heritage-slim-images.ts
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
const prisma = new PrismaClient({ adapter: new PrismaPg(url) });

const SLUG = "heritage-slim";

const IMAGES = [
  { url: "/products/heritage-slim-jeans-1.png",  alt: "Heritage Slim Jeans", position: 0 },
  { url: "/products/heritage-slim-jeans-2.png",  alt: "Heritage Slim Jeans", position: 1 },
  { url: "/products/heritage-slim-jeans-3.png",  alt: "Heritage Slim Jeans", position: 2 },
  { url: "/products/heritage-slim-jeans-4.png",  alt: "Heritage Slim Jeans", position: 3 },
  { url: "/products/heritage-slim-jeans-5.jpeg", alt: "Heritage Slim Jeans", position: 4 },
  { url: "/products/heritage-slim-jeans-6.jpeg", alt: "Heritage Slim Jeans", position: 5 },
  { url: "/products/heritage-slim-jeans-7.jpeg", alt: "Heritage Slim Jeans", position: 6 },
  { url: "/products/heritage-slim-jeans-8.jpeg", alt: "Heritage Slim Jeans", position: 7 },
  { url: "/products/heritage-slim-jeans-9.jpeg", alt: "Heritage Slim Jeans", position: 8 },
];

async function main() {
  const product = await prisma.product.findUnique({ where: { slug: SLUG } });
  if (!product) throw new Error(`Product not found: ${SLUG}`);

  // Delete existing images, then create the real ones
  const { count: deleted } = await prisma.productImage.deleteMany({
    where: { productId: product.id },
  });
  const created = await prisma.productImage.createMany({
    data: IMAGES.map((img) => ({ ...img, productId: product.id })),
  });

  console.log(
    `✓ "${product.name}" (id ${product.id}): removed ${deleted} old image(s), created ${created.count} new image(s).`
  );
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
