import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import {
  Container, Header, Card, InputSearchContainer, ListHeader, ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer
} from './styles';

import Arrow from '../../assets/images/icons/arrow.svg';
import Edit from '../../assets/images/icons/edit.svg';
import Delete from '../../assets/images/icons/trash.svg';
import Error from '../../assets/images/icons/sad.svg';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';

import EmptyBox from '../../assets/images/empty-box.svg';
import MagnifierQuestion from '../../assets/images/magnifier-question.svg';
import formatPhone from '../../utils/formatPhone';
import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
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

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsDeleting(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      toast({
        type: 'success',
        text: 'Contato removido com sucesso!'
      });
      setContacts(
        (prevState) => prevState.filter(
          (contact) => contact.id !== contactBeingDeleted.id
        )
      );
      handleCloseDeleteModal();
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover o contato!'
      });
    } finally {
      setContactBeingDeleted(null);
      setIsDeleteModalOpen(false);
      setIsDeleting(false);
    }

    handleCloseDeleteModal();
  }

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [contacts, searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        open={isDeleteModalOpen}
        isLoading={isDeleting}
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Remover"
        onConfirm={() => {
          handleConfirmDeleteContact();
        }}
        onCancel={() => {
          handleCloseDeleteModal();
        }}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

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
          {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img
              src={EmptyBox}
              alt="Empty box"
            />

            <p>
              Você ainda não possui contatos cadastrados!
              Clique no botão <strong>Novo contato</strong> para adicionar seu primeiro contato.
            </p>
          </EmptyListContainer>
          )}

          {
            contacts.length > 0 && filteredContacts.length < 1 && (
              <SearchNotFoundContainer>
                <img
                  src={MagnifierQuestion}
                  alt="Magnifier question"
                />

                <span>
                  Nenhum resultado encontrado para <strong>{searchTerm}</strong>
                </span>
              </SearchNotFoundContainer>
            )
          }

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
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
                    contact.category_name && (
                      <small>{contact?.category_name}</small>
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
                 <button type="button" onClick={() => handleDeleteContact(contact)}>
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
