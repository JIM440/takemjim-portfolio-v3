"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  tone?: "default" | "danger";
  pending?: boolean;
};

export function Dialog({
  open,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
  onCancel,
  tone = "default",
  pending = false,
}: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (pending) {
          return;
        }
        onCancel();
      }
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onCancel, pending]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="w-full max-w-md rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      >
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-label)]">
          Notice
        </p>
        <h2 id="dialog-title" className="mt-4 text-3xl leading-tight text-[color:var(--fg-soft)]">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">{description}</p>
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          {cancelLabel ? (
            <button
              type="button"
              onClick={onCancel}
              disabled={pending}
              className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--fg)]"
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={`rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white disabled:cursor-wait disabled:opacity-70 ${
              tone === "danger" ? "bg-[#a12222]" : "bg-[color:var(--accent)]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
