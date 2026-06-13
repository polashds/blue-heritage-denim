export type IndustrySolution = {
  id: string;
  icon: string;
  industry: string;
  tagline: string;
  problem: string;
  solution: string;
  benefits: string[];
  relatedServiceIds: string[];
};

export const industrySolutions: IndustrySolution[] = [
  {
    id: "real-estate",
    icon: "🏢",
    industry: "Real Estate",
    tagline: "Turn every Facebook lead into an instant WhatsApp conversation — before your competitor does.",
    problem:
      "Real estate agents in Bangladesh run Facebook and Instagram campaigns that generate tens — sometimes hundreds — of enquiries per day. But by the time an agent checks their phone or CRM, the lead has already called someone else. There's no system for prioritising hot leads over cold ones, and no way to engage a prospect at 11pm when they're browsing listings.",
    solution:
      "We wire every lead source — Facebook lead forms, website contact forms, landing pages — into an n8n pipeline that fires an instant WhatsApp alert to the right agent within seconds of submission. An AI chatbot on your website and WhatsApp handles initial enquiries, qualifies intent, and collects property requirements automatically, even outside business hours. Lead scoring ranks every prospect by property type, budget, and engagement level so agents always know who to call first.",
    benefits: [
      "Every lead acknowledged within 60 seconds, day or night",
      "AI chatbot qualifies and captures requirements 24/7",
      "Agents focus only on pre-qualified, high-intent prospects",
      "Clear attribution — know exactly which ad campaigns generate conversions",
      "Admin CRM tracks every interaction without third-party SaaS tools",
    ],
    relatedServiceIds: [
      "whatsapp-automation",
      "lead-scoring-crm",
      "meta-tracking",
      "n8n-infrastructure",
    ],
  },

  {
    id: "ecommerce",
    icon: "🛒",
    industry: "E-commerce",
    tagline: "Recover abandoned carts, automate support, and fix your Meta tracking — all without extra headcount.",
    problem:
      "WooCommerce and Shopify stores routinely lose 65–75% of potential orders to cart abandonment — and most stores do nothing about it. Post-iOS 14, Meta Pixel data has become unreliable, making ad optimisation guesswork. Meanwhile, customer support tickets pile up with questions that the same FAQ could answer in seconds.",
    solution:
      "We build an automated cart recovery pipeline that sends a personalised WhatsApp or email message to abandoning customers, timed to land when they're most likely to return. Server-side Conversions API (CAPI) recovers signal lost to browser blockers and iOS privacy restrictions, making ad optimisation accurate again. An AI chatbot on WhatsApp and your site handles order status, return queries, and product questions automatically — reducing support volume without adding staff.",
    benefits: [
      "Cart recovery running automatically — no manual follow-up",
      "Accurate Meta attribution even with iOS privacy changes",
      "Support volume reduced through AI-powered self-service",
      "Order and shipping notifications sent automatically",
      "Every interaction logged to CRM for sales team visibility",
    ],
    relatedServiceIds: [
      "whatsapp-automation",
      "meta-tracking",
      "n8n-infrastructure",
      "lead-scoring-crm",
    ],
  },

  {
    id: "travel-hospitality",
    icon: "✈️",
    industry: "Travel & Hospitality",
    tagline: "Respond to every booking enquiry instantly — and let the AI close the conversation while you sleep.",
    problem:
      "A travel agency's most critical asset is response speed. When a customer enquires about a Cox's Bazar or Maldives package on WhatsApp at 9pm, and a competitor responds in 5 minutes while you respond in 5 hours, the booking is already lost. Manual itinerary creation and follow-up sequences don't scale as enquiry volume grows.",
    solution:
      "An AI WhatsApp chatbot handles initial enquiries, captures destination, dates, group size, and budget, and delivers a tailored package summary automatically — overnight or in minutes. Qualified, high-intent leads trigger an immediate alert to your booking team. Prospects who don't convert within 24 hours enter a structured WhatsApp follow-up sequence over the next 72 hours, keeping your agency top of mind.",
    benefits: [
      "Every enquiry gets an immediate personalised response, any hour",
      "Itinerary information delivered automatically to qualified prospects",
      "Booking team notified only for high-intent, ready-to-book leads",
      "72-hour follow-up sequence converts leads that would have gone cold",
      "All conversation history and lead data stored in your CRM",
    ],
    relatedServiceIds: [
      "whatsapp-automation",
      "lead-scoring-crm",
      "n8n-infrastructure",
      "websites-funnels",
    ],
  },

  {
    id: "healthcare-clinics",
    icon: "🏥",
    industry: "Healthcare & Clinics",
    tagline: "Never miss a new patient call — and cut no-shows with automated appointment reminders.",
    problem:
      "Clinic phone lines are busy during peak morning hours, leading to missed new patient enquiries that go straight to a competitor. Appointment reminders are sent manually — or not at all — resulting in no-shows that cost the clinic revenue every day. Reception staff spend a disproportionate amount of their time on routine calls that a system could handle.",
    solution:
      "An AI voice receptionist answers every inbound call 24/7 — handling appointment booking, FAQs about services and fees, and routing to clinical staff only when genuinely needed. Automated WhatsApp reminders go out 24 hours and 2 hours before every appointment, with one-tap confirm/reschedule options. New patient enquiries received outside opening hours are logged, triaged, and followed up first thing the next morning — automatically.",
    benefits: [
      "Zero missed new patient calls, even outside clinic hours",
      "No-show rate reduced through timely automated reminders",
      "Reception staff freed from routine appointment and FAQ calls",
      "Every call transcript and summary logged to patient record automatically",
      "Seamless Google Calendar or clinic software integration",
    ],
    relatedServiceIds: [
      "voice-agents",
      "whatsapp-automation",
      "n8n-infrastructure",
      "lead-scoring-crm",
    ],
  },

  {
    id: "local-services-smbs",
    icon: "🏪",
    industry: "Local Services & SMBs",
    tagline: "Capture every lead, follow up instantly, and stay visible online — all on autopilot.",
    problem:
      "Small business owners running Facebook ads or relying on WhatsApp enquiries often have no reliable system for capturing and responding to leads. Enquiries come in at all hours, content creation is sporadic and time-consuming, and most owners simply don't have bandwidth to manage customer conversations and run the business simultaneously.",
    solution:
      "A lightweight lead capture and follow-up system: Facebook lead forms or a landing page feed into an n8n pipeline that sends an instant WhatsApp notification to the owner and triggers an automated first-response message to the prospect within seconds. If the lead doesn't reply within a set window, a follow-up sequence continues on their behalf. An AI content pipeline keeps Facebook, Instagram, and the website updated without manual effort.",
    benefits: [
      "No enquiry goes unacknowledged regardless of time of day",
      "Automated first-response maintains trust before you can call back",
      "Follow-up sequence runs itself — leads don't go cold",
      "Consistent social media and website presence built automatically",
      "Entire setup runs on your own VPS — no monthly SaaS fees",
    ],
    relatedServiceIds: [
      "whatsapp-automation",
      "lead-scoring-crm",
      "content-seo",
      "n8n-infrastructure",
      "websites-funnels",
    ],
  },
];
