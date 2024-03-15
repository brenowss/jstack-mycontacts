import PropTypes from 'prop-types';
import {
  useEffect, useState, forwardRef, useImperativeHandle
} from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const ContactForm = forwardRef(({ buttonLabel, handleSubmit }, ref) => {
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
      setCategoryId(data.category_id ?? '');
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

    setIsSubmitting(false);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
        setIsLoadingCategories(false);
      } catch { /* empty */ }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  return (
    <Form onSubmit={(e) => onSubmit(e)} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          name="name"
          value={name}
          type="text"
          placeholder="Nome *"
          onChange={(e) => handleNameChange(e)}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => handleEmailChange(e)}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}

        />
      </FormGroup>

      <FormGroup>
        <Input
          name="phone"
          value={phone}
          type="tel"
          maxLength={15}
          placeholder="Telefone"
          onChange={(e) => handlePhoneChange(e)}
          disabled={isSubmitting}

        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem Categoria</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
