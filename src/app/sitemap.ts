import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blueheritageenim.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, changeFrequency: "weekly", priority: 1 },
  { url: `${BASE}/shop`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/collections`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/wholesale`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { status: PostStatus.Published },
    select: { slug: true, updatedAt: true },
  });

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
