import { extras, services } from "@/content/services";
import { ArrowRight, Section } from "./ui";

export function Services() {
  return (
    <Section
      id="services"
      command="ls services/"
      title="What I build"
      intro="Websites that bring people through your door, the care that keeps them working, and a few extras to round out your brand."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong"
          >
            <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 font-mono text-xs sm:px-7">
              <span className="text-sky">{service.id}/</span>
              <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">
                {service.price}
              </span>
            </header>

            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>

              <ul className="mt-7 grid gap-x-6 gap-y-3 font-mono text-[13px] text-fg/90 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-accent" aria-hidden="true">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="rounded-lg border border-dashed border-line-strong bg-bg/40 px-4 py-3.5 text-sm leading-relaxed text-muted">
                  <span className="mb-1 block font-mono text-xs text-amber"># good fit if</span>
                  {service.goodFit}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-14 font-mono text-sm text-faint">
        <span className="text-accent">#</span> also available
      </h3>
      <ul className="mt-5 grid gap-5 md:grid-cols-3">
        {extras.map((extra) => (
          <li
            key={extra.id}
            className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong sm:p-6"
          >
            <div className="flex items-baseline justify-between gap-3 font-mono text-xs">
              <span className="text-sky">{extra.id}/</span>
              <span className={extra.price.startsWith("from") ? "text-accent" : "text-faint"}>{extra.price}</span>
            </div>
            <p className="mt-3 text-lg font-semibold tracking-[-0.01em]">{extra.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{extra.summary}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-muted">
        Prices are starting points. Not sure what you need?{" "}
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 font-medium text-fg underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
        >
          Tell me about your project <ArrowRight className="size-3.5" />
        </a>
      </p>
    </Section>
  );
}
