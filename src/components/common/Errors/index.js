import { useState } from 'react';

// Form errors
const useFormErrors = (initialErrors) => {
  const [errors, setErrors] = useState(initialErrors);

  const setError = (field, message) => {
    setErrors({ ...errors, [field]: message });
  };

  const clearError = (field) => {
    setErrors({ ...errors, [field]: '' });
  };

  const clearAllErrors = () => {
    setErrors(initialErrors);
  };

  return [errors, setError, clearError, clearAllErrors];
};

export default useFormErrors;
