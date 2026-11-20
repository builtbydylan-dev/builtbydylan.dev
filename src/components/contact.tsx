import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section, Window } from "./ui";

const nextSteps = [
  { title: "I read your message", body: `And reply ${site.replyTime}, usually with a couple of questions.` },
  { title: "We have a quick call", body: "Free and no-pressure. We talk goals, scope and timing." },
  { title: "You get a fixed quote", body: "Clear scope and price in writing. You decide, no hard sell." },
];

export function Contact() {
  return (
    <Section
      id="contact"
      command="./start-project.sh"
      title={
        <>
          Have something that needs building?
        </>
      }
      intro="Tell me a little about your business and what you need. There's no commitment, just a conversation."
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h3 className="font-mono text-sm text-faint">
            <span className="text-accent">#</span> what happens next
          </h3>
          <ol className="mt-6 grid gap-6">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-fg">{step.title}</p>
                  <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Window title="new-inquiry.sh" className="relative" bodyClassName="p-5 sm:p-7">
          <ContactForm />
        </Window>
      </div>
    </Section>
  );
}
