import { useCallback, useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (!errorAlreadyExists) {
      setErrors((prevState) => [...prevState, { field, message }]);
    }
  }, [errors]);

  const removeErrorByFieldName = useCallback((fieldName) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => {
    const error = errors.find((errorObj) => errorObj.field === fieldName);
    return error ? error.message : '';
  }, [errors]);

  return {
    setError,
    removeErrorByFieldName,
    getErrorMessageByFieldName,
    errors
  };
}
