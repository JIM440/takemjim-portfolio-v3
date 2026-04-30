import { NextResponse, NextRequest } from "next/server";
import { messageStore } from "@/lib/data-store";
import { profile } from "@/lib/site-data";

type EmailDeliveryStatus = "skipped" | "sent" | "failed";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendContactNotification({
  notifyTo,
  resendKey,
  name,
  email,
  subject,
  message,
}: {
  notifyTo: string;
  resendKey?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<EmailDeliveryStatus> {
  if (!resendKey || !notifyTo) {
    return "skipped";
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [notifyTo],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend API error", res.status, errText);
      return "failed";
    }

    return "sent";
  } catch (e) {
    console.error("Resend request failed", e);
    return "failed";
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const name = String(o.name ?? "").trim();
  const email = String(o.email ?? "").trim();
  const message = String(o.message ?? "").trim();
  const subject = String(o.subject ?? "Message from portfolio contact form")
    .trim()
    .slice(0, 220);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const savedMessage = messageStore.create({ name, email, subject, body: message });

  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL ?? profile.email;
  const resendKey = process.env.RESEND_API_KEY;
  const emailDelivery = await sendContactNotification({
    notifyTo,
    resendKey,
    name,
    email,
    subject,
    message,
  });

  return NextResponse.json({ ok: true, messageId: savedMessage.id, emailDelivery });
}
