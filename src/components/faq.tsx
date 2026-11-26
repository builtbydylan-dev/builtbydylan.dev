import { faq } from "@/content/faq";
import { Plus, Section } from "./ui";

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered">
      <div className="max-w-3xl divide-y divide-line rounded-2xl border border-line bg-surface px-6 sm:px-8">
        {faq.map((item) => (
          <details key={item.q} className="faq-item group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-accent">
              {item.q}
              <Plus className="faq-marker size-5 shrink-0 text-muted transition-transform duration-200 group-hover:text-accent" />
            </summary>
            <p className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
