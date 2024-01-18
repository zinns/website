import * as dotenv from 'dotenv';
dotenv.config();

import makeRequest from './utils/makeRequest.mjs';
import parseContent from './utils/parseContent.mjs';

const personalAssessmentLink = 'https://forms.gle/eY24D9iLYKABosyU7';

const buildMessage = env => {
  return `
%0A
\\-\\-\\-\\-\\-\\-
*Reminder*%0A
Please help us to do your personal assessment%0A
Please visit this link *${parseContent(env)}*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *${parseContent(env)}*%0A
`;
};

const personalAssessment = async () => {
  const personalAssessment = buildMessage(personalAssessmentLink);

  await makeRequest(
    'personalAssessment',
    process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID,
    personalAssessment,
  );
};

personalAssessment();
