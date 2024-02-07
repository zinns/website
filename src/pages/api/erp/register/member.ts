import { connectDB } from 'config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      const {
        birthday,
        lastName,
        memberSince,
        memberType,
        name,
        phoneNumber,
        position,
        telegramUser,
        tShirtSize,
      } = JSON.parse(req.body);

      await connectDB();

      res.status(200).json({ message: 'Everything went well 🚀' });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ message: 'There was an update but there was an error sending the body' });
    }
  }
}
