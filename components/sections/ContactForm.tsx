"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-fill)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-[border-color,background-color] duration-300 placeholder:text-[var(--fg-faint)] hover:border-[var(--border-strong)] focus:border-[var(--border-strong)] focus:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

const labelClass =
  "block text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]";

/**
 * Get in touch — posts to /api/contact, which relays through Resend. If the
 * server reports no API key configured, the message is handed to the visitor's
 * mail client instead so it is never silently dropped.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  function openMailClient(data: Record<string, FormDataEntryValue>) {
    const body = `${data.message ?? ""}\n\n— ${data.name ?? ""} (${data.email ?? ""})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Portfolio enquiry from ${data.name || "a visitor"}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill hidden fields, humans never see them.
    if (data.botcheck) return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("sent");
        form.reset();
        return;
      }

      if (result.error === "not_configured") {
        openMailClient(data);
        setStatus("sent");
        form.reset();
        return;
      }

      setStatus("error");
      setError(
        typeof result.error === "string" && result.error !== "Sending failed."
          ? result.error
          : "That didn't send. Try again, or email me directly.",
      );
    } catch {
      setStatus("error");
      setError(
        "That didn't send — check your connection, or email me directly.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Jane Doe"
            className={`mt-2.5 ${fieldClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@company.com"
            className={`mt-2.5 ${fieldClass}`}
          />
        </div>
      </div>

      <div className="mt-5 md:mt-6">
        <label htmlFor="cf-message" className={labelClass}>
          What are you working on?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="A line or two about the role or the project."
          className={`mt-2.5 resize-y ${fieldClass}`}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-7">
        <button
          type="submit"
          disabled={status === "sending"}
          className="accent-button inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold tracking-wide transition-[box-shadow,opacity] duration-300 hover:shadow-[var(--accent-shadow-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="text-sm text-[var(--fg)]"
            >
              Thanks — that reached me. I&rsquo;ll reply soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="max-w-sm text-sm text-[var(--fg-muted)]"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
