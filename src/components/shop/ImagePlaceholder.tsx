export default function ImagePlaceholder({ alt }: { alt?: string }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden bg-brand-surface"
      role="img"
      aria-label={alt ?? "Product image"}
    >
      {/* Diagonal denim-weave stripe pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="denim-weave"
            width="10"
            height="10"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="10" stroke="#1E3A5F" strokeWidth="4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#denim-weave)" />
      </svg>

      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-heading font-semibold tracking-[0.4em] uppercase select-none"
          style={{ fontSize: "clamp(1rem, 6cqw, 2.5rem)", color: "#E7E1D6" }}
        >
          BHD
        </span>
      </div>
    </div>
  );
}
