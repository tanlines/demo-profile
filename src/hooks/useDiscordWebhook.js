import { useState } from 'react';

const useDiscordWebhook = (webhookUrl = 'https://discord.com/api/webhooks/1403719689456320603/QtPOgoai6d1jafWzBmSlyOr_mUeU1MrIdmr7VHpyWtUKeqeLSilXtq7VXofq-S9iUmfP') => {
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