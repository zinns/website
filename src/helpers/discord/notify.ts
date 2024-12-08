const notify = async (message: string) => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL ?? '';

  const body = {
    content: message,
  };

  const response = await fetch(discordWebhookUrl, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    console.log('Error sending message');
    return false;
  }

  return true;
};

export { notify };
