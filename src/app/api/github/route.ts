import { notify, verifySignature, onIssue, onStar, onDeployment, onPR } from '@/helpers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

const handler = async (req: Request) => {
  try {
    const body = await req.json();

    const githubEvent = req.headers.get('x-github-event') ?? 'unknown';

    const isGithubReq = await verifySignature(req, body);

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
      case 'deployment_status':
        message = onDeployment(body);
        break;
      case 'issue':
        message = onIssue(body);
        break;
      case 'pull_request':
        message = onPR(body);
        break;
      case 'star':
        message = onStar(body);
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
