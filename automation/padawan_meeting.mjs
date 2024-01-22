import * as dotenv from 'dotenv';
dotenv.config();

import { differenceInWeeks } from 'date-fns';
import makeRequest from './utils/makeRequest.mjs';
import parseContent from './utils/parseContent.mjs';

const startDate = new Date('2023 26 Oct');
const runningDate = new Date();

if (differenceInWeeks(runningDate, startDate) % 2 === 0) {
  const meetingLink = 'https://meet.google.com/nfk-wifd-tqi';

  const buildMessage = env => {
    return `
    %0A
    *Reminder*%0A
    Hey guys\\!%0A
    Today we have our meeting at *21\\:00*%0A
    Here it is the url\\: ${parseContent(env)}
    %0A
    `;
  };

  const padawanMeetingReminder = async () => {
    const devAssessment = buildMessage(meetingLink);

    await makeRequest(
      'padawanMeetingReminder',
      process.env.ZINNS_TELEGRAM_DEV_CHAT_ID,
      devAssessment,
    );
  };

  padawanMeetingReminder();
}
