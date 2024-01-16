import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { differenceInWeeks } from 'date-fns';

const startDate = new Date('2023 26 Oct');
const runningDate = new Date();

if (differenceInWeeks(runningDate, startDate) % 2 === 0) {
  const meetingLink = 'https://meet.google.com/nfk-wifd-tqi';

  const formatContent = content =>
    content
      .split('')
      .map(char => (/[-]|[(]|[)]|[>]|[_]|[/]|[:]|[.]/g.test(char) ? `\\${char}` : char))
      .join('');

  const buildMessage = env => {
    return `
  %0A
  *Reminder*%0A
  Hey guys\\!%0A
  Today we have our meeting at *21\\:00*%0A
  Here it is the url\\: ${formatContent(env)}
  %0A
  `;
  };

  const buildErrorMessage = description => {
    return `
%0A
Something wrong happened running this automation: *padawanMeetingReminder*%0A
Here is the error \\-\\> ${description}
`;
  };

  const padawanMeetingReminder = async () => {
    try {
      const devAssessment = buildMessage(meetingLink);

      await axios.get(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DEV_CHAT_ID}&parse_mode=MarkdownV2&text=${devAssessment}`,
      );
    } catch (error) {
      console.log('Something wrong happened -> ', JSON.stringify(error.response.data));

      await axios.get(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${
          process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID
        }&parse_mode=MarkdownV2&text=${buildErrorMessage(error.response.data)}`,
      );
    }
  };

  padawanMeetingReminder();
}
