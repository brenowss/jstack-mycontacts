import PropTypes from 'prop-types';
import { Container } from './styles';
import XCircleIcon from '../../../assets/images/icons/x-circle.svg';
import CheckCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage();
  }

  return (
    <Container
      type={type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={XCircleIcon} alt="X" />}
      {type === 'success' && <img src={CheckCircleIcon} alt="V" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'default']),
  onRemoveMessage: PropTypes.func.isRequired
};

ToastMessage.defaultProps = {
  type: 'default'
};
