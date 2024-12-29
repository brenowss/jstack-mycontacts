import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef();

  async function handleSubmit(data) {
    try {
      const response = await ContactsService.createContact(data);

      if (response) {
        toast({
          text: 'Contato cadastrado com sucesso!',
          type: 'success',
          time: 3000
        });
      }
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao cadastrar o contato!', type: 'danger' });
    }
  }

  return {
    contactFormRef,
    handleSubmit
  };
}
