import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { principles } from "@/content/process";
import { site } from "@/content/site";
import { Bolt, Chat, Handshake, Key, Section } from "./ui";

/** Tools you actually use. */
const tools = ["Next.js", "React", "Firebase", "Vercel", "Cloudflare", "Canva"];

const principleIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [Handshake, Bolt, Chat, Key];

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="Hey, I'm Dylan." tone="raised">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
        <div>
          <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl border border-line shadow-[0_24px_60px_-28px_rgb(22_24_29_/_0.45)] lg:mx-0">
            <Image
              src={site.photo}
              alt="Dylan Hovanec, smiling, in front of a wooden wall"
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
          <p className="mt-6 text-sm font-semibold text-fg">Tools I use</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li key={t} className="rounded-full border border-line bg-bg px-3 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m <span className="font-semibold text-fg">Dylan Hovanec</span>, a web developer from{" "}
              {site.location} and a student at Johnson University, where I study youth ministry and
              preaching.
            </p>
            <p>
              I build websites for small businesses, churches and ministries, and startups. I care
              about the details most people never notice: how fast a page loads on a phone with one
              bar of signal, whether a button makes sense, whether your customers can actually find
              you.
            </p>
            <p>
              I also founded <span className="font-semibold text-fg">Ministry Roots</span> and built its
              website and the Roots app for iPhone, Android and the web. Running my own product means I
              know what it takes to keep a site working long after launch day.
            </p>
          </div>

          <h3 className="mt-12 text-xl font-semibold tracking-[-0.01em]">Why work with me</h3>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = principleIcons[i] ?? Handshake;
              return (
                <li key={p.title} className="rounded-2xl border border-line bg-bg p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h4 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{p.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
