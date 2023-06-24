import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function NewContact() {
  return (
    <div>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" />
    </div>
  );
}
