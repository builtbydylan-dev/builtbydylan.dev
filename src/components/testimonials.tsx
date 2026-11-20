import { testimonials } from "@/content/testimonials";
import { Section } from "./ui";

/** Renders nothing until src/content/testimonials.ts has entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" command="cat reviews.log" title="Kind words">
      <ul className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name + t.quote.slice(0, 20)} className="rounded-xl border border-line bg-surface p-6 sm:p-7">
            <figure>
              <blockquote className="text-lg leading-relaxed text-fg">
                <span className="font-mono text-accent" aria-hidden="true">
                  &gt;{" "}
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 font-mono text-[13px] text-muted">
                <span className="text-fg">{t.name}</span> <span className="text-faint">·</span> {t.role}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
