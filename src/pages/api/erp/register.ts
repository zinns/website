import type { NextApiRequest, NextApiResponse } from 'next';
import { Member } from 'config/db/models/ERP';
import { DB } from 'config/db';
import { cleanForm, createDBinstance } from 'utils';

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

      const instance = createDBinstance(req.headers.type as string, data);

      await instance.save();

      res.status(200).json({ message: 'User registered', ok: true });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: 'There was an error trying to register', ok: false });
    } finally {
      DB.disconnect();
    }
  }
}
