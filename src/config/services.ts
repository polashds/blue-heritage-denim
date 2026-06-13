export type ServiceItem = {
  title: string;
  description: string;
  includes: string[];
};

export type ServiceCategory = {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  body: string;
  services: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "n8n-infrastructure",
    icon: "⚙️",
    title: "n8n VPS Infrastructure",
    tagline: "Self-hosted automation on your own server — 400+ integrations, no SaaS fees, yours forever.",
    body: "We install, configure, and manage n8n on your own VPS so every workflow runs on infrastructure you control. No per-automation pricing, no vendor lock-in — just your server, your data, your workflows running exactly as designed.",
    services: [
      {
        title: "VPS Setup & n8n Installation",
        description:
          "Get a production-ready n8n instance running on your VPS in under 48 hours — secure, SSL-terminated, and Traefik-routed from day one.",
        includes: [
          "VPS selection guidance & provisioning",
          "Docker + Traefik reverse proxy setup",
          "SSL certificate via Let's Encrypt (auto-renew)",
          "n8n installation, hardening & admin credentials",
          "Backup strategy & deployment documentation",
        ],
      },
      {
        title: "Custom Workflow Development",
        description:
          "We design and build n8n workflows tailored to your exact processes — from simple 3-step automations to complex multi-branch logic with error recovery and retry handling.",
        includes: [
          "1-hour process discovery & scoping session",
          "Visual workflow design & architecture diagram",
          "Third-party API integrations (any REST or webhook)",
          "Error handling, retry logic & Slack/WhatsApp failure alerts",
          "Full workflow documentation & Loom walkthrough",
        ],
      },
      {
        title: "Workflow Audit & Migration",
        description:
          "Already on Zapier, Make, or a messy n8n instance? We audit what you have, identify failure points, and rebuild for reliability — often cutting running costs by 60% or more.",
        includes: [
          "Full audit of existing workflows & integrations",
          "Bottleneck & reliability analysis report",
          "Clean rebuild or migration to self-hosted n8n",
          "Performance optimisation & deduplication",
          "Handover report with cost comparison",
        ],
      },
      {
        title: "n8n Ongoing Management",
        description:
          "A monthly retainer for teams who want their workflows monitored, maintained, and expanded as the business grows — without needing to manage n8n themselves.",
        includes: [
          "24/7 uptime monitoring with instant alerts",
          "Bug fixes within 24 hours",
          "Monthly execution & cost efficiency report",
          "Up to 8h of new workflow development per month",
          "Quarterly workflow optimisation review",
        ],
      },
    ],
  },

  {
    id: "whatsapp-automation",
    icon: "💬",
    title: "WhatsApp Automation & Chatbots",
    tagline: "Capture leads, answer questions, and close sales on WhatsApp — in Bengali and English, 24/7.",
    body: "WhatsApp is where your customers already are. We connect you to the official WhatsApp Business API and build AI-powered chatbots, broadcast systems, and ordering flows that qualify leads, handle enquiries, and drive conversions — automatically, round the clock.",
    services: [
      {
        title: "WhatsApp Business API Setup",
        description:
          "Get connected to the official Meta WhatsApp Business API — the foundation for high-volume messaging, chatbots, and broadcast campaigns at scale.",
        includes: [
          "Meta Business Manager & WABA account setup",
          "Phone number provisioning & verification",
          "Webhook configuration & API connection via n8n",
          "Test message flows & delivery confirmation",
          "Compliance checklist & opt-in documentation",
        ],
      },
      {
        title: "AI WhatsApp Chatbot (Bengali + English)",
        description:
          "A bilingual AI assistant that lives on your WhatsApp number — answering FAQs, qualifying leads, and capturing contact details around the clock without a human on standby.",
        includes: [
          "GPT-4o / Claude-powered response engine",
          "Full Bengali + English language support",
          "Custom FAQ training on your business context",
          "Lead capture flow (name, phone, requirement)",
          "Handoff to human agent with full conversation context",
          "CRM logging of every interaction",
        ],
      },
      {
        title: "WhatsApp Broadcast Campaigns",
        description:
          "Send targeted, personalised broadcast messages to segmented customer lists — promotions, reminders, re-engagement, and follow-ups that get read (open rates consistently above 80%).",
        includes: [
          "Audience segmentation & list management",
          "Message template creation & Meta approval",
          "Scheduled broadcast with personalisation tokens",
          "Delivery & read receipt analytics",
          "Opt-out handling & compliance automation",
        ],
      },
      {
        title: "Order & Booking Flows on WhatsApp",
        description:
          "Let customers place orders, book appointments, or confirm payments via bKash/Nagad — entirely inside WhatsApp, with no app download or website visit required.",
        includes: [
          "Multi-step conversational order or booking flow",
          "bKash & Nagad payment link integration",
          "Booking confirmation & automated reminders",
          "Order or appointment status update notifications",
          "CRM and inventory sync via n8n",
        ],
      },
    ],
  },

  {
    id: "voice-agents",
    icon: "🎙️",
    title: "AI Voice Agents & Receptionists",
    tagline: "Answer every call instantly, qualify leads, and book appointments — no receptionist required.",
    body: "Never miss an inbound call again. Our AI voice agents handle FAQs, qualify callers, book appointments, and route to humans when needed — logging every call to your CRM automatically so your team always has context.",
    services: [
      {
        title: "AI Phone Receptionist",
        description:
          "An AI voice agent that picks up every inbound call, answers FAQs naturally, and routes to the right person — 24/7, with no hold music and no missed leads.",
        includes: [
          "Voice agent configuration & persona setup",
          "FAQ script writing & AI training",
          "Business-hours & after-hours routing logic",
          "Fallback-to-human with warm handoff messaging",
          "Call transcript, duration & outcome logging",
        ],
      },
      {
        title: "AI Outbound Follow-Up Caller",
        description:
          "Call new leads automatically within minutes of their enquiry. The AI qualifies them, answers common questions, and books a meeting — at a scale impossible with a human team.",
        includes: [
          "Lead trigger setup (form, WhatsApp, CRM event)",
          "Outbound call script & qualification question flow",
          "Appointment booking integration (Google Calendar, Calendly)",
          "CRM update post-call (qualified/not qualified, next step)",
          "Automatic escalation for hot leads",
        ],
      },
      {
        title: "Post-Call AI Summaries & CRM Logging",
        description:
          "Every call gets an AI-generated summary, extracted action items, and automatic CRM update — so your team always knows what was discussed without taking a single note.",
        includes: [
          "Call recording integration",
          "AI transcription & structured summarisation",
          "CRM field mapping (deal stage, next action, contact notes)",
          "Action-item extraction & task creation",
          "Email or WhatsApp summary delivery to assigned rep",
        ],
      },
      {
        title: "Voice Appointment Booking Agent",
        description:
          "Callers can book, reschedule, or cancel appointments by talking naturally to an AI — fully synced with your calendar system and followed up automatically.",
        includes: [
          "Calendar API integration (Google Calendar, Outlook, Calendly)",
          "Natural-language booking & live availability checking",
          "Booking confirmation via SMS or WhatsApp",
          "24h automated reminder sequence",
          "No-show follow-up workflow",
        ],
      },
    ],
  },

  {
    id: "lead-scoring-crm",
    icon: "📊",
    title: "AI Lead Scoring & CRM Automation",
    tagline: "Focus your team on the leads most likely to close. Everything else runs itself.",
    body: "We build automated pipelines that capture leads from every source, enrich and score them with AI, and move them through your CRM without manual effort — so your team spends time selling, not data-entering or chasing cold leads.",
    services: [
      {
        title: "Lead Capture & Enrichment Pipeline",
        description:
          "Automatically pull in leads from Meta Ads, WhatsApp, landing pages, and contact forms — enrich with company and location data, deduplicate, and route to the right rep in seconds.",
        includes: [
          "Multi-source lead ingestion (Meta, forms, WhatsApp, email)",
          "Data enrichment (company, industry, location, LinkedIn)",
          "Duplicate detection & intelligent merge",
          "CRM routing rules by source, product, or region",
          "Instant WhatsApp or Slack alert to assigned rep",
        ],
      },
      {
        title: "AI Lead Scoring",
        description:
          "Score every inbound lead 0–100 in real time based on fit, behaviour, and intent signals. Your team focuses on the top 20% — automation nurtures the rest.",
        includes: [
          "Scoring model design & signal selection",
          "Fit signals (industry, company size, location, enquiry type)",
          "Intent & behavioural signals (page visits, WhatsApp activity)",
          "Real-time score updates in your CRM",
          "Score-based routing & automated follow-up triggers",
        ],
      },
      {
        title: "CRM Pipeline Automation",
        description:
          "Automate deal stage transitions, follow-up task creation, and stale-deal alerts — so nothing slips through the cracks and your pipeline data is always accurate.",
        includes: [
          "Stage-transition trigger rules",
          "Automatic follow-up task generation",
          "Activity-based deal updates",
          "Stale-deal & overdue-task alerts",
          "Win/loss tagging & reporting automation",
        ],
      },
      {
        title: "Automated Sales Follow-Up Sequences",
        description:
          "Personalised follow-up over WhatsApp, email, or SMS — triggered automatically by what a lead does, not by what your rep remembers to send.",
        includes: [
          "Multi-channel sequence builder (WhatsApp, email, SMS)",
          "Personalisation tokens (name, company, enquiry type)",
          "Behavioural triggers (no reply, link click, meeting booked)",
          "Auto-pause on reply or confirmed booking",
          "Reply-rate & conversion analytics",
        ],
      },
    ],
  },

  {
    id: "meta-tracking",
    icon: "📡",
    title: "Meta Pixel, CAPI & Server-Side Tracking",
    tagline: "Accurate conversion data — even with ad blockers and iOS privacy changes.",
    body: "Poor tracking means poor optimisation and wasted ad budget. We install and validate your Meta Pixel, implement server-side Conversions API to recover signal lost to browser restrictions, and build dashboards so you always know your true cost per lead and ROAS.",
    services: [
      {
        title: "Meta Pixel Setup & Audit",
        description:
          "Install or fully audit your Meta Pixel to ensure all standard and custom events fire correctly — no data leakage, no double-counting, no conversions falling through the gap.",
        includes: [
          "Pixel installation or comprehensive audit",
          "Standard event mapping (PageView, ViewContent, Lead, Purchase, InitiateCheckout)",
          "Custom event setup for your specific funnel steps",
          "Browser console & Meta Events Manager testing",
          "Event deduplication configuration",
        ],
      },
      {
        title: "Conversions API (Server-Side)",
        description:
          "Send conversion events directly from your server to Meta — bypassing ad blockers, browser extensions, and iOS 14+ tracking restrictions. Recover up to 30% of previously lost conversion signal.",
        includes: [
          "CAPI integration via n8n or server-side endpoint",
          "Event deduplication using eventID matching",
          "Parameter mapping with privacy-safe hashing (email, phone)",
          "Test event verification in Meta Events Manager",
          "Match quality score monitoring & improvement recommendations",
        ],
      },
      {
        title: "Custom Audience & Retargeting Setup",
        description:
          "Build high-intent audiences from your website visitors, leads, and customer lists for cost-efficient retargeting that converts — not spray-and-pray campaigns.",
        includes: [
          "Website Custom Audience creation & rule configuration",
          "Lookalike Audience setup (1%, 2%, 5% tiers)",
          "Customer list upload & match rate optimisation",
          "Audience exclusion layers (existing customers, recent buyers)",
          "Audience strategy documentation & refresh schedule",
        ],
      },
      {
        title: "Attribution & Ad Performance Dashboard",
        description:
          "A clear, always-on view of which campaigns, ad sets, and creatives are generating leads — with cost-per-lead, ROAS, and automated weekly reports delivered to your inbox.",
        includes: [
          "Meta Ads API integration",
          "Dashboard build (Looker Studio or Metabase)",
          "Cost-per-lead & ROAS tracking by campaign and ad set",
          "Creative performance breakdown",
          "Weekly automated PDF or WhatsApp report",
        ],
      },
    ],
  },

  {
    id: "content-seo",
    icon: "✍️",
    title: "AI Content Automation & SEO",
    tagline: "Publish consistently, rank higher, and generate leads — without a full-time content team.",
    body: "We build content pipelines that use AI to generate, review, and publish SEO-optimised articles, social posts, and metadata at scale — with your brand voice locked in and a human approval step built in so quality never slips.",
    services: [
      {
        title: "AI Blog & Article Pipeline",
        description:
          "Go from keyword to published article automatically — AI drafting, brand-voice prompting, human review, and auto-publish to your CMS, all wired into one seamless pipeline.",
        includes: [
          "Keyword research integration (Ahrefs, Semrush, or provided list)",
          "AI draft generation with brand-voice prompt engineering",
          "Content brief & SEO outline generation",
          "Human review & approval step before publish",
          "Auto-publish to CMS (WordPress, Sanity, custom Next.js)",
        ],
      },
      {
        title: "Social Media Automation",
        description:
          "Repurpose every blog post into social content for Facebook, LinkedIn, and Instagram — automatically adapted for each platform, scheduled, and published.",
        includes: [
          "Content repurposing pipeline (blog → social copy)",
          "Platform-specific format & tone adaptation",
          "Image prompt generation for accompanying visuals",
          "Scheduling & publishing via n8n + platform APIs",
          "Engagement monitoring & anomaly alert setup",
        ],
      },
      {
        title: "AI SEO Metadata & Schema Markup",
        description:
          "Automatically generate and update title tags, meta descriptions, and structured data across every page — at scale, with no manual effort per page.",
        includes: [
          "Full site metadata audit & gap analysis",
          "AI title & description generation (CTR-optimised)",
          "Schema markup implementation (Article, FAQ, LocalBusiness, Product)",
          "CMS integration for bulk updates",
          "Monthly freshness refresh & monitoring",
        ],
      },
      {
        title: "Lead Magnet & Email Nurture Automation",
        description:
          "Build the full top-of-funnel: lead magnet delivery, welcome sequence, nurture emails, and re-engagement — all triggered automatically by subscriber behaviour.",
        includes: [
          "Lead magnet delivery workflow (PDF, video, checklist)",
          "Welcome & nurture sequence (5–7 emails)",
          "Behaviour-based triggers (opened, clicked, inactive)",
          "Personalisation tokens (name, company, sign-up source)",
          "Unsubscribe & list hygiene automation",
        ],
      },
    ],
  },

  {
    id: "websites-funnels",
    icon: "🌐",
    title: "Websites, Landing Pages & Funnels",
    tagline: "Fast, conversion-optimised web presence — built on Next.js, deployed to your VPS.",
    body: "We design and build websites, landing pages, and sales funnels that convert. Every project is built on Next.js for speed and SEO, deployed to your own server (no Vercel dependency or hosting lock-in), and wired to your automation and CRM stack from launch day.",
    services: [
      {
        title: "Business Website (Next.js)",
        description:
          "A fast, SEO-ready website custom-designed for your business — mobile-first, CMS-connected, deployed to your VPS, and optimised for Core Web Vitals from the start.",
        includes: [
          "Custom design (up to 8 pages)",
          "Next.js App Router development",
          "Mobile-first, fully responsive layout",
          "Admin CMS integration (headless or built-in panel)",
          "SSL + Docker deployment to your VPS",
          "Core Web Vitals & page speed optimisation",
        ],
      },
      {
        title: "High-Converting Landing Page",
        description:
          "A single-purpose landing page engineered to turn ad traffic into leads — A/B test-ready, wired directly to your CRM, and tracked with Meta Pixel + CAPI from day one.",
        includes: [
          "Conversion-focused design & benefit-driven copywriting",
          "Lead capture form with CRM integration",
          "Meta Pixel + CAPI event setup",
          "A/B variant support",
          "Page speed optimisation (target <2s load)",
        ],
      },
      {
        title: "Sales Funnel with Automation",
        description:
          "A multi-step funnel (landing page → thank-you → follow-up) with automated WhatsApp and email nurturing so every lead gets followed up within minutes — not days.",
        includes: [
          "Multi-page funnel design & build",
          "Automated follow-up sequence (WhatsApp + email)",
          "Lead CRM sync & tagging",
          "Funnel drop-off analytics & heatmap setup",
          "UTM parameter capture & source attribution",
        ],
      },
      {
        title: "Ad-Ready Landing Page (Meta / Google)",
        description:
          "Fast-loading, mobile-first pages built to maximise Quality Score and conversion rate for paid campaigns — including bKash and Nagad payment options for BD markets.",
        includes: [
          "Ad-to-page message match & headline alignment",
          "Above-the-fold conversion optimisation",
          "bKash & Nagad payment link integration",
          "Speed optimisation (target <1.5s LCP)",
          "UTM tracking & Meta CAPI wiring",
        ],
      },
    ],
  },

  {
    id: "maintenance",
    icon: "🛡️",
    title: "Maintenance & Retainers",
    tagline: "Keep everything running, monitored, and improving — without managing it yourself.",
    body: "Automations break when APIs change. Traffic spikes reveal bottlenecks. New opportunities emerge monthly. Our maintenance and retainer plans ensure your systems stay healthy, stay accurate, and keep pace with your growth — with a named point of contact who knows your stack.",
    services: [
      {
        title: "Automation Monitoring & Health Checks",
        description:
          "24/7 monitoring of your n8n workflows with instant alerts when something breaks — and fast remediation before it starts affecting your business operations.",
        includes: [
          "Uptime monitoring with WhatsApp + email alerts",
          "Monthly execution & error-rate report",
          "Workflow failure investigation & fix within 4 hours",
          "API deprecation & breaking-change alerts",
          "Quarterly workflow review & performance optimisation",
        ],
      },
      {
        title: "CRM & Integration Maintenance",
        description:
          "Keep your CRM integrations, webhooks, and third-party connections running reliably as APIs update and your stack evolves — with no surprises.",
        includes: [
          "Monthly API compatibility checks",
          "Webhook health monitoring & automatic re-registration",
          "2 maintenance updates included per month",
          "Priority bug fix queue",
          "Integration change log & documentation updates",
        ],
      },
      {
        title: "Growth Retainer",
        description:
          "A monthly block of hours for businesses that want to keep building — new automations, landing pages, AI experiments, and continuous improvement of what's already live.",
        includes: [
          "10–20h monthly capacity (flexible scope each month)",
          "Priority scheduling & same-week kick-off",
          "Monthly strategy call & roadmap review",
          "Rollover hours (up to 1 month)",
          "Discounted rates on out-of-scope project work",
        ],
      },
      {
        title: "Annual System Review",
        description:
          "A once-per-year deep audit of every automation and integration we've built — performance, costs, conversion rates, and opportunities — delivered as a written report with a ranked action plan.",
        includes: [
          "Full workflow & automation performance audit",
          "API & hosting cost analysis",
          "Lead capture & conversion rate review",
          "Priority-ranked optimisation roadmap",
          "1h strategy call to present findings & recommendations",
        ],
      },
    ],
  },
];
