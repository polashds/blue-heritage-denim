import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const products = await prisma.product.findMany({
  orderBy: { createdAt: "asc" },
  select: {
    id: true,
    name: true,
    slug: true,
    _count: { select: { images: true } },
  },
});

const col = (s: string, w: number) => s.slice(0, w).padEnd(w);

console.log(
  col("#", 3) + col("Name", 42) + col("Slug", 42) + "Images"
);
console.log("─".repeat(95));

let i = 1;
for (const p of products) {
  console.log(
    col(String(i++), 3) +
      col(p.name, 42) +
      col(p.slug, 42) +
      p._count.images
  );
}

await prisma.$disconnect();
