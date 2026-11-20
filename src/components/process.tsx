import { process } from "@/content/process";
import { Section } from "./ui";

export function Process() {
  return (
    <Section
      id="process"
      command="cat process.md"
      title="How a project works"
      intro="A simple, predictable process. You'll always know what's happening and what comes next."
    >
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {process.map((step, i) => (
          <li key={step.title} className="relative border-t border-line-strong pt-7">
            <span
              aria-hidden="true"
              className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-accent shadow-[0_0_0_4px_var(--color-bg),0_0_14px_2px_rgb(92_245_154_/_0.5)]"
            />
            <p className="font-mono text-xs text-faint">
              <span className="text-accent">step 0{i + 1}</span> / 0{process.length}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2.5 leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
