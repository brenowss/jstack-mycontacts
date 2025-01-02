import { useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    renderList,
    setItems: setMessages,
    handleRemoveItem
  } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, containerRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          containerRef={containerRef}
        />
      ))}
    </Container>
  );
}
