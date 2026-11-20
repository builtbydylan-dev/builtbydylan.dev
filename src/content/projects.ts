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
  /** Optional outcomes, e.g. "Bookings up 40% in 3 months". Only use real numbers. */
  results?: string[];
};

/**
 * Add your projects here, newest first.
 * While this list is empty, the Work section shows "case study loading" slots.
 *
 * Example:
 * {
 *   name: "Acme Plumbing",
 *   client: "Local trades business",
 *   summary: "Replaced a slow template site with a fast custom build focused on emergency call-outs.",
 *   tags: ["Marketing site", "Local SEO"],
 *   year: 2026,
 *   url: "https://example.com",
 *   image: "/work/acme.jpg",
 *   results: ["Loads in under 1s on mobile"],
 * },
 */
export const projects: Project[] = [];
