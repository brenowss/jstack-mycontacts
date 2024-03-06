import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

export default function ContactForm({ buttonLabel, handleSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const {
    setError, getErrorMessageByFieldName, removeErrorByFieldName, errors
  } = useErrors();

  const isFormValid = (name && !errors.length);

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

  function onSubmit(e) {
    e.preventDefault();

    handleSubmit({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      categoryId
    });
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
  }, []);

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
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
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
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
