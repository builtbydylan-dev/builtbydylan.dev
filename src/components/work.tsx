import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { ArrowUpRight, BrowserFrame, Check, Section } from "./ui";

export function Work() {
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      eyebrow="Recent work"
      title="Real sites, live right now"
      intro="A few things I've built for the people and ministries who run them."
      tone="raised"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  const host = project.url ? new URL(project.url).host.replace(/^www\./, "") : undefined;

  return (
    <article className={featured ? "md:col-span-2 md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-10" : ""}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="group block transition-transform duration-300 hover:-translate-y-1"
        aria-label={`${project.name}: visit the live site`}
      >
        <BrowserFrame url={host}>
          <div className="relative aspect-[16/10] bg-raised">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.name} website`}
                fill
                sizes={featured ? "(min-width: 1152px) 620px, (min-width: 768px) 55vw, 100vw" : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"}
                className="object-cover object-top"
              />
            ) : null}
          </div>
        </BrowserFrame>
      </a>

      <div className={featured ? "mt-6 md:mt-0" : "mt-6"}>
        <p className="text-sm font-medium text-muted">
          {project.client} · {project.year}
        </p>
        <h3 className={`mt-1.5 font-semibold tracking-[-0.02em] ${featured ? "text-3xl" : "text-2xl"}`}>{project.name}</h3>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">{project.summary}</p>
        {project.results?.length ? (
          <ul className="mt-4 grid gap-2 text-[15px] text-fg">
            {project.results.map((r) => (
              <li key={r} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {r}
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-raised px-3 py-1 text-sm text-muted">
              {tag}
            </li>
          ))}
        </ul>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Visit {host} <ArrowUpRight />
          </a>
        ) : null}
      </div>
    </article>
  );
}
