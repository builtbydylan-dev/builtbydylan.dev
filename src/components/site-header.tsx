"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { buttonClass } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <a
          href="#top"
          className="group font-mono text-[15px] font-medium tracking-tight whitespace-nowrap"
          aria-label={`${site.name}, back to top`}
        >
          <span className="text-accent">❯</span> builtbydylan
          <span className="text-faint transition-colors group-hover:text-muted">.dev</span>
          <span className="animate-blink text-accent" aria-hidden="true">
            _
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 font-mono text-[13px] text-muted">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a href="#contact" className={buttonClass("primary", "!px-4 !py-2 text-[13px]")}>
              Start a project
            </a>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong text-muted transition-colors hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3.5 6h13M3.5 10h13M3.5 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-bg/95 md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-4 py-3 font-mono text-[15px]">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-2 py-3 text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <span className="text-accent">❯</span>
                {item.label.toLowerCase()}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <a href="#contact" onClick={() => setOpen(false)} className={buttonClass("primary", "w-full")}>
              Start a project
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
