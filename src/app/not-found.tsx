import type { Metadata } from "next";
import { ArrowRight, ButtonLink, LogoMark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-20">
      <div aria-hidden="true" className="wash pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-lg rounded-3xl border border-line bg-surface p-8 text-center shadow-[0_24px_60px_-28px_rgb(22_24_29_/_0.35)] sm:p-10">
        <LogoMark className="mx-auto size-12" />
        <p className="mt-6 text-sm font-semibold tracking-wide text-accent uppercase">Error 404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">This page doesn&apos;t exist</h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          It may have moved, or the link might have a typo.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to the homepage <ArrowRight />
        </ButtonLink>
      </div>
    </main>
  );
}
