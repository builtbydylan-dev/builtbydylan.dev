import { faq } from "@/content/faq";
import { Section } from "./ui";

export function Faq() {
  return (
    <Section id="faq" command="man faq" title="Questions, answered">
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {faq.map((item) => (
          <details key={item.q} className="faq-item group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium transition-colors hover:text-accent">
              {item.q}
              <span
                aria-hidden="true"
                className="faq-marker font-mono text-xl text-faint transition-transform duration-200 group-hover:text-accent"
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
