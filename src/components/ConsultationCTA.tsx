/**
 * Smart CTA that routes to Calendly (if NEXT_PUBLIC_CALENDLY_URL is set)
 * or the contact form (/contact#contact-form) otherwise.
 * Pure Server Component — no client JS needed.
 */
import Link from "next/link";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function ConsultationCTA({ className, style, children }: Props) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (calendlyUrl) {
    return (
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href="/contact#contact-form" className={className} style={style}>
      {children}
    </Link>
  );
}
