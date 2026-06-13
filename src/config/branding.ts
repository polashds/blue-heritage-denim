export const brand = {
  name: "ByteFlow AI Labs",
  tagline: "AI Automation for Modern Business",
  description:
    "We design, build, and deploy AI automation systems that help businesses save time, reduce costs, and scale intelligently.",
  logo: "/assets/logo.png",
  email: "hello@byteflowailabs.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byteflowailabs.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61573260581403",
    linkedin: "https://www.linkedin.com/groups/14521611/",
    instagram: "https://www.instagram.com/byteflowailabs/",
    youtube: "https://www.youtube.com/@ByteFlowAILabs",
    twitter: "https://x.com/byteflowailabs",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legalNav: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
  chatWidget: {
    enabled: true,
    greeting: "👋 Looking to automate your business with AI? Ask me anything.",
    teaserDelaySeconds: 7,
  },
  colors: {
    primary: "#2563EB",
    accent: "#22D3EE",
    bg: "#070B16",
    surface: "#0F1729",
    text: "#E6EDF7",
    muted: "#8B95A7",
    border: "rgba(45,125,249,0.16)",
    lightBg: "#FFFFFF",
    lightSurface: "#F6F8FC",
  },
} as const;
