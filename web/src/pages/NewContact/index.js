/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
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
        alert('Contato cadastrado com sucesso!');
      }
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar o contato');
    }
  }

  return (
    <div>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" handleSubmit={handleSubmit} />
    </div>
  );
}
