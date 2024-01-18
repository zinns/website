import * as dotenv from 'dotenv';
dotenv.config();

import { getMonth } from 'date-fns';
import makeRequest from './utils/makeRequest.mjs';
import parseContent from './utils/parseContent.mjs';

const internalAssessmentLink = 'https://forms.gle/eY24D9iLYKABosyU7';

const buildMessage = env => {
  return `
%0A
\\-\\-\\-\\-\\-\\-
*Reminder*%0A
Please help us to do the company assessment%0A
Please visit this link *${parseContent(env)}*%0A
%0A
*Recordatorio*%0A
Por favor\\, contesta el siguiente formulario%0A
Visita este link *${parseContent(env)}*%0A
`;
};

const companyAssessment = async () => {
  const month = getMonth(new Date()) + 1;
  const isValidMonth = month % 3 === 0;

  if (!isValidMonth) {
    console.log(`This month is not a valid month -> ${month}`);
    return;
  }

  const internalAssessment = buildMessage(internalAssessmentLink);

  await makeRequest(
    'companyAssessment',
    process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID,
    internalAssessment,
  );
};

companyAssessment();
