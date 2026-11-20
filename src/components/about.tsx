import { principles } from "@/content/process";
import { Section, Window } from "./ui";

const toolbox = {
  build: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  ship: ["Vercel", "Analytics", "Search Console"],
};

export function About() {
  return (
    <Section id="about" command="cat about.md" title="Hey, I'm Dylan.">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a web developer who builds websites for small businesses and startups. I care
            about the details most people never notice:{" "}
            <span className="text-fg">
              how fast a page loads on a phone with one bar of signal, whether a button makes sense,
              whether your customers can actually find you.
            </span>
          </p>
          <p>
            You get a site that looks sharp, works properly and is built to last, from someone who
            picks up the phone and explains things in plain English.
          </p>

          <Window title="toolbox.json" className="mt-8 !shadow-none" bodyClassName="p-5 font-mono text-[13px] leading-6">
            <pre className="overflow-x-auto">
              <code>
                <span className="text-faint">{"{"}</span>
                {"\n"}
                {Object.entries(toolbox).map(([key, items], i, all) => (
                  <span key={key}>
                    {"  "}
                    <span className="text-sky">&quot;{key}&quot;</span>
                    <span className="text-faint">: [</span>
                    {"\n"}
                    {items.map((item, j) => (
                      <span key={item}>
                        {"    "}
                        <span className="text-amber">&quot;{item}&quot;</span>
                        {j < items.length - 1 ? <span className="text-faint">,</span> : null}
                        {"\n"}
                      </span>
                    ))}
                    {"  "}
                    <span className="text-faint">]{i < all.length - 1 ? "," : ""}</span>
                    {"\n"}
                  </span>
                ))}
                <span className="text-faint">{"}"}</span>
              </code>
            </pre>
          </Window>
        </div>

        <div>
          <h3 className="font-mono text-sm text-faint">
            <span className="text-accent">#</span> why work with me
          </h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-surface p-6">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h4 className="mt-2 text-lg font-semibold tracking-[-0.01em]">{p.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
