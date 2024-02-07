import type { NextApiRequest, NextApiResponse } from 'next';
import { extractData } from 'utils/github-updates/extractData';
import { createMessage } from 'utils/github-updates/createMessage';
import { createDescription } from 'utils/github-updates/createDescription';
import { sendMessage } from 'utils/github-updates/sendMessage';
import { validatePayload } from 'utils/github-updates/validatePayload';
import { GitHubBodyRequest } from 'types/Webhook/githubRequest';
import { WorkflowJobClass } from 'types/Webhook/workflow_job';
import { WorkflowRunClass } from 'types/Webhook/workflow_run';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      const { actor, repo, payload, update } = extractData(req.body);
      const isValid = validatePayload(payload as GitHubBodyRequest, update);

      if (isValid) {
        const description = createDescription(payload, update);
        const message = createMessage(actor, description, repo);

        await sendMessage(message);
      }

      res.status(200).json({ message: 'Everything went well 🚀' });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ message: 'There was an update but there was an error sending the body' });
    }
  }
}
