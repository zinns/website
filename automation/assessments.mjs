import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

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
    const devAssessment = buildMessage(devAssessmentLink);
    const internalAssessment = buildMessage(internalAssessmentLink);

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DEV_CHAT_ID}&parse_mode=MarkdownV2&text=${devAssessment}`,
    );
    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID}&parse_mode=MarkdownV2&text=${internalAssessment}`,
    );
  } catch (error) {
    console.log(error);
  }
};

assessmentsReminder();
