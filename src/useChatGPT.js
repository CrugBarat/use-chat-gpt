import { useEffect, useState } from 'react';
import { fetchGPTResponse } from './fetchGPTResponse';

export const useChatGPT = () => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: "You are an AI powered expert in React js.",
    },
    {
      role: 'user',
      content: "Briefly explain who you are.",
    },
  ]);

  useEffect(() => {
    const generateResponse = async () => {
      try {
        const res = await fetchGPTResponse(messages);
        const data = await res.json();

        setResponse(data.choices[0].message.content);
        setMessages((messages) => [...messages, data.choices[0].message]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    generateResponse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateMore = async () => {
    setIsLoading(true);

    setMessages((messages) => [
      ...messages,
      {
        role: 'user',
        content: "Great. Briefly tell me more about React js.",
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
