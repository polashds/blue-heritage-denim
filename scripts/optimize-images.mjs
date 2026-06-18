import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "../public/products");

const exts = new Set([".jpg", ".jpeg", ".png"]);

const files = (await readdir(dir)).filter((f) => exts.has(extname(f).toLowerCase()));

for (const file of files) {
  const fullPath = join(dir, file);
  const before = (await stat(fullPath)).size;

  const img = sharp(fullPath);
  const meta = await img.metadata();

  const MAX_W = 1200;
  const shouldResize = meta.width && meta.width > MAX_W;

  await img
    .resize(shouldResize ? { width: MAX_W, withoutEnlargement: true } : undefined)
    .jpeg({ quality: 80 })
    .toFile(fullPath + ".tmp");

  const { rename, unlink } = await import("fs/promises");
  const tmpSize = (await stat(fullPath + ".tmp")).size;

  if (tmpSize >= before) {
    await unlink(fullPath + ".tmp");
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB  (skipped — already optimal)`);
    continue;
  }

  await rename(fullPath + ".tmp", fullPath);

  const after = (await stat(fullPath)).size;
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${file}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB  (${pct}% smaller)`
  );
}

console.log(`\nDone. Optimized ${files.length} files.`);
