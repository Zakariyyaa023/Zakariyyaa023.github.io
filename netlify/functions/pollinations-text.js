const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const query = event.queryStringParameters;
  const prompt = query.prompt;

  if (!prompt) {
    return {
      statusCode: 400,
      body: "Missing prompt",
    };
  }

  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://text.pollinations.ai/prompt/${encodedPrompt}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "text/plain" },
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching from Pollinations: " + error.message,
    };
  }
};
