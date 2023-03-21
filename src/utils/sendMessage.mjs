import * as dotenv from 'dotenv';
dotenv.config();

export const sendMessage = async message => {
  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_CHAT_ID}&parse_mode=MarkdownV2&text=${message}`,
    );
  } catch (error) {
    console.log(error);
  }
};
