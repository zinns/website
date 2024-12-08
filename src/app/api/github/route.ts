import * as crypto from 'crypto';
import { onIssue, onStar } from '@/helpers/githubEvents';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

const GITHUB_SECRET = process.env.GITHUB_SECRET ?? '';

const notify = async (message: string) => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL ?? '';

  const body = {
    content: message,
  };

  const response = await fetch(discordWebhookUrl, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    console.log('Error sending message');
    return false;
  }

  return true;
};

const verifySignature = async (req: Request) => {
  try {
    const { body } = req;
    const signature = crypto
      .createHmac('sha256', GITHUB_SECRET)
      .update(JSON.stringify(body))
      .digest('hex');
    const xHubSignature = req.headers.get('x-hub-signature-256') ?? '';

    const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    const untrusted = Buffer.from(xHubSignature, 'ascii');

    return {
      ok: crypto.timingSafeEqual(trusted, untrusted),
    };
  } catch (error) {
    console.log({ error });

    return {
      error,
      ok: false,
    };
  }
};

const handler = async (req: Request) => {
  try {
    const body = await req.json();

    const githubEvent = req.headers.get('x-github-event') ?? 'unknown';

    console.log(req.headers);

    const isGithubReq = await verifySignature(req);

    if (!isGithubReq.ok) {
      return NextResponse.json(
        { error: isGithubReq.error, message: 'Unauthorized' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 401,
        },
      );
    }

    let message: string;

    switch (githubEvent) {
      case 'star':
        message = onStar(body);
        break;
      case 'issue':
        message = onIssue(body);
        break;
      default:
        message = `Unknown event ${githubEvent}`;
    }

    await notify(message);

    return NextResponse.json(
      {
        message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error, message: 'Internal Server Error' },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    );
  }
};

export function POST(request: Request) {
  return handler(request);
}
