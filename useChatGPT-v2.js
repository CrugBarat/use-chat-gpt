import {  useState } from 'react';
import { fetchGPTResponse } from './fetchGPTResponse';

export const useChatGPT = () => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: "You are a..........",
    },
  ]);

  const generateResponse = async (prompt) => {
    setIsLoading(true);

    setMessages((messages) => [
      ...messages,
      {
        role: 'user',
        content: prompt,
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
    generateResponse,
  };
};
