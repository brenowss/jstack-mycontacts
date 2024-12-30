import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
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
      setContacts([]);
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

  return {
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
  };
}
