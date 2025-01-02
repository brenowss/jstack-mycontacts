import { useEffect, useImperativeHandle, useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(handleSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, getErrorMessageByFieldName, removeErrorByFieldName, errors
  } = useErrors();

  const isFormValid = (name && !errors.length);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (data) => {
      setName(data.name ?? '');
      setEmail(data.email ?? '');
      setPhone(formatPhone(data.phone ?? ''));
      setCategoryId(data.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    }
  }), []);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError({
        field: 'name',
        message: 'O nome é obrigatório'
      });
    } else {
      removeErrorByFieldName('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({
        field: 'email',
        message: 'E-mail inválido'
      });
    } else {
      removeErrorByFieldName('email');
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function onSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await handleSubmit({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      categoryId
    });

    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');

    setIsSubmitting(false);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setIsLoadingCategories(false);
        setCategories(categoriesList);
      } catch (error) {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  return {
    name,
    email,
    phone,
    categories,
    categoryId,
    isSubmitting,
    isFormValid,
    isLoadingCategories,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId,
    onSubmit,
    getErrorMessageByFieldName
  };
}
