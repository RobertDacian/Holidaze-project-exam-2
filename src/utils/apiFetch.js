// import { useState } from 'react';
// import {
//   API_BASE_URL,
//   API_AUTH_REGISTER,
//   API_AUTH_VENUE_MANAGER_REGISTER,
// } from '../constants/constants';

// const useApiRequest = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const sendRequest = async (endpoint, method, body = null, token = null) => {
//     setIsLoading(true);
//     setError(null);
//     console.log('sending request...');

//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`);
//     }

//     const requestOptions = {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : null,
//     };

//     console.log('Request URL:', `${API_BASE_URL}${endpoint}`);
//     console.log('Request options:', requestOptions);

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}${endpoint}`,
//         requestOptions
//       );
//       const responseData = await response.json();

//       console.log('Response:', response);
//       console.log('Response data:', responseData);

//       if (!response.ok) {
//         const errorMessage =
//           responseData.errors && responseData.errors.length
//             ? responseData.errors[0].message
//             : responseData.message || 'Something went wrong';
//         throw new Error(errorMessage);
//       }

//       setData(responseData);
//       setIsLoading(false);
//     } catch (error) {
//       console.log('Error:', error);
//       setError(error.message || 'Something went wrong');
//       setIsLoading(false);
//     }
//   };

//   const register = async (name, email, password, isVenueManager) => {
//     const existingUserEmails = JSON.parse(
//       localStorage.getItem('existingUserEmails') || '[]'
//     );

//     if (existingUserEmails.includes(email)) {
//       throw new Error('A user with this email already exists.');
//     }

//     await sendRequest(API_AUTH_REGISTER, 'POST', {
//       name,
//       email,
//       password,
//       venueManager: isVenueManager,
//     });

//     // Save the email address in local storage
//     existingUserEmails.push(email);
//     localStorage.setItem(
//       'existingUserEmails',
//       JSON.stringify(existingUserEmails)
//     );
//   };

//   const registerVenueManager = async (name, email, password) => {
//     const existingVenueManagerEmails = JSON.parse(
//       localStorage.getItem('existingVenueManagerEmails') || '[]'
//     );

//     if (existingVenueManagerEmails.includes(email)) {
//       throw new Error('A venue manager with this email already exists.');
//     }

//     await sendRequest(API_AUTH_VENUE_MANAGER_REGISTER, 'POST', {
//       name,
//       email,
//       password,
//     });

//     // Save the email address in local storage
//     existingVenueManagerEmails.push(email);
//     localStorage.setItem(
//       'existingVenueManagerEmails',
//       JSON.stringify(existingVenueManagerEmails)
//     );
//   };

//   return {
//     isLoading,
//     data,
//     error,
//     sendRequest,
//     register,
//     registerVenueManager,
//   };
// };

// export default useApiRequest;

// import { useState } from 'react';
// import { API_BASE_URL } from '../constants/constants';
// import { register, login } from './api/auth';

// const useApiRequest = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const sendRequest = async (endpoint, method, body = null, token = null) => {
//     setIsLoading(true);
//     setError(null);
//     console.log('sending request...');

//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`);
//     }

//     const requestOptions = {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : null,
//     };

//     console.log('Request URL:', `${API_BASE_URL}${endpoint}`);
//     console.log('Request options:', requestOptions);

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}${endpoint}`,
//         requestOptions
//       );
//       const responseData = await response.json();

//       console.log('Response:', response);
//       console.log('Response data:', responseData);

//       if (!response.ok) {
//         const errorMessage =
//           responseData.errors && responseData.errors.length
//             ? responseData.errors[0].message
//             : responseData.message || 'Something went wrong';
//         throw new Error(errorMessage);
//       }

//       setData(responseData);
//       setIsLoading(false);
//     } catch (error) {
//       console.log('Error:', error);
//       setError(error.message || 'Something went wrong');
//       setIsLoading(false);
//     }
//   };

//   const registerUser = async (name, email, password, isVenueManager) => {
//     await register(sendRequest, name, email, password, isVenueManager);
//   };

//   const loginUser = async (email, password) => {
//     const userData = await login(email, password);
//     setData(userData);
//   };

//   return {
//     isLoading,
//     data,
//     error,
//     sendRequest,
//     register: registerUser,
//     login: loginUser,
//   };
// };

// export default useApiRequest;
