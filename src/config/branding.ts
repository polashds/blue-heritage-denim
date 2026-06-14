export const brand = {
  name: "Blue Heritage Denim",
  tagline: "Premium Heritage Denim Built for Modern Life",
  description:
    "Blue Heritage Denim crafts premium heritage denim — built with exceptional materials, designed for modern everyday life. Free shipping on orders over ৳2,000.",
  logo: "/assets/logo.png",
  email: "hello@blueheritaɡedenim.com",
  phone: "+880 1700-000000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blueheritaɡedenim.com",
  social: {
    instagram: "#",
    facebook: "https://www.facebook.com/profile.php?id=61589687601812",
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
    primary: "#2B5489",   // denim-blue
    indigo:  "#1E3A5F",   // deep indigo (headings)
    tan:     "#B5895A",   // leather-tan (sparing)
    bg:      "#FAF7F0",   // canvas cream
    surface: "#F0EBE0",   // warm off-white
    text:    "#1C1C1C",   // charcoal
    muted:   "#6B6560",   // warm medium gray
    border:  "#E7E1D6",   // soft border
  },
} as const;
