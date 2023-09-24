import { useEffect, useState } from 'react';

const fetchGPTResponse = async (messages) =>
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

export const useChatGPT = (prompt) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: "You are a..........",
    },
    {
      role: 'user',
      content: prompt,
    },
  ]);

  useEffect(() => {
    const generateResponse = async () => {
      try {
        const res = fetchGPTResponse(messages)
        const data = await res.json();

        setResponse(data.choices[0].message.content);
        setMessages((messages) => [...messages, data.choices[0].message]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (prompt) {
      generateResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateMore = async () => {
    setIsLoading(true);

    setMessages((messages) => [
      ...messages,
      {
        role: 'user',
        content: "Tell me more....",
      },
    ]);

    try {
      const res = await fetchGPTResponse(messages)
      const data = await res.json();

      setResponse(data.choices[0].message.content);
      setMessages((messages) => [...messages, data.choices[0].message]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    response,
    isLoading,
    generateMore,
  };
};
