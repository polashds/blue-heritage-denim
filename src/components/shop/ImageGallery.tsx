"use client";

import { useState } from "react";
import ProductImage, { PLACEHOLDER } from "./ProductImage";

interface GalleryImage {
  id: number;
  url: string;
  alt: string | null;
}

export default function ImageGallery({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div>
      {/* Main image */}
      <div className="aspect-[4/5] relative overflow-hidden bg-brand-surface">
        <ProductImage
          src={current?.url ?? PLACEHOLDER}
          alt={current?.alt ?? productName}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 aspect-[4/5] shrink-0 overflow-hidden bg-brand-surface border-b-2 transition-colors duration-150 ${
                i === selected
                  ? "border-brand-indigo"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={img.url}
                alt={img.alt ?? productName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
