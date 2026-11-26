export type Project = {
  /** Client or project name. */
  name: string;
  /** Kind of business, e.g. "Family-run bakery" or "Seed-stage SaaS". */
  client: string;
  /** One or two sentences: the problem and what you built. */
  summary: string;
  /** Short tags, e.g. ["Marketing site", "SEO"]. */
  tags: string[];
  year: number;
  /** Live site, if public. */
  url?: string;
  /** Screenshot in /public, e.g. "/work/acme.jpg" (16:10 works best). */
  image?: string;
  /** Optional outcomes. Only use real, verifiable facts. */
  results?: string[];
  /** Show this project larger, across the full width. */
  featured?: boolean;
};

/** Newest or most important first. Screenshots live in /public/work (1600×1000). */
export const projects: Project[] = [
  {
    name: "Ministry Roots",
    client: "My own product · youth ministry software",
    summary:
      "Ministry Roots builds tools for youth ministry teams, focused on relationships, not just administration. I founded it and built the website plus Roots, its app for iPhone, Android and the web, with student profiles, team chat, reminders, push notifications and subscriptions.",
    tags: ["Website", "iOS & Android app", "Subscriptions"],
    year: 2026,
    url: "https://ministryroots.com",
    image: "/work/ministry-roots.jpg",
    results: [
      "Live on the App Store and Google Play",
      "Used by youth ministry teams, including Greenford Christian Church",
    ],
    featured: true,
  },
  {
    name: "The Well Productions",
    client: "Worship ministry consulting",
    summary:
      "A site for The Well Consulting, which helps senior pastors and worship pastors get aligned and build healthy worship ministries. A bold look, clear service pages and one simple next step: set up a conversation.",
    tags: ["Marketing site", "Ministry"],
    year: 2026,
    url: "https://www.thewellproductions.com",
    image: "/work/the-well-productions.jpg",
  },
  {
    name: "MAVON Beauty",
    client: "Bridal hair & makeup · Copley, OH",
    summary:
      "A site for a Northeast Ohio bridal hair and makeup studio: service pages for weddings, studio and holiday glam, a gallery, venue guides and a journal, all built to turn browsing brides into booked dates.",
    tags: ["Marketing site", "SEO", "Blog"],
    year: 2026,
    url: "https://mavonbeauty.com",
    image: "/work/mavon-beauty.jpg",
  },
];
