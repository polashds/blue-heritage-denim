"use client";

import { useState } from "react";
import Image from "next/image";

export const PLACEHOLDER = "/assets/placeholder.png";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  src: initialSrc,
  alt,
  fill,
  sizes,
  className,
  priority,
}: Props) {
  const [src, setSrc] = useState(initialSrc || PLACEHOLDER);
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setSrc(PLACEHOLDER)}
    />
  );
}
