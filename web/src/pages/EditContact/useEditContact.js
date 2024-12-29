import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const formRef = useRef();
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  const { id } = params;

  async function handleSubmit(data) {
    try {
      const response = await ContactsService.updateContact(id, data);

      setContactName(data.name);
      if (response) {
        toast({
          text: 'Contato atualizado com sucesso!',
          type: 'success',
          time: 3000
        });
      }
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao atualizar o contato!', type: 'danger' });
    }
  }

  useEffect(() => {
    async function loadContact() {
      try {
        const response = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          formRef.current.setFieldsValues(response);

          setIsLoading(false);
          setContactName(response.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');

          toast({
            text: 'Contato não encontrado',
            type: 'danger'
          });
        });
      }
    }

    loadContact();
  }, [id, history, isMounted, safeAsyncAction]);

  return {
    isLoading,
    contactName,
    formRef,
    handleSubmit
  };
}
