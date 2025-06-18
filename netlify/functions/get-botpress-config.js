// netlify/functions/get-botpress-config.js
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      clientId: process.env.BOTPRESS_CLIENT_ID,
      botId: process.env.BOTPRESS_BOT_ID,
    }),
  };
}