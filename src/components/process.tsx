import { process } from "@/content/process";
import { Section } from "./ui";

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      title="Four simple steps"
      intro="A clear, predictable process. You'll always know what's happening and what comes next."
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-ink">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2.5 text-[16px] leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
