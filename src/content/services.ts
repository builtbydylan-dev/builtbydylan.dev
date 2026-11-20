export type Service = {
  /** Folder-style id shown in the card header, e.g. `marketing-sites/`. */
  id: string;
  title: string;
  summary: string;
  includes: string[];
  goodFit: string;
};

export const services: Service[] = [
  {
    id: "marketing-sites",
    title: "Marketing websites",
    summary:
      "A custom site that explains what you do, shows up on Google, and turns visitors into calls, bookings and sign-ups.",
    includes: [
      "Custom design, no templates",
      "Mobile-first, fast-loading build",
      "On-page SEO, sitemap and search setup",
      "Contact forms, booking links and analytics",
      "Help shaping your copy and content",
      "Launch, domain and hosting setup",
    ],
    goodFit:
      "You're launching a business, replacing a dated site, or need a credible startup landing page, fast.",
  },
  {
    id: "care-and-maintenance",
    title: "Care & maintenance",
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
      "You'd rather run your business than wrestle with your website, including sites I didn't build.",
  },
];
