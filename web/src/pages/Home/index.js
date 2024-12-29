import { Link } from 'react-router-dom';
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
import Button from '../../components/Button';

import EmptyBox from '../../assets/images/empty-box.svg';
import MagnifierQuestion from '../../assets/images/magnifier-question.svg';
import formatPhone from '../../utils/formatPhone';
import useHome from './useHome';

export default function Home() {
  const {
    contacts,
    orderBy,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalOpen,
    contactBeingDeleted,
    isDeleting,
    filteredContacts,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleRefetch,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact
  } = useHome();

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
