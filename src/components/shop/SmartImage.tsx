"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function SmartImage({ src, alt, fill, sizes, className, priority }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <ImagePlaceholder alt={alt} />;
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
