import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Header({
  contactsLength,
  filteredContactsLength,
  hasError
}) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = hasError
    ? 'flex-end'
    : (
      contactsLength > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container justifyContent={alignment}>
      {
        (!hasError && contactsLength > 0) && (
          <strong>{filteredContactsLength} {filteredContactsLength === 1 ? 'contato' : 'contatos'}</strong>
        )
      }
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  contactsLength: PropTypes.number.isRequired,
  filteredContactsLength: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired
};
