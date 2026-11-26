import type { ComponentProps, ReactNode, SVGProps } from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-[background-color,border-color,box-shadow,color,transform] duration-200 active:translate-y-px";

const buttonVariants = {
  primary:
    "bg-accent px-6 py-3 text-accent-ink shadow-[0_6px_20px_-8px_rgb(4_120_87_/_0.6)] hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface px-6 py-3 text-fg hover:border-fg/30 hover:bg-raised",
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

/* ---------- icons (24px stroke icons) ---------- */

function Icon({ children, className = "size-5", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon className="size-4" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon className="size-4" {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Icon>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <Icon className="size-4" strokeWidth={2.4} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);
export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const Browser = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </Icon>
);
export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);
export const CardIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M6 15.5c.6-1.2 1.5-1.8 2.5-1.8s1.9.6 2.5 1.8M14 10h4M14 13.5h3" />
  </Icon>
);
export const Palette = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3a9 9 0 100 18c1.1 0 1.6-.8 1.6-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 005-5C21 6.6 17 3 12 3z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" />
    <circle cx="10" cy="7" r="1" fill="currentColor" />
    <circle cx="15" cy="7" r="1" fill="currentColor" />
  </Icon>
);
export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </Icon>
);
export const Bolt = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />
  </Icon>
);
export const Chat = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2v9z" />
  </Icon>
);
export const Key = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2" />
  </Icon>
);
export const Handshake = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M16 11.5l1.5 1.5 3-3" />
  </Icon>
);

/** The Built by Dylan mark: four blocks, one in green. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="#16181d" />
      <rect x="8" y="8" width="7" height="7" rx="1.8" fill="#ffffff" />
      <rect x="17" y="8" width="7" height="7" rx="1.8" fill="#34d399" />
      <rect x="8" y="17" width="7" height="7" rx="1.8" fill="#ffffff" />
      <rect x="17" y="17" width="7" height="7" rx="1.8" fill="#ffffff" />
    </svg>
  );
}

/** A light browser frame for showing website screenshots. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-24px_rgb(22_24_29_/_0.35)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-raised/80 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </div>
        {url ? (
          <p className="mx-auto truncate rounded-md bg-surface px-3 py-0.5 text-[10px] text-faint sm:text-[11px]">{url}</p>
        ) : null}
        <span className="w-7" aria-hidden="true" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** A page section with a small green eyebrow label above the heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "plain",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "plain" | "raised";
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tone === "raised" ? "border-y border-line bg-surface" : undefined}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
        <h2
          id={`${id}-title`}
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem] sm:leading-[1.1]"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
