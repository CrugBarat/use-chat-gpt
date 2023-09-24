import { useEffect, useState } from 'react';
import { fetchGPTResponse } from './fetchGPTResponse';

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

  // for rendering response on first render
  useEffect(() => {
    const generateResponse = async () => {
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

    if (prompt) {
      generateResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // generates further responses and includes context of conversation
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
