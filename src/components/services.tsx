import type { ComponentType, SVGProps } from "react";
import { extras, services } from "@/content/services";
import { ArrowRight, Browser, CardIcon, Check, Mail, Palette, Section, Shield } from "./ui";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "marketing-sites": Browser,
  "care-and-maintenance": Shield,
  "business-cards": CardIcon,
  branding: Palette,
  "email-automations": Mail,
};

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I can build for you"
      intro="Websites that bring people through your door, the care that keeps them working, and a few extras to round out your brand."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => {
          const Icon = icons[service.id] ?? Browser;
          return (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgb(22_24_29_/_0.04)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-6" />
                </span>
                <span className="rounded-full bg-raised px-3 py-1 text-sm font-semibold text-fg">{capitalize(service.price)}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{service.summary}</p>

              <ul className="mt-7 grid gap-x-6 gap-y-3 text-[15px] text-fg sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-8 text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-fg">Great for: </span>
                {service.goodFit}
              </p>
            </article>
          );
        })}
      </div>

      <h3 className="mt-16 text-xl font-semibold tracking-[-0.01em]">Also available</h3>
      <ul className="mt-5 grid gap-5 md:grid-cols-3">
        {extras.map((extra) => {
          const Icon = icons[extra.id] ?? Browser;
          return (
            <li key={extra.id} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-medium text-muted">{capitalize(extra.price)}</span>
              </div>
              <p className="mt-4 text-lg font-semibold tracking-[-0.01em]">{extra.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{extra.summary}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-muted">
        Prices are starting points.{" "}
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          Tell me what you need and I&apos;ll send a quote <ArrowRight className="size-4" />
        </a>
      </p>
    </Section>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
