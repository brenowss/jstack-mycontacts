import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({
  open,
  danger,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onConfirm,
  onCancel
}) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        {
          children && (
            <div className="modal-body">
              {children}
            </div>
          )
        }

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <Button
            type="button"
            danger={danger}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

Modal.defaultProps = {
  danger: false,
  children: null,
  isLoading: false,
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar'
};
