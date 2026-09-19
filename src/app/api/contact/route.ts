import { NextResponse } from "next/server";

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

    // Log the message (visible in Vercel function logs)
    console.log("[CONTACT FORM]", {
      name,
      email,
      subject,
      message: message.slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks for reaching out! I'll get back to you soon.",
    });
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
