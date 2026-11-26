"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { sendInquiry } from "@/app/actions";
import { LIMITS, NEEDS, TIMELINES, type InquiryField, type InquiryState } from "@/lib/inquiry";
import { site } from "@/content/site";
import { ArrowRight, buttonClass, Check } from "./ui";

const initialState: InquiryState = { status: "idle" };

const FIELD_ORDER: InquiryField[] = ["name", "email", "business", "need", "timeline", "message"];

const inputClass =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-[16px] text-fg placeholder:text-faint/80 outline-none transition-[border-color,box-shadow] duration-150 hover:border-fg/25 focus:border-accent focus:shadow-[0_0_0_4px_rgb(4_120_87_/_0.12)] aria-[invalid=true]:border-rose";

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
      <div role="status" className="py-6 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="size-7" />
        </span>
        <p className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Thanks, your message is on its way!</p>
        <p className="mx-auto mt-3 max-w-md text-[17px] leading-relaxed text-muted">
          I&apos;ll get back to you at <span className="font-semibold text-fg">{state.email}</span>{" "}
          {site.replyTime}. Talk soon!
        </p>
      </div>
    );
  }

  const errorProps = (field: InquiryField) =>
    errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};

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
        <p role="alert" className="rounded-xl border border-rose/30 bg-rose/5 px-4 py-3 text-[15px] text-rose">
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

      <Field id="business" label="Business, church or organization" optional error={errors.business}>
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
        <legend className="mb-2 text-[15px] font-semibold text-fg">What do you need?</legend>
        <div className="grid grid-cols-1 gap-2 min-[440px]:grid-cols-2">
          {NEEDS.map((n, i) => (
            <label
              key={n.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 text-[15px] text-fg transition-colors hover:border-fg/25 has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:focus-visible]:shadow-[0_0_0_4px_rgb(4_120_87_/_0.18)]"
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
                className="flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-line-strong peer-checked:border-accent peer-checked:[&>span]:scale-100"
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
            className={`${inputClass} appearance-none pr-11`}
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
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
            fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
          placeholder="What does your business or ministry do, and what should the website help with?"
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
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight />
            </>
          )}
        </button>
        <p className="text-sm text-muted">I reply {site.replyTime}. No spam, ever.</p>
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
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[15px] font-semibold text-fg">
        {label}
        {optional ? <span className="text-sm font-normal text-faint">Optional</span> : null}
      </label>
      {children}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-rose">
      {children}
    </p>
  );
}
