import type { Metadata } from "next";
import { ArrowRight, ButtonLink, Window } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-20">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-xl">
        <Window title="dylan@bbd: ~ (zsh)" bodyClassName="p-6 font-mono text-sm leading-7 sm:p-8">
          <p>
            <span className="text-accent">dylan@bbd</span>
            <span className="text-faint">:</span>
            <span className="text-sky">~</span>
            <span className="text-faint">$</span> cd this-page
          </p>
          <p className="text-rose">zsh: no such file or directory: this-page</p>
          <h1 className="mt-6 font-sans text-3xl font-semibold tracking-[-0.03em]">404: page not found</h1>
          <p className="mt-2 font-sans text-base text-muted">
            The page you&apos;re after doesn&apos;t exist, or it moved.
          </p>
          <ButtonLink href="/" className="mt-7">
            Back to home <ArrowRight />
          </ButtonLink>
        </Window>
      </div>
    </main>
  );
}
