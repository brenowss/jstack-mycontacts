import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatPhone from '../../../../utils/formatPhone';
import Arrow from '../../../../assets/images/icons/arrow.svg';
import Edit from '../../../../assets/images/icons/edit.svg';
import Delete from '../../../../assets/images/icons/trash.svg';
import { Card, ListHeader } from './styles';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span>
            <img src={Arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts
        && filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {
                contact.category.name && (
                  <small>{contact?.category.name}</small>
                )
              }
              </div>

              <span>{contact?.email}</span>
              <span>{formatPhone(contact?.phone)}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={Edit} alt="Edit" />
              </Link>
              <button type="button" onClick={() => onDeleteContact(contact)}>
                <img src={Delete} alt="Delete" />
              </button>
            </div>
          </Card>
        ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string
    })
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};
