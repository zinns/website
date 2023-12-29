import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { getMonth } from 'date-fns';

const devAssessmentLink = 'https://forms.gle/RMQwMbVpoJ9n5rnJ7';
const internalAssessmentLink = 'https://forms.gle/eY24D9iLYKABosyU7';

const formatContent = content =>
  content
    .split('')
    .map(char => (/[-]|[(]|[)]|[>]|[_]|[/]|[:]|[.]/g.test(char) ? `\\${char}` : char))
    .join('');

const buildMessage = env => {
  return `
%0A
\\-\\-\\-\\-\\-\\-
*Reminder*%0A
Please help us to do the assessment%0A
Please visit this link *${formatContent(env)}*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *${formatContent(env)}*%0A
`;
};

const assessmentsReminder = async () => {
  try {
    const month = getMonth(new Date()) + 1;
    const isValidMonth = month % 2 === 0;

    if (!isValidMonth) {
      console.log(`This month is not a valid month -> ${month}`);
      return;
    }

    const devAssessment = buildMessage(devAssessmentLink);
    const internalAssessment = buildMessage(internalAssessmentLink);

    const { data: devResponseData } = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DEV_CHAT_ID}&parse_mode=MarkdownV2&text=${devAssessment}`,
    );
    const { data: designResponseData } = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID}&parse_mode=MarkdownV2&text=${internalAssessment}`,
    );

    if (!devResponseData?.ok || !designResponseData?.ok) {
      console.log(
        'Something unexpected happened -> ',
        JSON.stringify(devResponseData, designResponseData),
      );
    }
  } catch (error) {
    console.log('Something wrong happened -> ', JSON.stringify(error.response.data));
  }
};

assessmentsReminder();
