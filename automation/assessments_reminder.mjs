import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const assessmentsReminder = async () => {
  try {
    const message = `
%0A
\\-\\-\\-\\-\\-\\-
*Reminder*%0A
Please help us to do the assessment%0A
Please visit this link *https\\:\\/\\/forms\\.gle\\/RMQwMbVpoJ9n5rnJ7*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *https\\:\\/\\/forms\\.gle\\/RMQwMbVpoJ9n5rnJ7*%0A
`;

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_CHAT_ID}&parse_mode=MarkdownV2&text=${message}`,
    );
  } catch (error) {
    console.log(error);
  }
};

assessmentsReminder();
