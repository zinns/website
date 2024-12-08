import { GitHubBodyPayload } from '@/types';
import * as crypto from 'crypto';

const GITHUB_SECRET = process.env.GITHUB_SECRET ?? '';

const verifySignature = async (req: Request, body: GitHubBodyPayload) => {
  try {
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

export { verifySignature };
