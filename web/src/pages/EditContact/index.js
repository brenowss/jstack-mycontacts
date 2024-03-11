import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

export default function EditContact() {
  const params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = params;

  function handleSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    async function loadContact() {
      try {
        const response = await ContactsService.getContactById(id);
        console.log(response);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          text: 'Contato não encontrado',
          type: 'danger'
        });
      }
    }

    loadContact();
  }, [id, history]);

  return (
    <>
      {isLoading && <Loader />}

      <PageHeader title="Editar Breno" />

      <ContactForm
        buttonLabel="Salvar alterações"
        handleSubmit={(data) => handleSubmit(data)}
      />
    </>
  );
}
