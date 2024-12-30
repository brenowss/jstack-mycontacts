import PropTypes from 'prop-types';
import MagnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img
        src={MagnifierQuestion}
        alt="Magnifier question"
      />

      <span>
        Nenhum resultado encontrado para <strong>{searchTerm}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired
};
