import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Container, Header, Card, InputSearchContainer, ListHeader, ErrorContainer
} from './styles';

import Arrow from '../../assets/images/icons/arrow.svg';
import Edit from '../../assets/images/icons/edit.svg';
import Delete from '../../assets/images/icons/trash.svg';
import Error from '../../assets/images/icons/sad.svg';

import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  async function fetchContacts() {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

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
  }, [orderBy]);

  return (
    <Container>
      {/* <Modal danger /> */}

      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquise pelo nome"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {
          !hasError && (
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
    </Container>
  );
}
