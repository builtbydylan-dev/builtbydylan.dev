import { testimonials } from "@/content/testimonials";
import { Section } from "./ui";

/** Renders nothing until src/content/testimonials.ts has entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" eyebrow="Kind words" title="What people say">
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name + t.quote.slice(0, 20)} className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <figure>
              <span aria-hidden="true" className="block text-5xl leading-none font-semibold text-accent-bright">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg leading-relaxed text-fg">{t.quote}</blockquote>
              <figcaption className="mt-5 text-[15px] text-muted">
                <span className="font-semibold text-fg">{t.name}</span>, {t.role}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
