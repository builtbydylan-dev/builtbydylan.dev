"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { sendInquiry } from "@/app/actions";
import { LIMITS, NEEDS, TIMELINES, type InquiryField, type InquiryState } from "@/lib/inquiry";
import { site } from "@/content/site";
import { ArrowRight, buttonClass } from "./ui";

const initialState: InquiryState = { status: "idle" };

const FIELD_ORDER: InquiryField[] = ["name", "email", "business", "need", "timeline", "message"];

const inputClass =
  "w-full rounded-lg border border-line-strong bg-bg/70 px-3.5 py-2.5 text-[15px] text-fg placeholder:text-faint outline-none transition-[border-color,box-shadow] duration-150 hover:border-faint/60 focus:border-accent focus:shadow-[0_0_0_3px_rgb(92_245_154_/_0.18)] aria-[invalid=true]:border-rose/80";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendInquiry, initialState);
  const startedRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  // Timestamp used by the server's "submitted too fast" bot check.
  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);

  // Move focus to the first field with a problem.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = FIELD_ORDER.find((f) => state.errors?.[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="font-mono text-sm leading-7">
        <p className="text-accent">✓ inquiry sent</p>
        <p className="mt-3 font-sans text-xl font-semibold text-fg">Thanks, that&apos;s landed in my inbox.</p>
        <p className="mt-2 font-sans text-base leading-relaxed text-muted">
          I&apos;ll get back to you at <span className="text-fg">{state.email}</span> {site.replyTime}. Talk soon!
        </p>
        <p className="mt-6 text-faint">
          <span className="text-accent">$</span> <span className="animate-blink">_</span>
        </p>
      </div>
    );
  }

  const errorProps = (field: InquiryField) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};

  // With JS, submit inside a transition so React doesn't auto-reset the form and wipe
  // what the visitor typed when there's an error. Without JS, `action` still works.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  };

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="grid gap-5">
      {state.status === "error" ? (
        <p role="alert" className="rounded-lg border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            defaultValue={values.name}
            placeholder="Jordan Smith"
            className={inputClass}
            {...errorProps("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            defaultValue={values.email}
            placeholder="jordan@company.com"
            className={inputClass}
            {...errorProps("email")}
          />
        </Field>
      </div>

      <Field id="business" label="Business or company" optional error={errors.business}>
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          maxLength={LIMITS.business}
          defaultValue={values.business}
          placeholder="Smith & Co. Bakery"
          className={inputClass}
          {...errorProps("business")}
        />
      </Field>

      <fieldset {...(errors.need ? { "aria-describedby": "need-error" } : {})}>
        <legend className="mb-2 text-sm font-medium text-fg">What do you need?</legend>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          {NEEDS.map((n, i) => (
            <label
              key={n.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line-strong bg-bg/70 px-3.5 py-2.5 text-[15px] text-muted transition-colors hover:border-faint/60 has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-fg has-[:focus-visible]:shadow-[0_0_0_3px_rgb(92_245_154_/_0.3)]"
            >
              <input
                type="radio"
                name="need"
                value={n.value}
                required={i === 0}
                defaultChecked={values.need === n.value}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="flex size-4 shrink-0 items-center justify-center rounded-full border border-faint peer-checked:border-accent peer-checked:[&>span]:scale-100"
              >
                <span className="size-2 scale-0 rounded-full bg-accent transition-transform" />
              </span>
              {n.label}
            </label>
          ))}
        </div>
        {errors.need ? <FieldError id="need-error">{errors.need}</FieldError> : null}
      </fieldset>

      <Field id="timeline" label="Timeline" optional error={errors.timeline}>
        <div className="relative">
          <select
            id="timeline"
            name="timeline"
            defaultValue={values.timeline ?? ""}
            className={`${inputClass} appearance-none pr-10`}
            {...errorProps("timeline")}
          >
            <option value="">Choose one…</option>
            {TIMELINES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-faint"
            fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Field>

      <Field id="message" label="Tell me about your project" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.message}
          defaultValue={values.message}
          placeholder="What does your business do, and what should the website help with?"
          className={`${inputClass} resize-y leading-relaxed`}
          {...errorProps("message")}
        />
      </Field>

      {/* Spam traps: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="started_at" defaultValue="" />

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:cursor-wait disabled:opacity-70")}>
          {pending ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry <ArrowRight />
            </>
          )}
        </button>
        <p className="font-mono text-xs text-faint">
          Reply {site.replyTime}. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-fg">
        {label}
        {optional ? <span className="font-mono text-xs font-normal text-faint">optional</span> : null}
      </label>
      {children}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 font-mono text-xs text-rose">
      ! {children}
    </p>
  );
}
