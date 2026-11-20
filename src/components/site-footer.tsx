import { cacheLife } from "next/cache";
import { site } from "@/content/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
        <p
          aria-hidden="true"
          className="font-mono text-[clamp(2rem,8.5vw,6.5rem)] leading-none font-medium tracking-[-0.06em] text-line-strong select-none"
        >
          builtbydylan<span className="text-accent/40">.dev</span>
        </p>

        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-muted">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-fg">
                    {item.label.toLowerCase()}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-accent transition-colors hover:text-fg">
                  contact
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer me" className="transition-colors hover:text-fg">
                    {s.label.toLowerCase()} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="font-mono text-xs text-faint">
            © <CurrentYear /> {site.name}. Designed &amp; built by Dylan, obviously.
          </p>
        </div>
      </div>
    </footer>
  );
}
