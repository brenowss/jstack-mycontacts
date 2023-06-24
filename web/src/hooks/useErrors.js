import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (!errorAlreadyExists) {
      setErrors((prevState) => [...prevState, { field, message }]);
    }
  }

  function removeErrorByFieldName(fieldName) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName) {
    const error = errors.find((errorObj) => errorObj.field === fieldName);
    return error ? error.message : '';
  }

  return {
    setError,
    removeErrorByFieldName,
    getErrorMessageByFieldName,
    errors
  };
}
