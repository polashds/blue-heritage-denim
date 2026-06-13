export const brand = {
  name: "Blue Heritage Denim",
  tagline: "Premium Heritage Denim Built for Modern Life",
  description:
    "Blue Heritage Denim crafts premium heritage denim — built with exceptional materials, designed for modern everyday life. Free shipping on orders over ৳2,000.",
  logo: "/assets/logo.png",
  email: "hello@blueheritageenim.com",
  phone: "+880 1700-000000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blueheritageenim.com",
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
    pinterest: "#",
  },
  legalNav: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
  chatWidget: {
    enabled: true,
    greeting: "Hi! Looking for the perfect denim? Ask me about sizing, fit, or our collections.",
    teaserDelaySeconds: 10,
  },
  colors: {
    primary: "#2563EB",
    bg: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    muted: "#94A3B8",
    border: "rgba(248,250,252,0.08)",
  },
} as const;
