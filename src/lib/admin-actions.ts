"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";
import { auth, signOut } from "@/auth";
import { LeadStatus, PostStatus } from "@prisma/client";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

// ── Image upload ─────────────────────────────────────────────────────────────

export async function uploadImages(formData: FormData): Promise<string[]> {
  await requireAdmin();

  const files = formData.getAll("images") as File[];
  const urls: string[] = [];

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (!file.size) continue;
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const filepath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));
    urls.push(`/uploads/${filename}`);
  }

  return urls;
}

// ── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

// ── Lead status ───────────────────────────────────────────────────────────────

export async function updateLeadStatus(id: number, status: LeadStatus) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

// ── Post validation ───────────────────────────────────────────────────────────

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  excerpt: z.string().optional(),
  body: z.string().min(1, "Body is required"),
  status: z.enum(["Draft", "Published"]),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

async function upsertCategory(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return null;
  const slug = slugify(trimmed);
  const cat = await prisma.category.upsert({
    where: { slug },
    update: { name: trimmed },
    create: { name: trimmed, slug },
  });
  return cat.id;
}

// ── Create post ───────────────────────────────────────────────────────────────

export async function createPost(formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(
    ["title","slug","excerpt","body","status","featuredImage","category"]
      .map((k) => [k, formData.get(k)])
  );

  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

  const categoryId = parsed.data.category ? await upsertCategory(parsed.data.category) : null;

  await prisma.post.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      status: parsed.data.status as PostStatus,
      featuredImage: parsed.data.featuredImage || null,
      categoryId,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

// ── Update post ───────────────────────────────────────────────────────────────

export async function updatePost(id: number, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(
    ["title","slug","excerpt","body","status","featuredImage","category"]
      .map((k) => [k, formData.get(k)])
  );

  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

  const categoryId = parsed.data.category ? await upsertCategory(parsed.data.category) : null;

  await prisma.post.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      status: parsed.data.status as PostStatus,
      featuredImage: parsed.data.featuredImage || null,
      categoryId,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  redirect("/admin/blog");
}

// ── Delete post ───────────────────────────────────────────────────────────────

export async function deletePost(id: number) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// ── Toggle post status ────────────────────────────────────────────────────────

export async function togglePostStatus(id: number, current: PostStatus) {
  await requireAdmin();
  const next = current === PostStatus.Published ? PostStatus.Draft : PostStatus.Published;
  await prisma.post.update({ where: { id }, data: { status: next } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
