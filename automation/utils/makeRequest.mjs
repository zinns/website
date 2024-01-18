import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import buildErrorMessage from './buildErrorMessage.mjs';

const makeRequest = async (automation, chatId, message) => {
  try {
    const { data } = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=MarkdownV2&text=${message}`,
    );

    if (!data?.ok) {
      console.log('Something unexpected happened -> ', JSON.stringify(data));

      await axios.get(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${
          process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID
        }&parse_mode=MarkdownV2&text=${buildErrorMessage(automation, JSON.stringify(data))}`,
      );
    }
  } catch (error) {
    console.log('Something wrong happened -> ', JSON.stringify(error?.response?.data));

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${
        process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID
      }&parse_mode=MarkdownV2&text=${buildErrorMessage(
        automation,
        JSON.stringify(error?.response?.data),
      )}`,
    );
  }
};

export default makeRequest;
