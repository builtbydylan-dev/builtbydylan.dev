import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { ArrowUpRight, Section } from "./ui";

export function Work() {
  const hasProjects = projects.length > 0;

  return (
    <Section
      id="work"
      command="ls work/"
      title="Selected work"
      intro={
        hasProjects
          ? "Real sites and apps, live right now, for the people and ministries who run them."
          : "Case studies are being written up. In the meantime, I'm happy to walk you through recent work on a call."
      }
    >
      {hasProjects ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {[38, 64, 21].map((pct, i) => (
            <PlaceholderCard key={i} index={i + 1} pct={pct} />
          ))}
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  const host = project.url ? new URL(project.url).host.replace(/^www\./, "") : null;

  const body = (
    <>
      <div
        className={`relative overflow-hidden bg-raised ${
          featured ? "aspect-[16/10] border-b border-line md:aspect-auto md:min-h-[380px] md:border-r md:border-b-0" : "aspect-[16/10] border-b border-line"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of the ${project.name} website`}
            fill
            sizes={featured ? "(min-width: 1152px) 640px, (min-width: 768px) 55vw, 100vw" : "(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-sm text-faint">
            {project.name.toLowerCase().replace(/\s+/g, "-")}
          </div>
        )}
      </div>

      <div className={featured ? "flex flex-col p-5 sm:p-7 md:py-8" : "p-5 sm:p-6"}>
        <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-faint">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className={`mt-2 font-semibold tracking-[-0.02em] ${featured ? "text-2xl" : "text-xl"}`}>{project.name}</h3>
        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
        {project.results?.length ? (
          <ul className="mt-4 grid gap-1.5 font-mono text-[13px]">
            {project.results.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-line-strong px-2 py-0.5 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
        {host ? (
          <p className={`flex items-center gap-1.5 font-mono text-[13px] text-fg transition-colors group-hover:text-accent ${featured ? "mt-auto pt-6" : "mt-5"}`}>
            {host} <ArrowUpRight />
          </p>
        ) : null}
      </div>
    </>
  );

  const className = `group overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong ${
    featured ? "md:grid md:grid-cols-[1.25fr_1fr]" : "block"
  }`;

  return (
    <article className={featured ? "md:col-span-2" : undefined}>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noreferrer" className={className} aria-label={`${project.name}: visit the live site`}>
          {body}
        </a>
      ) : (
        <div className={className}>{body}</div>
      )}
    </article>
  );
}

function PlaceholderCard({ index, pct }: { index: number; pct: number }) {
  const filled = Math.round(pct / 10);
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface ${index === 3 ? "hidden md:block" : ""}`}
      aria-hidden="true"
    >
      <div className="flex aspect-[16/10] flex-col justify-between border-b border-line bg-raised/50 p-5">
        <div className="flex gap-2">
          <span className="shimmer h-2 w-10 rounded" />
          <span className="shimmer h-2 w-6 rounded" />
          <span className="shimmer ml-auto h-2 w-14 rounded" />
        </div>
        <div className="grid gap-2.5">
          <span className="shimmer h-4 w-3/4 rounded" />
          <span className="shimmer h-4 w-1/2 rounded" />
          <span className="shimmer mt-2 h-7 w-24 rounded-md" />
        </div>
      </div>
      <div className="p-5 font-mono text-xs">
        <p className="text-muted">
          loading case-study-0{index}
          <span className="animate-blink">…</span>
        </p>
        <p className="mt-2 text-faint">
          <span className="text-accent">{"█".repeat(filled)}</span>
          {"░".repeat(10 - filled)} {pct}%
        </p>
      </div>
    </div>
  );
}
