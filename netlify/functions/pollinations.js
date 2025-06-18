// netlify/functions/pollinations.js
export async function handler(event, context) {
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
}

export async function handler(event, context) {
  const { prompt, width = 512, height = 512 } = event.queryStringParameters;

  if (!prompt) {
    return {
      statusCode: 400,
      body: "Missing prompt",
    };
  }

  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000); // Random seed per request

  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=${width}&height=${height}&nologo=true&private=true&enhance=true&safe=true&quality=2&steps=30&seed=${seed}`;

  try {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) throw new Error("Image fetch failed");

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType = imageResponse.headers.get("content-type") || "image/png";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache"
      },
      body: base64,
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Image proxy error: ${error.message}`,
    };
  }
}

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
