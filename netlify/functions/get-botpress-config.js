export async function handler() {
  const clientId = process.env.BOTPRESS_CLIENT_ID;
  const botId = process.env.BOTPRESS_BOT_ID;

  if (!clientId || !botId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Botpress clientId or botId" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ clientId, botId }),
  };
}
