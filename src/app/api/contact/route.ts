import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim() || null;
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
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message should be at least 10 characters." },
        { status: 400 }
      );
    }

    const saved = await db.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({
      ok: true,
      id: saved.id,
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
  try {
    const count = await db.contactMessage.count();
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: true, count: 0 });
  }
}
