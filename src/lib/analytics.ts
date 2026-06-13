export function trackGA4Lead() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead");
}

export function trackPixelLead() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead");
}
