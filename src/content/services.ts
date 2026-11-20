export type Service = {
  /** Folder-style id shown in the card header, e.g. `marketing-sites/`. */
  id: string;
  title: string;
  /** Starting price, e.g. "from $250". */
  price: string;
  summary: string;
  includes: string[];
  goodFit: string;
};

export type Extra = {
  id: string;
  title: string;
  /** Starting price, or "custom quote". */
  price: string;
  summary: string;
};

export const services: Service[] = [
  {
    id: "marketing-sites",
    title: "Marketing websites",
    price: "from $250",
    summary:
      "A custom site that explains what you do, shows up on Google, and turns visitors into calls, bookings, sign-ups and new faces through the door.",
    includes: [
      "Custom design, no templates",
      "Mobile-first, fast-loading build",
      "On-page SEO, sitemap and search setup",
      "Contact forms, booking links and analytics",
      "Help shaping your copy and content",
      "Launch, domain and hosting setup",
    ],
    goodFit:
      "You run a local business, a church or ministry, or a startup, and you need a site people trust.",
  },
  {
    id: "care-and-maintenance",
    title: "Care & maintenance",
    price: "from $25/mo",
    summary:
      "Ongoing support that keeps your site fast, secure and up to date, without you having to think about it.",
    includes: [
      "Content and copy updates on request",
      "Uptime and performance monitoring",
      "Security and dependency updates",
      "Backups and hosting management",
      "Small improvements, month to month",
      "Fixes and refreshes for existing sites",
    ],
    goodFit:
      "You'd rather run your business or ministry than wrestle with your website, including sites I didn't build.",
  },
];

export const extras: Extra[] = [
  {
    id: "business-cards",
    title: "Digital business cards",
    price: "custom quote",
    summary:
      "A shareable card page with your contact details and links, plus an Apple Wallet pass so you're always one tap away.",
  },
  {
    id: "branding",
    title: "Logos & branding",
    price: "from $250",
    summary:
      "Logos, colors and type that make you look established, designed with my design partner and ready for web, social and print.",
  },
  {
    id: "email-automations",
    title: "Email & automations",
    price: "custom quote",
    summary:
      "Newsletters, announcement emails, reminders and automated follow-ups that save you time every week.",
  },
];
