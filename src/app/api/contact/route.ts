import { NextResponse } from 'next/server';
import {
  type ContactPayload,
  createResendEmailRequest,
  getContactEmailConfig,
  isContactEmailConfigured,
  isValidContactMessage,
  normalizeContactPayload,
} from './contact.utils';

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  const contactMessage = normalizeContactPayload(payload);

  if (!isValidContactMessage(contactMessage)) {
    return NextResponse.json({ message: 'Invalid contact form data.' }, { status: 400 });
  }

  const contactEmailConfig = getContactEmailConfig();

  if (!isContactEmailConfigured(contactEmailConfig)) {
    return NextResponse.json(
      { message: 'Contact email service is not configured.' },
      { status: 503 },
    );
  }

  const response = await fetch(...createResendEmailRequest(contactMessage, contactEmailConfig));

  if (!response.ok) {
    return NextResponse.json({ message: 'Email delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ message: 'Message sent.' });
}
