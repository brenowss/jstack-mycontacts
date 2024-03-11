import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ text, type, time }) {
      setMessages((prevMessages) => [...prevMessages, {
        id: Math.random(), text, type, time
      }]);
    }

    toastEventManager.on('toast', handleAddToast);

    return () => {
      toastEventManager.removeListener('toast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={() => handleRemoveMessage(message.id)}
        />
      ))}
    </Container>
  );
}
