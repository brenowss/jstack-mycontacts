import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('instagram');
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

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      category
    });
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
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

      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
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
  buttonLabel: PropTypes.string.isRequired
};
