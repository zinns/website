import { describe, expect, it } from 'vitest';

import {
  createResendEmailRequest,
  getContactEmailConfig,
  isContactEmailConfigured,
  isValidContactMessage,
  normalizeContactPayload,
} from './contact.utils';

describe('contact utilities', () => {
  it('normalizes contact payloads', () => {
    expect(
      normalizeContactPayload({
        name: ' Ada ',
        email: ' ada@example.com ',
        message: ' Build this tool. ',
        locale: '',
      }),
    ).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Build this tool.',
      locale: 'en',
    });
  });

  it('validates required contact message fields', () => {
    expect(
      isValidContactMessage({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Build this tool.',
        locale: 'en',
      }),
    ).toBe(true);

    expect(
      isValidContactMessage({
        name: 'A',
        email: 'ada',
        message: 'short',
        locale: 'en',
      }),
    ).toBe(false);
  });

  it('reads contact email config from environment input', () => {
    const config = getContactEmailConfig({
      CONTACT_FROM_EMAIL: 'Zinns Website <website@zinns.io>',
      RESEND_API_KEY: 'resend-key',
    });

    expect(config).toEqual({
      toEmail: 'help@zinns.io',
      fromEmail: 'Zinns Website <website@zinns.io>',
      resendApiKey: 'resend-key',
    });
    expect(isContactEmailConfigured(config)).toBe(true);
  });

  it('builds Resend email requests', () => {
    const [url, request] = createResendEmailRequest(
      {
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Build this tool.',
        locale: 'es',
      },
      {
        toEmail: 'help@zinns.io',
        fromEmail: 'Zinns Website <website@zinns.io>',
        resendApiKey: 'resend-key',
      },
    );

    expect(url).toBe('https://api.resend.com/emails');
    expect(request.method).toBe('POST');
    expect(request.headers).toEqual({
      Authorization: 'Bearer resend-key',
      'Content-Type': 'application/json',
    });
    expect(JSON.parse(request.body as string)).toMatchObject({
      from: 'Zinns Website <website@zinns.io>',
      to: 'help@zinns.io',
      reply_to: 'ada@example.com',
      subject: 'New Zinns contact request from Ada',
    });
  });
});
