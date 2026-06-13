import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { brand } from "@/config/branding";

export const dynamic = "force-dynamic";
import { PostStatus } from "@prisma/client";
import { marked } from "marked";

type Params = Promise<{ slug: string }>;

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, status: PostStatus.Published },
    include: { category: true },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const description = post.excerpt ?? post.body.slice(0, 155);
  return {
    title: `${post.title} — ByteFlow AI Labs Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      ...(post.featuredImage && { images: [{ url: post.featuredImage, alt: post.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const htmlBody = await marked.parse(post.body, { async: true });

  const siteUrl = brand.siteUrl;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? post.body.slice(0, 155),
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    ...(post.featuredImage && { image: post.featuredImage }),
    author: {
      "@type": "Organization",
      name: "ByteFlow AI Labs",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ByteFlow AI Labs",
      url: siteUrl,
    },
  };

  return (
    <div className="bg-brand-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Featured image */}
      {post.featuredImage && (
        <div className="w-full max-h-[520px] overflow-hidden bg-brand-surface">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[400px] sm:h-[480px] lg:h-[520px]">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-body text-xs text-brand-muted hover:text-accent transition-colors tracking-[0.15em] uppercase mb-10"
        >
          <span aria-hidden>&#8592;</span> All Posts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          {post.category && (
            <span className="font-body text-[9px] tracking-[0.25em] uppercase text-accent border border-accent/30 px-2 py-0.5">
              {post.category.name}
            </span>
          )}
          <span className="font-body text-[10px] text-brand-muted">{formatDate(post.createdAt)}</span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-semibold text-brand-text text-4xl sm:text-5xl leading-[1.1] mb-10">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <span className="h-px flex-1 bg-primary/15" />
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span className="h-px flex-1 bg-primary/15" />
        </div>

        {/* Body */}
        <div
          className="
            font-body text-sm text-brand-muted leading-relaxed
            [&_h1]:font-heading [&_h1]:font-semibold [&_h1]:text-brand-text [&_h1]:text-3xl [&_h1]:mt-10 [&_h1]:mb-4
            [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:text-brand-text [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3
            [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-brand-text [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1
            [&_a]:text-accent [&_a]:underline [&_a]:hover:text-primary
            [&_strong]:text-brand-text [&_strong]:font-medium
            [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-brand-muted/80 [&_blockquote]:my-6
            [&_code]:bg-brand-surface [&_code]:text-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono
            [&_pre]:bg-brand-surface [&_pre]:border [&_pre]:border-primary/15 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:text-xs [&_pre]:font-mono
            [&_hr]:border-primary/15 [&_hr]:my-8
          "
          dangerouslySetInnerHTML={{ __html: htmlBody }}
        />
      </div>
    </div>
  );
}
