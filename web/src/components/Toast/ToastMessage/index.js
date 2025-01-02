import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';
import XCircleIcon from '../../../assets/images/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
  message,
  isLeaving,
  onRemoveMessage,
  containerRef
}) {
  const { text, type } = message;

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRemoveToast();
    }, message.time || 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message, handleRemoveToast]);

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={containerRef}
    >
      {type === 'danger' && <img src={XCircleIcon} alt="X" />}
      {type === 'success' && <img src={CheckCircleIcon} alt="V" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
    time: PropTypes.number,
    id: PropTypes.number.isRequired
  }).isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
