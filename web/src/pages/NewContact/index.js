/* eslint-disable react/jsx-no-bind */
import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef();
  async function handleSubmit(data) {
    try {
      const newData = {
        category_id: data.categoryId,
        email: data.email,
        name: data.name,
        phone: data.phone
      };
      const response = await ContactsService.createContact(newData);

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

  return (
    <div>
      <PageHeader title="Novo contato" />

      <ContactForm ref={contactFormRef} buttonLabel="Cadastrar" handleSubmit={handleSubmit} />
    </div>
  );
}
