"use server";

import { sendInquiryEmail } from "@/lib/email";
import { parseInquiry, validateInquiry, type InquiryState } from "@/lib/inquiry";

/** Submissions faster than this after the form loaded are almost certainly bots. */
const MIN_FILL_MS = 2500;

export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const inquiry = parseInquiry(formData);

  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "A couple of things need fixing before this can send.",
      errors,
      values: inquiry,
    };
  }

  // Spam traps: a hidden field humans never fill, and an impossibly fast submit.
  // Bots get a normal-looking success so they don't retry.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("started_at"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    return { status: "success", email: inquiry.email };
  }

  try {
    await sendInquiryEmail(inquiry);
  } catch (err) {
    console.error("[contact] Failed to send inquiry", err);
    return {
      status: "error",
      message: "Sorry, your message didn't go through. Please try again in a minute.",
      values: inquiry,
    };
  }

  return { status: "success", email: inquiry.email };
}
