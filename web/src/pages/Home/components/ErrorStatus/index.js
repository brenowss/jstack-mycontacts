import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import Error from '../../../../assets/images/icons/sad.svg';
import { Container } from './styles';

export default function ErrorStatus({ onRefetch }) {
  return (
    <Container>
      <img src={Error} alt="Error" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>

        <Button type="button" onClick={onRefetch}>Tentar novamente</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onRefetch: PropTypes.func.isRequired
};
