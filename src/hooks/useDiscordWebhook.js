import { useState } from 'react';

const useDiscordWebhook = (webhookUrl = 'https://discord.com/api/webhooks/1406512839002161182/KMRT2gd26ilKAzgctiLNs3cehkG6IV62GBaMw_NbORivT4hpe64MMblI9WxNRad8VX7u') => {
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    if (!webhookUrl) {
      setError('No webhook URL provided');
      return;
    }

    if (message.length > 100) {
      setError('Message must be less than 100 characters');
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          username: 'Anonymous Message',
          avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png'
        }),
      });

      if (response.ok) {
        setMessageSent(true);
        setError(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message');
      setMessageSent(false);
    } finally {
      setSending(false);
    }
  };

  const resetMessage = () => {
    setMessageSent(false);
    setError(null);
  };

  return {
    sendMessage,
    resetMessage,
    sending,
    messageSent,
    error
  };
};

export default useDiscordWebhook; 