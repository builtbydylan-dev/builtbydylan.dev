import { NEEDS, TIMELINES, labelFor, type Inquiry } from "./inquiry";

/**
 * Sends a new project inquiry to your inbox through Resend (https://resend.com).
 *
 * Env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      API key from the Resend dashboard
 *   CONTACT_TO_EMAIL    where inquiries should land
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend
 *                       (default: "Built by Dylan <inquiries@builtbydylan.dev>")
 *
 * Without RESEND_API_KEY in development, inquiries are logged to the terminal instead.
 */
export async function sendInquiryEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Built by Dylan <inquiries@builtbydylan.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("\n[contact] Email isn't configured, so here's the inquiry:\n" + formatText(inquiry));
      return;
    }
    throw new Error("Contact form email is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
  }

  const subject = `New inquiry: ${inquiry.name}${inquiry.business ? ` (${inquiry.business})` : ""}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: inquiry.email,
      subject: subject.slice(0, 200),
      text: formatText(inquiry),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 500)}`);
  }
}

function formatText(i: Inquiry) {
  return [
    `Name:      ${i.name}`,
    `Email:     ${i.email}`,
    `Business:  ${i.business || "Not specified"}`,
    `Needs:     ${labelFor(NEEDS, i.need)}`,
    `Timeline:  ${labelFor(TIMELINES, i.timeline)}`,
    "",
    i.message,
    "",
    "—",
    "Sent from the contact form on builtbydylan.dev. Reply to this email to answer directly.",
  ].join("\n");
}
