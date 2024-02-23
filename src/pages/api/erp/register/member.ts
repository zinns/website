import type { NextApiRequest, NextApiResponse } from 'next';
import { Member } from 'config/db/models/ERP';
import { DB } from 'config/db';
import { cleanForm } from 'utils';

type ResponseData = {
  message: string;
  ok: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      if (!DB.connected) {
        await DB.connect();
      }
      const data = JSON.parse(req.body);

      const dataFormatted = cleanForm(data);

      const newMember = new Member({ ...dataFormatted });
      await newMember.save();

      res.status(200).json({ message: 'Member registered', ok: true });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: 'There was an error trying to register', ok: false });
    } finally {
      DB.disconnect();
    }
  }
}
