import type { NextApiRequest, NextApiResponse } from 'next';
import { extractData } from 'utils/github-updates/extractData';
import { createDescription, formatMessage } from 'utils/github-updates/formatMessage';
import { validatePayload } from 'utils/github-updates/validatePayload';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      const { actor, repo, payload, update } = extractData(req.body);
      const isValid = validatePayload(payload);
      const description = createDescription(payload, update);
      const message = formatMessage(actor, description, repo, update);

      // if (isValid) {
      //   await sendMessage(message);
      // }
      console.log(message);
      res.status(200).json({ message: 'Everything went well 🚀' });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ message: 'There was an update but there was an error sending the body' });
    }
  }
}
