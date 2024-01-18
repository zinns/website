import * as dotenv from 'dotenv';
dotenv.config();

import parseContent from './utils/parseContent.mjs';
import makeRequest from './utils/makeRequest.mjs';

const devAssessmentLink = 'https://forms.gle/RMQwMbVpoJ9n5rnJ7';

const buildMessage = env => {
  return `
%0A
\\-\\-\\-\\-\\-\\-
*Reminder*%0A
Please help us to do the dev course assessment%0A
Please visit this link *${parseContent(env)}*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *${parseContent(env)}*%0A
`;
};

const devCourseAssessment = async () => {
  const devAssessment = buildMessage(devAssessmentLink);

  await makeRequest('devCourseAssessment', process.env.ZINNS_TELEGRAM_DEV_CHAT_ID, devAssessment);
};

devCourseAssessment();
