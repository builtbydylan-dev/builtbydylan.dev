import type { CSSProperties, ReactNode } from "react";
import { extras, services } from "@/content/services";
import { site } from "@/content/site";
import { ArrowRight, ButtonLink, Window } from "./ui";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="glow pointer-events-none absolute -top-56 left-1/2 h-[640px] w-[1000px] -translate-x-1/2"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-28 lg:pb-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.6rem,6.4vw,4.9rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
          >
            Websites that work as hard as you do
            <span className="animate-blink text-accent" aria-hidden="true">
              _
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            I&apos;m Dylan Hovanec. I design, build and look after fast, modern websites for{" "}
            <span className="text-fg">small businesses</span>,{" "}
            <span className="text-fg">churches &amp; ministries</span> and{" "}
            <span className="text-fg">startups</span>, so you can get back to the work that matters.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#contact">
              Start a project <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              See what I build
            </ButtonLink>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-muted">
            {site.promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroTerminal />
      </div>
    </section>
  );
}

type Step = { cmd: string; out: ReactNode };

const script: Step[] = [
  {
    cmd: "whoami",
    out: (
      <>
        dylan hovanec <span className="text-faint">·</span> web developer <span className="text-faint">·</span>{" "}
        {site.location.toLowerCase()}
      </>
    ),
  },
  {
    cmd: "ls services/",
    out: (
      <span className="flex flex-wrap gap-x-5">
        {[...services, ...extras].map((s) => (
          <span key={s.id} className="text-sky">
            {s.id}/
          </span>
        ))}
      </span>
    ),
  },
  {
    cmd: "cat checklist.txt",
    out: (
      <span className="grid gap-0.5">
        {["fast on every phone", "found on google", "easy to update", "yours to keep"].map((item) => (
          <span key={item}>
            <span className="text-accent">[x]</span> {item}
          </span>
        ))}
      </span>
    ),
  },
  {
    cmd: "./start-project.sh",
    out: (
      <>
        <span className="text-amber">→</span> opening inquiry form… <span className="text-faint">scroll down ↓</span>
      </>
    ),
  },
];

const CHAR_MS = 55;

/** Build per-line timings so each command types out, then its output appears. */
function timeline(steps: Step[]) {
  let t = 500;
  return steps.map((step) => {
    const promptAt = t;
    const typeAt = promptAt + 350;
    const outAt = typeAt + step.cmd.length * CHAR_MS + 300;
    t = outAt + 650;
    return { ...step, promptAt, typeAt, outAt };
  });
}

function vars(v: Record<string, string | number>) {
  return v as CSSProperties;
}

function Prompt() {
  return (
    <span className="select-none">
      <span className="text-accent">dylan</span>
      <span className="text-faint">@</span>
      <span className="text-accent">bbd</span>
      <span className="text-faint">:</span>
      <span className="text-sky">~</span>
      <span className="text-faint">$</span>{" "}
    </span>
  );
}

function HeroTerminal() {
  const lines = timeline(script);
  const endAt = lines.at(-1)!.outAt + 600;

  return (
    <div className="relative">
      <div aria-hidden="true" className="glow absolute -inset-10 opacity-70" />
      <Window
        title="dylan@bbd: ~ (zsh)"
        className="relative"
        bodyClassName="px-5 py-5 font-mono text-[12.5px] leading-6 sm:px-6 sm:text-[13.5px] sm:leading-7"
      >
        <div role="img" aria-label="Terminal: Dylan builds marketing sites and offers care and maintenance. Sites are fast, found on Google, easy to update and yours to keep." >
          <div aria-hidden="true">
            {lines.map((line) => (
              <div key={line.cmd} className="mb-3 last:mb-0">
                <div className="term-reveal whitespace-nowrap" style={vars({ "--d": `${line.promptAt}ms` })}>
                  <Prompt />
                  <span
                    className="term-type text-fg"
                    style={vars({ "--n": line.cmd.length, "--d": `${line.typeAt}ms` })}
                  >
                    {line.cmd}
                  </span>
                </div>
                <div className="term-reveal text-muted" style={vars({ "--d": `${line.outAt}ms` })}>
                  {line.out}
                </div>
              </div>
            ))}
            <div className="term-reveal mt-3" style={vars({ "--d": `${endAt}ms` })}>
              <Prompt />
              <span className="animate-blink inline-block h-[1.1em] w-[0.6em] translate-y-[3px] bg-accent" />
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
