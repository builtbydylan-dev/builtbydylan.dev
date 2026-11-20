import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-mono text-sm font-medium transition-[background-color,border-color,box-shadow,color] duration-200";

const buttonVariants = {
  primary:
    "bg-accent px-5 py-3 text-accent-ink hover:bg-[#86ffb8] hover:shadow-[0_0_0_4px_rgb(92_245_154_/_0.16),0_8px_30px_-6px_rgb(92_245_154_/_0.45)]",
  secondary:
    "border border-line-strong bg-surface/70 px-5 py-3 text-fg hover:border-faint hover:bg-raised",
} as const;

export function buttonClass(variant: keyof typeof buttonVariants = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonVariants }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 11l6-6M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Terminal-style window chrome: traffic lights + a title. */
export function Window({
  title,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong/80 bg-surface shadow-[0_30px_80px_-30px_rgb(0_0_0_/_0.9)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-raised/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose/70" />
          <span className="size-2.5 rounded-full bg-amber/70" />
          <span className="size-2.5 rounded-full bg-accent/70" />
        </div>
        <p className="flex-1 truncate text-center font-mono text-xs text-faint">{title}</p>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** A page section with a shell-command eyebrow above the heading. */
export function Section({
  id,
  command,
  title,
  intro,
  children,
}: {
  id: string;
  command: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line/70">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-sm text-faint">
          <span className="text-accent">$</span> {command}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem] sm:leading-[1.1]"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
