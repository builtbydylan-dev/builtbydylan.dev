import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section } from "./ui";

const nextSteps = [
  { title: "I read your message", body: `And reply ${site.replyTime}, usually with a couple of questions.` },
  { title: "We have a quick call", body: "Free and no-pressure. We talk goals, timing and what you need." },
  { title: "You get a clear quote", body: "Scope and price in writing. You decide, no hard sell." },
];

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Have something that needs building?"
      intro="Tell me a little about your business or ministry and what you need. There's no commitment, just a conversation."
      tone="raised"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.01em]">What happens next</h3>
          <ol className="mt-6 grid gap-6">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-fg">{step.title}</p>
                  <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-line bg-bg p-6 shadow-[0_24px_60px_-32px_rgb(22_24_29_/_0.35)] sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
