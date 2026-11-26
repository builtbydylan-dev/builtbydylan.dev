import { site } from "@/content/site";

/**
 * The live site's origin, used for link previews, canonical URLs and the sitemap.
 *
 * On Vercel this follows the project's production domain automatically: the
 * vercel.app address today, builtbydylan.dev once that domain is connected.
 * Locally and elsewhere it falls back to the domain in src/content/site.ts.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : site.url;
