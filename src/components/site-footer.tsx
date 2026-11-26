import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import { ArrowUpRight, LogoMark } from "./ui";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-10" />
              <p className="text-2xl font-semibold tracking-[-0.02em]">{site.name}</p>
            </div>
            <p className="mt-4 max-w-sm leading-relaxed text-white/70">
              Websites for small businesses, churches &amp; ministries, and startups. Based in{" "}
              {site.location}, working everywhere.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-accent-soft"
          >
            Get a free quote
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/75">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer me"
                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                  >
                    {s.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-white/60">
            © <CurrentYear /> {site.owner} · {site.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
