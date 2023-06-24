import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Modal</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>

          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  danger: PropTypes.bool
};

Modal.defaultProps = {
  danger: false
};
