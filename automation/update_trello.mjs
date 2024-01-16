import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const buildMessage = () => {
  return `
  %0A
  *Reminder*%0A
  Hey guys\\!%0A
  Please update your statuses on trello
  %0A
  `;
};

const buildErrorMessage = description => {
  return `
  %0A
  Something wrong happened running this automation: *updateTrelloReminder*%0A
  Here is the error \\-\\> ${description}
  `;
};

const updateTrelloReminder = async () => {
  try {
    const trelloReminder = buildMessage();

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID}&parse_mode=MarkdownV2&text=${trelloReminder}`,
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

updateTrelloReminder();
