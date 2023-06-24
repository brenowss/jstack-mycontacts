import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <div>
      <PageHeader title="Editar Breno" />

      <ContactForm buttonLabel="Salvar alterações" />
    </div>
  );
}
