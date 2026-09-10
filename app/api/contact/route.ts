import { site } from "@/content/site";

/**
 * Contact form endpoint. Posts the message through Resend's REST API — no SDK,
 * so there is nothing to keep up to date and no dependency to audit.
 *
 * Environment (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required. From resend.com/api-keys.
 *   CONTACT_TO       optional. Defaults to the address in content/site.ts.
 *   CONTACT_FROM     optional. Defaults to Resend's sandbox sender, which can
 *                    only deliver to the address the Resend account was
 *                    registered with. Set this once a domain is verified.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio contact <onboarding@resend.dev>";

const LIMITS = { name: 120, email: 200, message: 5000 };

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: "Malformed request." }, 400);
  }

  // Honeypot: a bot fills the hidden field, a person never sees it. Answer 200
  // so the bot has no signal that it was caught.
  if (asString(payload.botcheck, 10)) {
    return json({ success: true }, 200);
  }

  const name = asString(payload.name, LIMITS.name);
  const email = asString(payload.email, LIMITS.email);
  const message = asString(payload.message, LIMITS.message);

  if (!name || !email || !message) {
    return json(
      { success: false, error: "Name, email and message are all required." },
      400,
    );
  }
  if (!looksLikeEmail(email)) {
    return json({ success: false, error: "That email doesn't look right." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Distinct code so the form can fall back to a prefilled mailto rather
    // than telling the visitor something is broken.
    return json({ success: false, error: "not_configured" }, 503);
  }

  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || DEFAULT_FROM;

  const text = [
    `From: ${name} <${email}>`,
    "",
    message,
    "",
    "—",
    "Sent from the contact form on arslan-tabish.vercel.app",
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message", response.status, detail);
      return json({ success: false, error: "Sending failed." }, 502);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error("Could not reach Resend", error);
    return json({ success: false, error: "Sending failed." }, 502);
  }
}
