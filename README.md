# builtbydylan.dev

Marketing site for **Built by Dylan**: websites and care plans for local businesses and startups.

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · hosted on Vercel · contact form email via Resend.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without a Resend key, contact form submissions are printed to the terminal, so you can test the form freely.

## Editing content

All copy lives in `src/content/`, so you rarely need to touch components:

| File | What it controls |
| --- | --- |
| `site.ts` | Name, location, photo, SEO title/description, availability badge, reply time, hero promises, nav, social links |
| `services.ts` | Service cards with starting prices, plus the "also available" extras |
| `projects.ts` | The Work section (see below) |
| `testimonials.ts` | Client quotes. The Testimonials section appears once this has an entry |
| `process.ts` | "How a project works" steps and "Why work with me" points |
| `faq.ts` | FAQ questions and answers (also published as FAQ structured data for Google) |

The bio and toolbox are in `src/components/about.tsx`. Your headshot is `public/dylan-hovanec.jpg`.

### Adding projects

1. Put a screenshot in `public/work/` (16:10 works best, e.g. 1600×1000).
2. Add an entry to `projects` in `src/content/projects.ts`. Set `featured: true` to show it full width.

## 3D build moments

Three pinned sections (`BuildMoment` in `src/app/page.tsx`) build a laptop, a phone and a business card out of blocks as you scroll, using three.js (`src/components/build/`). Change what's on a device screen with its `screen` prop (any image in `public/`). three.js only downloads when a moment is near the screen, the animation only runs while it's visible, and visitors who prefer reduced motion see the finished devices without the scroll effect.

## Link preview image

`src/app/opengraph-image.png` is the picture people see when the link is shared (Messages, Slack, social). It's a 1200×630 screenshot of the hero; replace it if the hero changes. Preview URLs follow Vercel's production domain automatically (`src/lib/site-url.ts`).

## Contact form → your inbox (Resend)

The form posts to a server action (`src/app/actions.ts`), which validates input, filters out bots (honeypot field plus a too-fast-to-be-human check) and emails you through Resend. Replying to the email replies straight to the person who filled it in.

One-time setup:

1. Create a free account at [resend.com](https://resend.com).
2. **Domains → Add domain** → `builtbydylan.dev`, then add the DNS records it shows at your DNS provider (if your DNS is on Vercel: Vercel → Domains → builtbydylan.dev → DNS Records). Wait for it to verify.
3. **API Keys → Create API key** (sending access is enough).
4. In **Vercel → Project → Settings → Environment Variables**, add:
   - `RESEND_API_KEY`: the key from step 3
   - `CONTACT_TO_EMAIL`: the inbox where inquiries should go (builtbydylan.dev@gmail.com)
   - `CONTACT_FROM_EMAIL` (optional): defaults to `Built by Dylan <inquiries@builtbydylan.dev>`
5. Redeploy, then send yourself a test inquiry.

See `.env.example` for the full list. In production, if the key is missing, visitors see a friendly "please try again" message and the error is logged in Vercel's function logs.

## Deploying

Vercel builds every push automatically: `main` goes to production, other branches get preview URLs. There's no extra config beyond the environment variables above.

## Project layout

```
src/
  app/
    layout.tsx            fonts, metadata, skip link
    page.tsx              composes the sections + JSON-LD structured data
    actions.ts            contact form server action
    opengraph-image.png   link preview image (screenshot of the hero)
    icon.svg, robots.ts, sitemap.ts, not-found.tsx
    fonts/                self-hosted Geist + JetBrains Mono (no Google Fonts request)
  components/             one file per section, plus ui.tsx primitives
    build/                3D scroll moments (three.js)
  content/                editable copy (see above)
  lib/                    form validation + Resend email sender
```

The hero terminal animation is pure CSS. It works without JavaScript, and it shows the finished state immediately for visitors who prefer reduced motion.

Fonts: [Geist](https://github.com/vercel/geist-font) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), both under the SIL Open Font License.
