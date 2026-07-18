"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const fieldBase =
  "min-w-0 w-full bg-[color:var(--input-bg)] px-4 py-3 text-[color:var(--fg-soft)] outline-none placeholder:text-[color:var(--input-placeholder)] placeholder:opacity-90 transition-shadow focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--fg)_20%,transparent)]";

const inputUnderline = fieldBase;
const textareaUnderline = `${fieldBase} resize-none overflow-hidden`;
const MESSAGE_MAX = 500;
const MESSAGE_MAX_LINES = 8;
const FIELD_MAX_LINES = 3;

export function ContactForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const querySubject = searchParams.get("subject");

  const defaultSubject = useMemo(() => {
    if (querySubject?.trim()) return querySubject.trim();
    if (intent === "project-request") return "I love this project and want a similar project";
    return "";
  }, [intent, querySubject]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const fields = document.querySelectorAll<HTMLTextAreaElement>("[data-contact-autogrow]");
    const lineHeight = 28;
    fields.forEach((el) => {
      const maxLines = Number(el.dataset.maxLines ?? FIELD_MAX_LINES);
      const maxHeight = lineHeight * maxLines;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    });
  }, [email, message, name, subject]);

  useEffect(() => {
    setSubject(defaultSubject);
  }, [defaultSubject]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setErrorText("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: subject.trim() || "Message from portfolio contact form",
          message,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorText(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("ok");
      setName("");
      setEmail("");
      setSubject(defaultSubject);
      setMessage("");
      setShowSuccessDialog(true);
    } catch {
      setStatus("error");
      setErrorText("Network error - try again.");
    }
  }

  return (
    <div className="flex w-full flex-col">
      <Dialog
        open={showSuccessDialog}
        title="Message submitted"
        description="Your message was submitted successfully. Takem Jim will get back to you soon."
        onConfirm={() => setShowSuccessDialog(false)}
        onCancel={() => setShowSuccessDialog(false)}
      />
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-label)]">
            Name
          </span>
          <textarea
            required
            rows={1}
            data-contact-autogrow
            data-max-lines={FIELD_MAX_LINES}
            maxLength={60}
            className={inputUnderline}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-label)]">
            Email
          </span>
          <textarea
            required
            rows={1}
            data-contact-autogrow
            data-max-lines={FIELD_MAX_LINES}
            maxLength={100}
            className={inputUnderline}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-label)]">
            Subject
          </span>
          <textarea
            className={inputUnderline}
            rows={1}
            data-contact-autogrow
            data-max-lines={FIELD_MAX_LINES}
            maxLength={120}
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-label)]">
            Message
          </span>
          <textarea
            id="contact-message"
            required
            rows={1}
            data-contact-autogrow
            data-max-lines={MESSAGE_MAX_LINES}
            maxLength={MESSAGE_MAX}
            className={textareaUnderline}
            placeholder="Tell me about your timeline, scope, and what success looks like."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span className="text-[11px] text-[color:var(--muted-label)]">
            {message.length}/{MESSAGE_MAX} characters
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-[color:var(--accent)] px-6 py-3 font-[family-name:var(--font-body)] text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status === "error" ? <p className="text-sm text-red-600">{errorText}</p> : null}
        </div>
      </form>
    </div>
  );
}


