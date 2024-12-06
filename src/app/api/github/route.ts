import * as crypto from 'crypto';
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log('Error sending message');
    return false;
  }

  return true;
};

const verify_signature = async (req: Request) => {
  try {
    const body = req.body;
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
      ok: false,
      error,
    };
  }
};

const onStar = (payload: Record<{action: any, issue: any}>): string => {
  const { action, sender, repository } = payload;

  return `User ${sender.login} ${action} star on ${repository.full_name}`;
};

const onIssue = (payload: Record<{action: any, issue: any}>): string => {
  const { action, issue } = payload;

  if (action === 'opened') {
    return `An issue was opened with this title ${issue.title}`;
  }

  if (action === 'closed') {
    return `An issue was closed by ${issue.user.login}`;
  }

  return `Unhandled action for the issue event ${action}`;
};

const handler = async (req:Request) => {
  try {
    const body = await req.json();

    const githubEvent = req.headers.get('x-github-event') ?? 'unknown';

    const isGithubReq = await verify_signature(req);

    if (!isGithubReq.ok) {
      return NextResponse.json({ message: 'Unauthorized', error: isGithubReq.error }, { status: 401, headers: {
          'Content-Type': 'application/json',
        } });
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

    return NextResponse.json({
      message
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.log(error)

    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500, headers: {
        'Content-Type': 'application/json',
      }});
  }
};

export function POST(request: Request) {
  return handler(request);
}
