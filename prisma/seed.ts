import "dotenv/config";
import { PrismaClient, ProductStatus, PostStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
const prisma = new PrismaClient({ adapter: new PrismaPg(url) });

const bdt = (amount: number) => amount * 100;
const PH = "/products/denim-jeans-1.jpg";

async function main() {
  // ── Categories ──────────────────────────────────────────────────────────────
  const [men, women, outerwear, accessories] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "men" },
      update: { image: "/products/denim-jeans-1.jpg" },
      create: { name: "Men", slug: "men", image: "/products/denim-jeans-1.jpg" },
    }),
    prisma.category.upsert({
      where: { slug: "women" },
      update: { image: "/products/denim-jeans-2.jpg" },
      create: { name: "Women", slug: "women", image: "/products/denim-jeans-2.jpg" },
    }),
    prisma.category.upsert({
      where: { slug: "outerwear" },
      update: { image: "/products/denim-jacket.jpg" },
      create: { name: "Outerwear", slug: "outerwear", image: "/products/denim-jacket.jpg" },
    }),
    prisma.category.upsert({
      where: { slug: "accessories" },
      update: { image: "/products/canvas-tote.jpg" },
      create: { name: "Accessories", slug: "accessories", image: "/products/canvas-tote.jpg" },
    }),
  ]);

  // ── Collections ─────────────────────────────────────────────────────────────
  const [heritage, newArrivals, bestSellers, limitedEdition] = await Promise.all([
    prisma.collection.upsert({
      where: { slug: "heritage" },
      update: { image: "/products/denim-detail.jpg" },
      create: {
        name: "Heritage",
        slug: "heritage",
        description: "Our founding range — selvedge and raw denim sourced from century-old mills.",
        image: "/products/denim-detail.jpg",
        featured: true,
        sortOrder: 1,
      },
    }),
    prisma.collection.upsert({
      where: { slug: "new-arrivals" },
      update: { image: "/products/denim-jacket.jpg" },
      create: {
        name: "New Arrivals",
        slug: "new-arrivals",
        description: "The latest drops from Blue Heritage Denim.",
        image: "/products/denim-jacket.jpg",
        featured: true,
        sortOrder: 2,
      },
    }),
    prisma.collection.upsert({
      where: { slug: "best-sellers" },
      update: { image: "/products/denim-jeans-2.jpg" },
      create: {
        name: "Best Sellers",
        slug: "best-sellers",
        description: "The cuts our customers keep coming back for.",
        image: "/products/denim-jeans-2.jpg",
        featured: false,
        sortOrder: 3,
      },
    }),
    prisma.collection.upsert({
      where: { slug: "limited-edition" },
      update: { image: "/products/denim-shirt.jpg" },
      create: {
        name: "Limited Edition",
        slug: "limited-edition",
        description: "Small-batch production. Once they're gone, they're gone.",
        image: "/products/denim-shirt.jpg",
        featured: true,
        sortOrder: 4,
      },
    }),
  ]);

  // ── Products ─────────────────────────────────────────────────────────────────
  const products = [
    // ── Men's Jeans ──
    {
      name: "Selvedge Straight",
      slug: "selvedge-straight",
      description:
        "A timeless straight cut in 14oz selvedge denim from Kojima, Japan. Sanforized, loomstate texture, fades beautifully over years of wear.",
      body: "The Selvedge Straight is our flagship. Cut from 14oz Japanese selvedge sourced directly from a family-run mill in Kojima, each pair develops a unique fade pattern over time. Sanforized for a predictable fit from the first wash.",
      basePrice: bdt(8500),
      status: ProductStatus.Active,
      featured: true,
      categoryId: men.id,
      collections: [heritage.id, bestSellers.id],
      images: [
        { url: "/products/denim-jeans-1.jpg", alt: "Selvedge Straight", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Selvedge Straight detail", position: 1 },
      ],
      variants: [
        { size: "28", wash: "Raw Indigo", sku: "SS-28-RAW", stock: 12 },
        { size: "30", wash: "Raw Indigo", sku: "SS-30-RAW", stock: 18 },
        { size: "32", wash: "Raw Indigo", sku: "SS-32-RAW", stock: 20 },
        { size: "34", wash: "Raw Indigo", sku: "SS-34-RAW", stock: 15 },
        { size: "36", wash: "Raw Indigo", sku: "SS-36-RAW", stock: 8 },
        { size: "30", wash: "One Wash", sku: "SS-30-OW", stock: 10 },
        { size: "32", wash: "One Wash", sku: "SS-32-OW", stock: 14 },
        { size: "34", wash: "One Wash", sku: "SS-34-OW", stock: 9 },
      ],
    },
    {
      name: "Heritage Slim",
      slug: "heritage-slim",
      description:
        "A modern slim silhouette in 12oz ring-spun denim. Structured enough for the office, comfortable enough for a 12-hour day.",
      body: "Crafted from 12oz ring-spun cotton with a touch of stretch for unrestricted movement. The Heritage Slim sits slightly below the natural waist with a tapered leg that works with both boots and sneakers.",
      basePrice: bdt(7200),
      status: ProductStatus.Active,
      featured: true,
      categoryId: men.id,
      collections: [heritage.id, bestSellers.id],
      images: [
        { url: "/products/heritage-slim-jeans-1.png",  alt: "Heritage Slim Jeans", position: 0 },
        { url: "/products/heritage-slim-jeans-2.png",  alt: "Heritage Slim Jeans", position: 1 },
        { url: "/products/heritage-slim-jeans-3.png",  alt: "Heritage Slim Jeans", position: 2 },
        { url: "/products/heritage-slim-jeans-4.png",  alt: "Heritage Slim Jeans", position: 3 },
        { url: "/products/heritage-slim-jeans-5.jpeg", alt: "Heritage Slim Jeans", position: 4 },
        { url: "/products/heritage-slim-jeans-6.jpeg", alt: "Heritage Slim Jeans", position: 5 },
        { url: "/products/heritage-slim-jeans-7.jpeg", alt: "Heritage Slim Jeans", position: 6 },
        { url: "/products/heritage-slim-jeans-8.jpeg", alt: "Heritage Slim Jeans", position: 7 },
        { url: "/products/heritage-slim-jeans-9.jpeg", alt: "Heritage Slim Jeans", position: 8 },
      ],
      variants: [
        { size: "28", wash: "Midnight", sku: "HS-28-MN", stock: 10 },
        { size: "30", wash: "Midnight", sku: "HS-30-MN", stock: 22 },
        { size: "32", wash: "Midnight", sku: "HS-32-MN", stock: 25 },
        { size: "34", wash: "Midnight", sku: "HS-34-MN", stock: 18 },
        { size: "36", wash: "Midnight", sku: "HS-36-MN", stock: 6 },
        { size: "30", wash: "Stone", sku: "HS-30-ST", stock: 12 },
        { size: "32", wash: "Stone", sku: "HS-32-ST", stock: 16 },
      ],
    },
    {
      name: "Relaxed Taper",
      slug: "relaxed-taper",
      description:
        "Generous seat and thigh, tapered from the knee down. The go-to for long days and easy movement.",
      body: "The Relaxed Taper is built for comfort without sacrificing shape. A higher seat and wider thigh give you room to move; the taper below the knee keeps the look clean. Made from 12.5oz cotton twill.",
      basePrice: bdt(6800),
      status: ProductStatus.Active,
      featured: false,
      categoryId: men.id,
      collections: [newArrivals.id],
      images: [
        { url: "/products/denim-jeans-2.jpg", alt: "Relaxed Taper", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Relaxed Taper detail", position: 1 },
      ],
      variants: [
        { size: "30", wash: "Vintage Indigo", sku: "RT-30-VI", stock: 14 },
        { size: "32", wash: "Vintage Indigo", sku: "RT-32-VI", stock: 18 },
        { size: "34", wash: "Vintage Indigo", sku: "RT-34-VI", stock: 12 },
        { size: "36", wash: "Vintage Indigo", sku: "RT-36-VI", stock: 7 },
        { size: "32", wash: "Natural", sku: "RT-32-NA", stock: 10 },
        { size: "34", wash: "Natural", sku: "RT-34-NA", stock: 8 },
      ],
    },
    {
      name: "Wide Leg Worker",
      slug: "wide-leg-worker",
      description:
        "A full-leg cut inspired by 1940s workwear archives. Five-pocket, bar-tacked at stress points.",
      body: "Drawn from heritage workwear silhouettes, the Wide Leg Worker is cut in a full-length, high-rise block with a wide, straight leg. Bar-tacked at all pocket corners and key stress points for durability that outlasts trends.",
      basePrice: bdt(7500),
      status: ProductStatus.Active,
      featured: false,
      categoryId: men.id,
      collections: [limitedEdition.id],
      images: [
        { url: "/products/denim-jeans-1.jpg", alt: "Wide Leg Worker", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Wide Leg Worker detail", position: 1 },
      ],
      variants: [
        { size: "30", wash: "Ecru", sku: "WLW-30-EC", stock: 6 },
        { size: "32", wash: "Ecru", sku: "WLW-32-EC", stock: 8 },
        { size: "34", wash: "Ecru", sku: "WLW-34-EC", stock: 5 },
        { size: "32", wash: "Washed Black", sku: "WLW-32-WB", stock: 7 },
        { size: "34", wash: "Washed Black", sku: "WLW-34-WB", stock: 4 },
      ],
    },
    {
      name: "5-Pocket Chino",
      slug: "5-pocket-chino",
      description:
        "Not denim — but built the same way. A 10oz cotton chino in the same five-pocket template as our jeans.",
      body: "For days when you want the fit and feel of your favourite jeans without the weight of denim. Cut in 10oz twill cotton, the 5-Pocket Chino uses the same patterns and hardware as our denim pieces.",
      basePrice: bdt(5800),
      status: ProductStatus.Active,
      featured: false,
      categoryId: men.id,
      collections: [newArrivals.id],
      images: [
        { url: "/products/chino.jpg", alt: "5-Pocket Chino", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "5-Pocket Chino detail", position: 1 },
      ],
      variants: [
        { size: "30", wash: "Khaki", sku: "5PC-30-KH", stock: 15 },
        { size: "32", wash: "Khaki", sku: "5PC-32-KH", stock: 18 },
        { size: "34", wash: "Khaki", sku: "5PC-34-KH", stock: 12 },
        { size: "30", wash: "Olive", sku: "5PC-30-OL", stock: 10 },
        { size: "32", wash: "Olive", sku: "5PC-32-OL", stock: 14 },
      ],
    },

    // ── Women's ──
    {
      name: "High Rise Straight",
      slug: "high-rise-straight",
      description:
        "A high-rise straight leg in 11oz stretch-selvedge denim. Flattering from waist to hem with a full range of motion.",
      body: "The High Rise Straight sits at the natural waist and falls in a clean, straight line to the ankle. Made from 11oz Japanese stretch-selvedge — the selvedge edge is visible at the coin pocket and inside leg seams.",
      basePrice: bdt(7800),
      status: ProductStatus.Active,
      featured: true,
      categoryId: women.id,
      collections: [heritage.id, bestSellers.id],
      images: [
        { url: "/products/denim-jeans-2.jpg", alt: "High Rise Straight", position: 0 },
      ],
      variants: [
        { size: "24", wash: "Raw Indigo", sku: "HRS-24-RAW", stock: 8 },
        { size: "26", wash: "Raw Indigo", sku: "HRS-26-RAW", stock: 14 },
        { size: "28", wash: "Raw Indigo", sku: "HRS-28-RAW", stock: 16 },
        { size: "30", wash: "Raw Indigo", sku: "HRS-30-RAW", stock: 10 },
        { size: "26", wash: "Stone Blue", sku: "HRS-26-SB", stock: 12 },
        { size: "28", wash: "Stone Blue", sku: "HRS-28-SB", stock: 15 },
        { size: "30", wash: "Stone Blue", sku: "HRS-30-SB", stock: 8 },
      ],
    },
    {
      name: "Barrel Leg",
      slug: "barrel-leg",
      description:
        "Wide at the knee, tapered at the ankle — the barrel silhouette in a premium 12oz cotton-linen denim blend.",
      body: "The Barrel Leg takes its proportions from early 90s Japanese denim fashion: a wide hip and knee, cinched at the ankle. The 12oz cotton-linen blend keeps it cool in Dhaka summers without losing structure.",
      basePrice: bdt(8200),
      status: ProductStatus.Active,
      featured: true,
      categoryId: women.id,
      collections: [newArrivals.id, limitedEdition.id],
      images: [
        { url: "/products/denim-jeans-1.jpg", alt: "Barrel Leg", position: 0 },
      ],
      variants: [
        { size: "24", wash: "Light Vintage", sku: "BL-24-LV", stock: 5 },
        { size: "26", wash: "Light Vintage", sku: "BL-26-LV", stock: 9 },
        { size: "28", wash: "Light Vintage", sku: "BL-28-LV", stock: 11 },
        { size: "30", wash: "Light Vintage", sku: "BL-30-LV", stock: 6 },
        { size: "26", wash: "Dark Indigo", sku: "BL-26-DI", stock: 8 },
        { size: "28", wash: "Dark Indigo", sku: "BL-28-DI", stock: 10 },
      ],
    },
    {
      name: "Slim Ankle",
      slug: "slim-ankle",
      description:
        "Our slimmest cut, cropped just above the ankle. Everyday denim refined to its essential form.",
      body: "The Slim Ankle is the most versatile pair in the collection — slim from hip to ankle with a clean, unwashed look that dresses up or down effortlessly. Available in three curated washes.",
      basePrice: bdt(6500),
      status: ProductStatus.Active,
      featured: false,
      categoryId: women.id,
      collections: [bestSellers.id],
      images: [
        { url: "/products/denim-jeans-2.jpg", alt: "Slim Ankle", position: 0 },
      ],
      variants: [
        { size: "24", wash: "Midnight", sku: "SA-24-MN", stock: 10 },
        { size: "26", wash: "Midnight", sku: "SA-26-MN", stock: 16 },
        { size: "28", wash: "Midnight", sku: "SA-28-MN", stock: 18 },
        { size: "30", wash: "Midnight", sku: "SA-30-MN", stock: 9 },
        { size: "26", wash: "Classic Blue", sku: "SA-26-CB", stock: 12 },
        { size: "28", wash: "Classic Blue", sku: "SA-28-CB", stock: 14 },
      ],
    },
    {
      name: "Wide Leg Trouser",
      slug: "wide-leg-trouser",
      description:
        "Palazzo proportions in denim. Fluid, comfortable, and unmistakably considered.",
      body: "A full wide-leg denim trouser cut in 10oz chambray-weight cotton for a relaxed, flowing silhouette. High rise, wide waistband, invisible fly — minimal detailing lets the shape speak.",
      basePrice: bdt(7000),
      status: ProductStatus.Active,
      featured: false,
      categoryId: women.id,
      collections: [newArrivals.id],
      images: [
        { url: "/products/trouser.jpg", alt: "Wide Leg Trouser", position: 0 },
      ],
      variants: [
        { size: "24", wash: "Ecru", sku: "WLT-24-EC", stock: 6 },
        { size: "26", wash: "Ecru", sku: "WLT-26-EC", stock: 10 },
        { size: "28", wash: "Ecru", sku: "WLT-28-EC", stock: 12 },
        { size: "30", wash: "Ecru", sku: "WLT-30-EC", stock: 7 },
      ],
    },

    // ── Outerwear ──
    {
      name: "Selvedge Chore Coat",
      slug: "selvedge-chore-coat",
      description:
        "A French chore coat template in 14oz Japanese selvedge denim. Four front pockets, horn buttons, unlined.",
      body: "The Chore Coat is a classic of functional clothing — we've reinterpreted it in the same 14oz selvedge denim as our Selvedge Straight jeans. Unlined for breathability; the raw edge seams will wear in over time. Match with the Selvedge Straight for a full selvedge denim set.",
      basePrice: bdt(14500),
      status: ProductStatus.Active,
      featured: true,
      categoryId: outerwear.id,
      collections: [heritage.id, limitedEdition.id],
      images: [
        { url: "/products/denim-jacket.jpg", alt: "Selvedge Chore Coat", position: 0 },
      ],
      variants: [
        { size: "S", wash: "Raw Indigo", sku: "SCC-S-RAW", stock: 4 },
        { size: "M", wash: "Raw Indigo", sku: "SCC-M-RAW", stock: 7 },
        { size: "L", wash: "Raw Indigo", sku: "SCC-L-RAW", stock: 6 },
        { size: "XL", wash: "Raw Indigo", sku: "SCC-XL-RAW", stock: 3 },
      ],
    },
    {
      name: "Denim Overshirt",
      slug: "denim-overshirt",
      description:
        "A relaxed-fit overshirt in 8oz chambray denim. Wears as a shirt or an unzipped jacket.",
      body: "The Overshirt bridges the gap between shirt and jacket. Cut in 8oz chambray denim — soft and breathable — with a boxy, relaxed silhouette that layers easily over knitwear or a t-shirt.",
      basePrice: bdt(6500),
      status: ProductStatus.Active,
      featured: false,
      categoryId: outerwear.id,
      collections: [newArrivals.id, bestSellers.id],
      images: [
        { url: "/products/denim-jacket.jpg", alt: "Denim Overshirt", position: 0 },
      ],
      variants: [
        { size: "S", wash: "Light Blue", sku: "DO-S-LB", stock: 8 },
        { size: "M", wash: "Light Blue", sku: "DO-M-LB", stock: 14 },
        { size: "L", wash: "Light Blue", sku: "DO-L-LB", stock: 12 },
        { size: "XL", wash: "Light Blue", sku: "DO-XL-LB", stock: 6 },
        { size: "M", wash: "Washed Black", sku: "DO-M-WB", stock: 8 },
        { size: "L", wash: "Washed Black", sku: "DO-L-WB", stock: 9 },
      ],
    },

    // ── Shirts ──
    {
      name: "Western Denim Shirt",
      slug: "western-denim-shirt",
      description:
        "A slim Western-cut shirt in 6oz denim. Snap buttons, two chest pockets, slightly shaped hem.",
      body: "The Western Denim Shirt is cut slim through the shoulders and chest with a slightly shaped hem that can be worn tucked or untucked. Snap buttons at the collar, cuffs, and front placket; two chest pockets. Made from 6oz denim — light enough to wear as a true shirt.",
      basePrice: bdt(4800),
      status: ProductStatus.Active,
      featured: false,
      categoryId: men.id,
      collections: [bestSellers.id],
      images: [
        { url: "/products/denim-shirt.jpg", alt: "Western Denim Shirt", position: 0 },
      ],
      variants: [
        { size: "S", wash: "Indigo", sku: "WDS-S-IN", stock: 10 },
        { size: "M", wash: "Indigo", sku: "WDS-M-IN", stock: 15 },
        { size: "L", wash: "Indigo", sku: "WDS-L-IN", stock: 12 },
        { size: "XL", wash: "Indigo", sku: "WDS-XL-IN", stock: 7 },
        { size: "M", wash: "White", sku: "WDS-M-WH", stock: 9 },
        { size: "L", wash: "White", sku: "WDS-L-WH", stock: 8 },
      ],
    },

    // ── Accessories ──
    {
      name: "Selvedge Canvas Belt",
      slug: "selvedge-canvas-belt",
      description:
        "A 35mm belt woven in the same indigo thread as our selvedge jeans, finished with a brass roller buckle.",
      body: "We had these belts woven specifically to complement our selvedge denim jeans. The same indigo warp thread, the same weft density — worn together, they share a fade story. Brass roller buckle, burnished leather keeper.",
      basePrice: bdt(2800),
      status: ProductStatus.Active,
      featured: false,
      categoryId: accessories.id,
      collections: [heritage.id],
      images: [
        { url: "/products/denim-detail.jpg", alt: "Selvedge Canvas Belt", position: 0 },
      ],
      variants: [
        { size: "S (28–32)", wash: "Indigo", sku: "SCB-S-IN", stock: 20 },
        { size: "M (32–36)", wash: "Indigo", sku: "SCB-M-IN", stock: 25 },
        { size: "L (36–40)", wash: "Indigo", sku: "SCB-L-IN", stock: 15 },
      ],
    },
    {
      name: "Heritage Tote",
      slug: "heritage-tote",
      description:
        "A structured tote in 16oz canvas with indigo-dyed leather handles. Holds a 15\" laptop flat.",
      body: "The Heritage Tote is built to the same standards as our garments — 16oz cotton canvas, reinforced base, indigo-dyed leather handles that will darken and patina with use. A hidden zipper pocket inside; a flat slot for a laptop or documents.",
      basePrice: bdt(5500),
      status: ProductStatus.Active,
      featured: false,
      categoryId: accessories.id,
      collections: [newArrivals.id],
      images: [
        { url: "/products/canvas-tote.jpg", alt: "Heritage Tote", position: 0 },
      ],
      variants: [
        { size: "One Size", wash: "Natural Canvas", sku: "HT-OS-NC", stock: 18 },
        { size: "One Size", wash: "Indigo Canvas", sku: "HT-OS-IC", stock: 12 },
      ],
    },
    {
      name: "Japanese Selvedge Cap",
      slug: "japanese-selvedge-cap",
      description:
        "A six-panel cap in 8oz Japanese selvedge denim with an adjustable brass strap.",
      body: "Unstructured six-panel with a pre-curved brim. Made from the same 8oz Japanese selvedge we use in our lighter shirts. The selvedge ID stripe is visible along the brim edge. Adjustable brass sliding strap at the back.",
      basePrice: bdt(2200),
      status: ProductStatus.Active,
      featured: false,
      categoryId: accessories.id,
      collections: [heritage.id, limitedEdition.id],
      images: [
        { url: "/products/denim-cap.jpg", alt: "Japanese Selvedge Cap", position: 0 },
      ],
      variants: [
        { size: "One Size", wash: "Raw Indigo", sku: "JSC-OS-RAW", stock: 30 },
        { size: "One Size", wash: "Washed", sku: "JSC-OS-WAS", stock: 20 },
      ],
    },
  ];

  for (const p of products) {
    const { collections: collectionIds, images, variants, ...productData } = p;

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
        collections: {
          create: collectionIds.map((collectionId) => ({ collectionId })),
        },
      },
    });
  }

  console.log(`✓ Seeded ${products.length} products across 4 categories and 4 collections.`);

  // ── Fix existing broken product image URLs in the DB ─────────────────────────
  // Any image still pointing at the old /assets/products/ path gets replaced.
  const imgFix = await prisma.productImage.updateMany({
    where: { url: { startsWith: "/assets/products/" } },
    data: { url: PH },
  });
  if (imgFix.count > 0) console.log(`✓ Fixed ${imgFix.count} broken product image URLs.`);

  // ── Replace placeholder images with real product photos ─────────────────────
  // Runs every seed so existing records always get real images.
  // Heritage Slim is excluded — it already has its own real images.
  type ImgDef = { url: string; alt: string; position: number };
  const imageFixups: Array<{ slug: string; images: ImgDef[] }> = [
    {
      slug: "selvedge-straight",
      images: [
        { url: "/products/denim-jeans-1.jpg", alt: "Selvedge Straight", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Selvedge Straight detail", position: 1 },
      ],
    },
    {
      slug: "relaxed-taper",
      images: [
        { url: "/products/denim-jeans-2.jpg", alt: "Relaxed Taper", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Relaxed Taper detail", position: 1 },
      ],
    },
    {
      slug: "wide-leg-worker",
      images: [
        { url: "/products/denim-jeans-1.jpg", alt: "Wide Leg Worker", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "Wide Leg Worker detail", position: 1 },
      ],
    },
    {
      slug: "5-pocket-chino",
      images: [
        { url: "/products/chino.jpg", alt: "5-Pocket Chino", position: 0 },
        { url: "/products/denim-detail.jpg", alt: "5-Pocket Chino detail", position: 1 },
      ],
    },
    {
      slug: "high-rise-straight",
      images: [{ url: "/products/denim-jeans-2.jpg", alt: "High Rise Straight", position: 0 }],
    },
    {
      slug: "barrel-leg",
      images: [{ url: "/products/denim-jeans-1.jpg", alt: "Barrel Leg", position: 0 }],
    },
    {
      slug: "slim-ankle",
      images: [{ url: "/products/denim-jeans-2.jpg", alt: "Slim Ankle", position: 0 }],
    },
    {
      slug: "wide-leg-trouser",
      images: [{ url: "/products/trouser.jpg", alt: "Wide Leg Trouser", position: 0 }],
    },
    {
      slug: "selvedge-chore-coat",
      images: [{ url: "/products/denim-jacket.jpg", alt: "Selvedge Chore Coat", position: 0 }],
    },
    {
      slug: "denim-overshirt",
      images: [{ url: "/products/denim-jacket.jpg", alt: "Denim Overshirt", position: 0 }],
    },
    {
      slug: "western-denim-shirt",
      images: [{ url: "/products/denim-shirt.jpg", alt: "Western Denim Shirt", position: 0 }],
    },
    {
      slug: "selvedge-canvas-belt",
      images: [{ url: "/products/denim-detail.jpg", alt: "Selvedge Canvas Belt", position: 0 }],
    },
    {
      slug: "heritage-tote",
      images: [{ url: "/products/canvas-tote.jpg", alt: "Heritage Tote", position: 0 }],
    },
    {
      slug: "japanese-selvedge-cap",
      images: [{ url: "/products/denim-cap.jpg", alt: "Japanese Selvedge Cap", position: 0 }],
    },
  ];

  let fixedProducts = 0;
  for (const { slug, images } of imageFixups) {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!product) continue;
    const placeholderCount = await prisma.productImage.count({
      where: { productId: product.id, url: "/assets/placeholder.png" },
    });
    if (placeholderCount > 0) {
      await prisma.productImage.deleteMany({ where: { productId: product.id } });
      await prisma.productImage.createMany({
        data: images.map((img) => ({ ...img, productId: product.id })),
      });
      fixedProducts++;
    }
  }
  if (fixedProducts > 0)
    console.log(`✓ Replaced placeholder images for ${fixedProducts} products.`);

  // ── Blog posts ───────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      title: "Breaking In Your First Pair of Raw Denim",
      slug: "breaking-in-raw-denim",
      excerpt:
        "Raw denim is sold unwashed — the indigo is vivid, the fabric is stiff, and the fades you earn are entirely your own. Here's how to approach the first few months.",
      body: `Raw denim requires patience. The indigo dye sits on the surface of the yarn rather than penetrating it, which means every crease, fold, and friction point you create will eventually produce a unique fade pattern that is impossible to replicate.

**The first 30 days**
Wear your new pair as much as possible before the first wash. The fabric needs time to conform to your body and develop the tension lines that become your personal whiskers and honeycombs. Avoid rain and prolonged contact with water — the dye will bleed and, more importantly, wet denim loses its shape before it has had time to set.

**Washing**
When the time comes — typically after six months of regular wear — turn the jeans inside out and submerge them in cold water with a small amount of pH-neutral soap. Do not machine wash. Agitation breaks down the indigo before the fabric has fully settled. Hang dry only, never tumble dry.

**What to expect**
By the end of the first year, your raw denim will be entirely unique. The fades at the thigh, the stacking at the hem, the lines at the back of the knee — these are your fades, earned through your daily life. That is the point.`,
      status: PostStatus.Published,
    },
    {
      title: "How to Care for Heritage Denim: A Complete Guide",
      slug: "heritage-denim-care-guide",
      excerpt:
        "Most denim problems — shrinkage, blowouts, premature fading — come from washing it wrong. A few simple rules change everything.",
      body: `Heritage denim is built to last, but it does require different care than the fast-fashion alternatives. The good news: caring for it properly is simpler, not harder.

**Wash less, not more**
Denim does not need to be washed after every wear. The fibres are robust and the fabric breathes. Most pairs can go four to six wears between washes, and with raw denim, considerably longer. Airing your denim between wears — hanging it outside or near a window — removes odour without stressing the fabric.

**Temperature matters**
Always wash in cold water. Hot water shrinks denim and degrades the indigo dye more rapidly. The fibres in selvedge and ring-spun cotton have been twisted more tightly than in standard denim, which means they respond more dramatically to heat.

**Turn them inside out**
This protects the outer face of the denim from friction during the wash cycle, which is the primary cause of uneven fading. It also prevents indigo from transferring onto other garments.

**Dry flat or hang**
Tumble drying is the enemy of heritage denim. The heat shrinks the fabric and the tumbling action stresses the seams. Hang your denim by the waistband — it will retain its shape and dry to a better fit.`,
      status: PostStatus.Published,
    },
    {
      title: "The Five Fits: Which Silhouette Is Right for You?",
      slug: "five-fits-which-silhouette",
      excerpt:
        "From the Selvedge Straight to the Barrel Leg, every cut we make has a distinct personality. This guide helps you find your fit.",
      body: `At Blue Heritage Denim, we make a deliberately small number of silhouettes. Each one has been developed with a specific purpose and body type in mind. Here's how to think through the decision.

**The Selvedge Straight**
Our flagship. A true straight leg from hip to hem — the same width at the knee as at the ankle. Works best on taller, leaner frames, and on anyone who wants a cut that genuinely improves with age. The 14oz selvedge creates structure that cheaper denim cannot.

**The Heritage Slim**
A modern update to the straight — tapered through the thigh and knee, with a slightly slimmer hem opening. More forgiving than a true slim, and the 12oz ring-spun cotton has just enough stretch for all-day comfort. This is our most versatile cut.

**The Relaxed Taper**
More room in the seat and thigh, tapering from the knee down. Designed for people who find standard sizing too restrictive across the hip and thigh. The taper prevents the wider cut from looking sloppy.

**The High Rise Straight (Women's)**
Sits at the natural waist and falls in a clean, straight line. The 11oz Japanese stretch-selvedge is forgiving across the hip while maintaining the visible selvedge ID stripe that signals quality.

**The Barrel Leg (Women's)**
Wide at the knee, cinched at the ankle. A more directional silhouette that requires a confident approach to styling, but is incredibly flattering on a wide range of body types. The cotton-linen blend keeps it cool in warmer months.`,
      status: PostStatus.Published,
    },
  ];

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`✓ Seeded ${blogPosts.length} blog posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
