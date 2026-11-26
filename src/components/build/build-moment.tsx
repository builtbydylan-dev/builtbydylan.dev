"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { BuildScene, BuildVariant } from "./build-scene";

type Props = {
  id: string;
  variant: BuildVariant;
  command: string;
  title: string;
  children: ReactNode;
  /** Image shown on the device's screen. */
  screen?: string;
  /** Shown instead of the 3D scene if WebGL isn't available. */
  fallback?: { src: string; alt: string; className?: string };
};

/**
 * A tall, pinned section: as you scroll through it, a 3D device builds itself
 * from blocks, opens and turns. three.js is only downloaded when the section
 * gets close to the viewport, and the loop only runs while it's on screen.
 */
export function BuildMoment({ id, variant, command, title, children, screen, fallback }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const box = canvas?.parentElement;
    if (!section || !canvas || !box) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: BuildScene | null = null;
    let disposed = false;
    let requested = false;
    let visible = false;

    const progress = () => {
      const r = section.getBoundingClientRect();
      return Math.min(1, Math.max(0, (window.innerHeight - r.top) / r.height));
    };
    const onScroll = () => scene?.setTarget(progress());
    const resize = () => {
      const b = box.getBoundingClientRect();
      scene?.resize(b.width, b.height);
    };

    const load = async () => {
      requested = true;
      try {
        const { createBuildScene } = await import("./build-scene");
        if (disposed) return;
        const css = getComputedStyle(document.documentElement);
        const font = (name: string, fallbackStack: string) => {
          const value = css.getPropertyValue(name).trim();
          return value ? `${value}, ${fallbackStack}` : fallbackStack;
        };
        scene = createBuildScene(canvas, variant, {
          screen,
          reducedMotion,
          fonts: {
            sans: font("--font-geist", "ui-sans-serif, system-ui, sans-serif"),
            mono: font("--font-jetbrains", "ui-monospace, Menlo, monospace"),
          },
        });
      } catch {
        scene = null;
      }
      if (disposed) {
        scene?.dispose();
        return;
      }
      if (!scene) {
        setFailed(true);
        return;
      }
      resize();
      scene.setTarget(progress(), true);
      scene.setActive(visible);
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !requested) void load();
      },
      { rootMargin: "100% 0px" },
    );
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      scene?.setActive(visible);
    });
    near.observe(section);
    onScreen.observe(section);
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      disposed = true;
      near.disconnect();
      onScreen.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      scene?.dispose();
    };
  }, [variant, screen]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative h-[180svh] border-t border-line/70 motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-16 motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute top-1/2 left-1/2 h-[720px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-70"
        />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-2 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <div>
            <p className="font-mono text-sm text-faint">
              <span className="text-accent">$</span> {command}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem] sm:leading-[1.1]"
            >
              {title}
            </h2>
            <div className="mt-4 max-w-md space-y-3 text-base leading-relaxed text-muted sm:text-lg">{children}</div>
          </div>

          <div className="relative h-[50svh] lg:h-[74svh]">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
            {failed && fallback ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className={`relative overflow-hidden rounded-xl border border-line-strong ${fallback.className ?? "aspect-[16/10] w-full"}`}>
                  <Image src={fallback.src} alt={fallback.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-top" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
