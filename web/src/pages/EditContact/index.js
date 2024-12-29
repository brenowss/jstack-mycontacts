import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import useEditContact from './useEditContact';

export default function EditContact() {
  const {
    contactName,
    formRef,
    isLoading,
    handleSubmit
  } = useEditContact();

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}

      {
        contactName ? (
          <PageHeader title={`Editar ${contactName}`} />
        ) : (
          <PageHeader title="Carregando" />
        )
}

      <ContactForm
        ref={formRef}
        buttonLabel="Salvar alterações"
        handleSubmit={(data) => handleSubmit(data)}
      />
    </>
  );
}
