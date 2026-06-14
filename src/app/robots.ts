import type { MetadataRoute } from "next";
import { brand } from "@/config/branding";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
