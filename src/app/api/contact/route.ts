import { NextResponse } from 'next/server';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'help@zinns.io';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  const name = getString(payload.name);
  const email = getString(payload.email);
  const message = getString(payload.message);
  const locale = getString(payload.locale) || 'en';

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json({ message: 'Invalid contact form data.' }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { message: 'Contact email service is not configured.' },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New Zinns contact request from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Locale: ${locale}`, '', 'Message:', message].join(
        '\n',
      ),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Email delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ message: 'Message sent.' });
}
