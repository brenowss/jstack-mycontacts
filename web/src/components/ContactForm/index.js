import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';

import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, handleSubmit }, ref) => {
  const {
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
  } = useContactForm(handleSubmit, ref);

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
