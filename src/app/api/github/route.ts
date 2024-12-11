import {
  notify,
  verifySignature,
  onIssue,
  onStar,
  onDeployment,
  onPullRequest,
  onWorkflowCompleted,
  onWorkflowRun,
} from '@/helpers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(req: Request) {
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

    let message: string | null;
    const {
      repository: { name: repositoryName },
    } = body;

    switch (githubEvent) {
      case 'deployment':
        message = null;
        break;
      case 'deployment_status':
        message = onDeployment(body);
        break;
      case 'issue':
        message = onIssue(body);
        break;
      case 'pull_request':
        message = onPullRequest(body);
        break;
      case 'star':
        message = onStar(body);
        break;
      case 'workflow_job':
        message = onWorkflowCompleted(body);
        break;
      case 'workflow_run':
        message = onWorkflowRun(body);
        break;
      default:
        message = `
---
Something happened in **${repositoryName}**

An unhandled event ${githubEvent}
---
        `;
    }

    if (!message) {
      return NextResponse.json(
        {
          ok: true,
          response: 'Nothing important to notify',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
        },
      );
    }

    await notify(message);

    return NextResponse.json(
      {
        ok: true,
        response: 'Accepted',
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
}
