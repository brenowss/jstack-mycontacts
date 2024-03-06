import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  type, disabled, isLoading, children
}) {
  return (
    <div>
      <StyledButton type={type} disabled={disabled || isLoading}>
        {isLoading ? <Spinner size={18} /> : children}
      </StyledButton>
    </div>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false
};
