// //In src/components/common/Errors/index.js i have the following code:
// import { useState, useCallback } from 'react';

// // Form errors
// const useFormErrors = (initialErrors) => {
//   const [errors, setErrors] = useState(initialErrors);

//   const setError = useCallback((field, message) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
//   }, []);

//   const clearError = useCallback((field) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
//   }, []);

//   const clearAllErrors = useCallback(() => {
//     setErrors(initialErrors);
//   }, [initialErrors]);

//   return [errors, setError, clearError, clearAllErrors];
// };

// export default useFormErrors;

//In src/components/common/Errors/index.js i have the following code:
import { useState, useCallback } from 'react';

// Form errors
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
