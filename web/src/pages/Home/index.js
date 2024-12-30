import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmpyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!hasContacts && !isLoading);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
        hasError={hasError}
      />

      {hasError && <ErrorStatus onRefetch={handleRefetch} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  );
}
