import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import {
  Container, Header, Card, InputSearchContainer, ListHeader, ErrorContainer
} from './styles';

import Arrow from '../../assets/images/icons/arrow.svg';
import Edit from '../../assets/images/icons/edit.svg';
import Delete from '../../assets/images/icons/trash.svg';
import Error from '../../assets/images/icons/sad.svg';

import Loader from '../../components/Loader';
// import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';

import EmptyBox from '../../assets/images/empty-box.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      // const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts([]);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleRefetch() {
    setHasError(false);
    fetchContacts();
  }

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [contacts, searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <Container>
      {/* <Modal danger /> */}

      <Loader isLoading={isLoading} />

      {
        contacts.length > 0 && (
          <InputSearchContainer>
            <input
              type="text"
              placeholder="Pesquise pelo nome"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </InputSearchContainer>
        )
      }

      <Header justifyContent={
      // eslint-disable-next-line no-nested-ternary
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )
}
      >
        {
          (!hasError && contacts.length > 0) && (
            <strong>{filteredContacts.length} {filteredContacts.length === 1 ? 'contato' : 'contatos'}</strong>
          )
        }
        <Link to="/new">Novo contato</Link>
      </Header>

      {
        hasError && (
          <ErrorContainer>
            <img src={Error} alt="Error" />
            <div className="details">
              <strong>Ocorreu um erro ao obter os seus contatos!</strong>

              <Button type="button" onClick={() => handleRefetch()}>Tentar novamente</Button>
            </div>
          </ErrorContainer>
        )
      }

      {!hasError && (
        <>
          {
          contacts.length < 1 && (
            <img
              src={EmptyBox}
              alt="Empty box"
              style={{
                width: 200,
                margin: '0 auto',
                display: 'block'
              }}
            />
          )
        }
          {
        filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={Arrow} alt="Arrow" />
            </button>
          </ListHeader>
        )
      }

          {filteredContacts
           && filteredContacts.map((contact) => (
             <Card key={contact.id}>
               <div className="info">
                 <div className="contact-name">
                   <strong>{contact.name}</strong>
                   {
                    contact.category_name && (
                      <small>{contact?.category_name}</small>
                    )
                  }
                 </div>

                 <span>{contact?.email}</span>
                 <span>{contact?.phone}</span>
               </div>

               <div className="actions">
                 <Link to={`/edit/${contact.id}`}>
                   <img src={Edit} alt="Edit" />
                 </Link>
                 <button type="button">
                   <img src={Delete} alt="Delete" />
                 </button>
               </div>
             </Card>
           ))}
        </>
      )}
    </Container>
  );
}
