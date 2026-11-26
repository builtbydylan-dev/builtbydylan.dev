import Image from "next/image";
import { site } from "@/content/site";
import { ArrowRight, BrowserFrame, ButtonLink, Check } from "./ui";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="wash pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="motion-safe:animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-bright opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
            </span>
            {site.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance"
          >
            Websites that work as hard as you do.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            I&apos;m Dylan Hovanec. I design, build and look after fast, modern websites for small
            businesses, churches &amp; ministries, and startups, so you can get back to the work that
            matters.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#contact">
              Get a free quote <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary">
              See my work
            </ButtonLink>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] text-muted">
            {site.promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Showcase />
      </div>
    </section>
  );
}

/** Real projects, layered: three sites in browser frames plus the Roots app on a phone. */
function Showcase() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[620px] motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
      <div aria-hidden="true" className="glow absolute -inset-10" />

      <BrowserFrame url="thewellproductions.com" className="absolute top-0 left-0 w-[64%] -rotate-3">
        <div className="relative aspect-[16/10]">
          <Image
            src="/work/the-well-productions.jpg"
            alt="The Well Productions website"
            fill
            sizes="(min-width: 1024px) 380px, 60vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>

      <BrowserFrame url="ministryroots.com" className="absolute top-[6%] right-0 w-[58%] rotate-3">
        <div className="relative aspect-[16/10]">
          <Image
            src="/work/ministry-roots.jpg"
            alt="Ministry Roots website"
            fill
            sizes="(min-width: 1024px) 360px, 55vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>

      <BrowserFrame url="mavonbeauty.com" className="absolute bottom-[4%] left-[8%] z-10 w-[74%]">
        <div className="relative aspect-[16/10]">
          <Image
            src="/work/mavon-beauty.jpg"
            alt="MAVON Beauty website"
            fill
            preload
            sizes="(min-width: 1024px) 460px, 72vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>

      <div className="absolute right-[3%] bottom-0 z-20 w-[22%] rotate-[4deg] rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-[0_24px_50px_-18px_rgb(22_24_29_/_0.55)]">
        <div className="relative aspect-[640/1385] overflow-hidden rounded-[1rem]">
          <Image
            src="/work/roots-app.webp"
            alt="The Roots app on a phone"
            fill
            sizes="(min-width: 1024px) 140px, 22vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <p className="absolute -bottom-3 left-[10%] z-30 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-fg shadow-sm">
        <span className="text-accent">●</span> Real sites, live right now
      </p>
    </div>
  );
}
