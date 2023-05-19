import { useState, useCallback } from 'react';

const useFormErrors = (initialErrors) => {
  const [errors, setErrors] = useState(initialErrors);

  const setError = useCallback((field, message) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
  }, []);

  const clearError = useCallback((field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors(initialErrors);
  }, [initialErrors]);

  return [errors, setError, clearError, clearAllErrors];
};

export default useFormErrors;
