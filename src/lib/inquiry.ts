export const NEEDS = [
  { value: "new-site", label: "A new website" },
  { value: "existing-site", label: "Help with my current site" },
  { value: "care", label: "Care & maintenance" },
  { value: "business-card", label: "Digital business card" },
  { value: "branding", label: "Logo & branding" },
  { value: "not-sure", label: "Something else / not sure" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In the next 1–3 months" },
  { value: "later", label: "3+ months out" },
  { value: "exploring", label: "Just exploring" },
] as const;

export type Inquiry = {
  name: string;
  email: string;
  business: string;
  need: string;
  timeline: string;
  message: string;
};

export type InquiryField = keyof Inquiry;

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | {
      status: "error";
      message: string;
      errors?: Partial<Record<InquiryField, string>>;
      values?: Partial<Inquiry>;
    };

export const LIMITS = {
  name: 100,
  email: 200,
  business: 120,
  message: 5000,
  messageMin: 10,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Collapse whitespace so single-line fields can't smuggle line breaks into email headers. */
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

export function parseInquiry(formData: FormData): Inquiry {
  const get = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: oneLine(get("name")),
    email: oneLine(get("email")).toLowerCase(),
    business: oneLine(get("business")),
    need: oneLine(get("need")),
    timeline: oneLine(get("timeline")),
    message: get("message").trim(),
  };
}

export function validateInquiry(i: Inquiry) {
  const errors: Partial<Record<InquiryField, string>> = {};

  if (!i.name) errors.name = "Please tell me your name.";
  else if (i.name.length > LIMITS.name) errors.name = "That name is a bit long.";

  if (!i.email) errors.email = "I'll need an email to reply to.";
  else if (i.email.length > LIMITS.email || !EMAIL_RE.test(i.email))
    errors.email = "That email doesn't look quite right.";

  if (i.business.length > LIMITS.business) errors.business = "Please shorten this a little.";

  if (!NEEDS.some((n) => n.value === i.need)) errors.need = "Pick the option that fits best.";

  if (i.timeline && !TIMELINES.some((t) => t.value === i.timeline))
    errors.timeline = "Pick one of the options.";

  if (i.message.length < LIMITS.messageMin)
    errors.message = "A sentence or two about your project helps me reply properly.";
  else if (i.message.length > LIMITS.message)
    errors.message = `Please keep it under ${LIMITS.message.toLocaleString("en-US")} characters.`;

  return errors;
}

export const labelFor = (
  list: readonly { value: string; label: string }[],
  value: string,
  fallback = "Not specified",
) => list.find((o) => o.value === value)?.label ?? fallback;
