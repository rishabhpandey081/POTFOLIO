import { NextResponse } from "next/server";

const WEB3FORMS_ACCESS_KEY = "ec68bf75-a400-4b6a-a13e-edd92411f6a2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim() || "Portfolio inquiry";
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length < 5) {
      return NextResponse.json(
        { ok: false, error: "Message should be at least 5 characters." },
        { status: 400 }
      );
    }

    // Send via Web3Forms — delivers directly to pandeyrishabh889@gmail.com
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name,
        email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        message,
        from_name: "Rishabh Pandey Portfolio",
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return NextResponse.json({
        ok: true,
        message: "Message sent! I'll get back to you soon.",
      });
    } else {
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, count: 0 });
}
