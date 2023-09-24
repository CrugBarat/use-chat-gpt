export const fetchGPTResponse = async (messages) =>
  await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      messages: messages,
      temperature: 1.5,
      max_tokens: 500,
      model: 'gpt-3.5-turbo',
    }),
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });