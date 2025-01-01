import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

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
  const { shouldRender, componentRef } = useAnimatedUnmount(open);

  if (!shouldRender) {
    return null;
  }

  let container = document.getElementById('modal-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'modal-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!open} ref={componentRef}>
        <Container danger={danger} isLeaving={!open}>
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
      </Overlay>
    </ReactPortal>
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
