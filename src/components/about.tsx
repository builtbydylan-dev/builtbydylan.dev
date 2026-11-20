import Image from "next/image";
import { principles } from "@/content/process";
import { site } from "@/content/site";
import { Section, Window } from "./ui";

/** Tools you actually use. Shown as a little JSON file. */
const toolbox = {
  build: ["Next.js", "React", "Firebase"],
  ship: ["Vercel", "Cloudflare"],
  design: ["Canva"],
};

export function About() {
  return (
    <Section id="about" command="cat about.md" title="Hey, I'm Dylan.">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="space-y-6">
          <Window
            title="dylan-hovanec.jpg"
            className="mx-auto max-w-[320px] !shadow-none lg:mx-0"
            bodyClassName="relative aspect-square"
          >
            <Image
              src={site.photo}
              alt="Dylan Hovanec, smiling, in front of a wooden wall"
              fill
              sizes="320px"
              className="object-cover"
              priority={false}
            />
          </Window>

          <Window title="toolbox.json" className="mx-auto max-w-[320px] !shadow-none lg:mx-0" bodyClassName="p-5 font-mono text-[13px] leading-6">
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
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m <span className="text-fg">Dylan Hovanec</span>, a web developer from{" "}
              {site.location} and a student at Johnson University, where I study youth ministry and
              preaching.
            </p>
            <p>
              I build websites for small businesses, churches and ministries, and startups. I care
              about the details most people never notice:{" "}
              <span className="text-fg">
                how fast a page loads on a phone with one bar of signal, whether a button makes sense,
                whether your customers can actually find you.
              </span>
            </p>
            <p>
              I also founded <span className="text-fg">Ministry Roots</span> and built its website and
              the Roots app for iPhone, Android and the web. Running my own product means I know what
              it takes to keep a site working long after launch day.
            </p>
          </div>

          <h3 className="mt-12 font-mono text-sm text-faint">
            <span className="text-accent">#</span> why work with me
          </h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
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
