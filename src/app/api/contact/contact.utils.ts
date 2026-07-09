const DEFAULT_CONTACT_TO_EMAIL = 'help@zinns.io';
const RESEND_EMAIL_URL = 'https://api.resend.com/emails';

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  locale: string;
};

export type ContactEmailConfig = {
  toEmail: string;
  fromEmail: string;
  resendApiKey: string;
};

type ContactEmailEnvironment = {
  [key: string]: string | undefined;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getContactEmailConfig(
  environment: ContactEmailEnvironment = process.env,
): ContactEmailConfig {
  return {
    toEmail: environment.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT_TO_EMAIL,
    fromEmail: environment.CONTACT_FROM_EMAIL ?? '',
    resendApiKey: environment.RESEND_API_KEY ?? '',
  };
}

export function isContactEmailConfigured(config: ContactEmailConfig) {
  return Boolean(config.resendApiKey && config.fromEmail);
}

export function normalizeContactPayload(payload: ContactPayload): ContactMessage {
  return {
    name: getString(payload.name),
    email: getString(payload.email),
    message: getString(payload.message),
    locale: getString(payload.locale) || 'en',
  };
}

export function isValidContactMessage(contactMessage: ContactMessage) {
  return (
    contactMessage.name.length >= 2 &&
    isValidEmail(contactMessage.email) &&
    contactMessage.message.length >= 10
  );
}

export function createResendEmailRequest(
  contactMessage: ContactMessage,
  config: ContactEmailConfig,
): [string, RequestInit] {
  return [
    RESEND_EMAIL_URL,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: config.toEmail,
        reply_to: contactMessage.email,
        subject: `New Zinns contact request from ${contactMessage.name}`,
        text: [
          `Name: ${contactMessage.name}`,
          `Email: ${contactMessage.email}`,
          `Locale: ${contactMessage.locale}`,
          '',
          'Message:',
          contactMessage.message,
        ].join('\n'),
      }),
    },
  ];
}
