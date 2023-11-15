export const sendMessage = async (message: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.ZINNS_TELEGRAM_GITHUB_CHAT_ID}&parse_mode=MarkdownV2&text=${message}`,
    );
    const stringify = await response.json();

    console.log(stringify);
  } catch (error) {
    console.log(error);
  }
};
