import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { getMonth } from 'date-fns';

const devAssessmentLink = 'https://forms.gle/RMQwMbVpoJ9n5rnJ7';

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
Please help us to do the dev course assessment%0A
Please visit this link *${formatContent(env)}*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *${formatContent(env)}*%0A
`;
};

const buildErrorMessage = description => {
  return `
%0A
Something wrong happened running this automation: *devCourseAssessment*%0A
Here is the error \\-\\> ${description}
`;
};

const devCourseAssessment = async () => {
  try {
    const month = getMonth(new Date()) + 1;
    const isValidMonth = month % 3 === 0;

    if (!isValidMonth) {
      console.log(`This month is not a valid month -> ${month}`);
      return;
    }

    const devAssessment = buildMessage(devAssessmentLink);

    const { data: devResponseData } = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DEV_CHAT_ID}&parse_mode=MarkdownV2&text=${devAssessment}`,
    );

    if (!devResponseData?.ok) {
      console.log('Something unexpected happened -> ', JSON.stringify(devResponseData));

      await axios.get(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${
          process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID
        }&parse_mode=MarkdownV2&text=${buildErrorMessage(JSON.stringify(devResponseData))}`,
      );
    }
  } catch (error) {
    console.log('Something wrong happened -> ', JSON.stringify(error.response.data));

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${
        process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID
      }&parse_mode=MarkdownV2&text=${buildErrorMessage(error.response.data)}`,
    );
  }
};

devCourseAssessment();
