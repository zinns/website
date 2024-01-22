import * as dotenv from 'dotenv';
dotenv.config();

import makeRequest from './utils/makeRequest.mjs';

const buildMessage = () => {
  return `
  %0A
  *Reminder*%0A
  Hey guys\\!%0A
  Please update your statuses on trello
  %0A
  `;
};

const updateTrelloReminder = async () => {
  const trelloReminder = buildMessage();

  await makeRequest(
    'updateTrelloReminder',
    process.env.ZINNS_TELEGRAM_DESIGN_CHAT_ID,
    trelloReminder,
  );
};

updateTrelloReminder();
