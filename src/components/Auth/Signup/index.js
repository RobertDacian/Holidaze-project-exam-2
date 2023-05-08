// //In src/components/Auth/Signup/index.js i have the following code:
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser, registerVenueManager } from '../../../api/auth';
// import { FormWrapper } from './SignUp.styles';
// import { useGlobal } from '../../../contexts/GlobalContext';

// const SignUp = () => {
//   const { setCurrentUser } = useGlobal();
//   const [activeTab, setActiveTab] = useState('user');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     avatar: '',
//   });
//   const navigate = useNavigate();
//   const [formError, setFormError] = useState(null);

//   const nameInput = useRef(null);
//   const emailInput = useRef(null);
//   const passwordInput = useRef(null);

//   const handleClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === 'name' && !isNameValid(value)) {
//       nameInput.current.setCustomValidity(
//         'Name must be no longer than 16 characters and can only contain alphanumeric characters and underscores'
//       );
//     } else {
//       nameInput.current.setCustomValidity('');
//     }

//     emailInput.current.setCustomValidity('');
//     passwordInput.current.setCustomValidity('');
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formData.name.length > 16) {
//       setFormError('Name must be no longer than 16 characters');
//       return;
//     }

//     if (activeTab === 'user') {
//       handleRegister(
//         event,
//         setFormError,
//         navigate,
//         registerUser,
//         '/user-dashboard',
//         false
//       );
//     } else {
//       handleRegister(
//         event,
//         setFormError,
//         navigate,
//         registerVenueManager,
//         '/venue-manager-dashboard',
//         true
//       );
//     }
//   };

//   const isNameValid = (name) => {
//     const regex = /^[\w]+$/;
//     return regex.test(name) && name.length <= 16;
//   };

//   const handleRegister = async (
//     event,
//     setFormError,
//     navigate,
//     registerFunction,
//     redirectTo,
//     venueManager
//   ) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     try {
//       const user = await registerFunction(formData);
//       user.venueManager = venueManager;
//       setCurrentUser(user);
//       navigate(redirectTo, { replace: true });
//     } catch (error) {
//       setFormError(
//         error.message || 'Something went wrong. Please try again later.'
//       );
//     }
//   };

//   return (
//     <FormWrapper>
//       <div className='tabs'>
//         <button
//           className={activeTab === 'user' ? 'active' : ''}
//           onClick={() => handleClick('user')}
//         >
//           I am a user
//         </button>
//         <button
//           className={activeTab === 'venue' ? 'active' : ''}
//           onClick={() => handleClick('venue')}
//         >
//           I am a Venue Manager
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <h4>
//           {activeTab === 'user' ? 'User Sign Up' : 'Venue Manager Sign Up'}
//         </h4>
//         <div>
//           <label htmlFor='name'>Name:</label>
//           <input
//             type='text'
//             id='name'
//             name='name'
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder='Your name here'
//             required
//             ref={nameInput}
//           />
//         </div>
//         <div>
//           <label htmlFor='email'>Email:</label>
//           <input
//             type='email'
//             id='email'
//             name='email'
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder='Your email here'
//             required
//             ref={emailInput}
//           />
//         </div>
//         <div>
//           <label htmlFor='avatar'>Avatar:</label>
//           <input
//             type='url'
//             id='avatar'
//             name='avatar'
//             placeholder='https://example.com/image.jpg'
//             value={formData.avatar}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor='password'>Password:</label>
//           <input
//             type='password'
//             id='password'
//             name='password'
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder='********'
//             required
//             minLength='8'
//             ref={passwordInput}
//           />
//         </div>
//         <button type='submit'>Sign Up</button>
//       </form>
//       {formError && <p className='error'>{formError}</p>}
//     </FormWrapper>
//   );
// };

// export default SignUp;

//In src/components/Auth/Signup/index.js i have the following code:
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, registerVenueManager } from '../../../api/auth';
import { FormWrapper } from './SignUp.styles';
import { useGlobal } from '../../../contexts/GlobalContext';

const SignUp = () => {
  const { setCurrentUser } = useGlobal();
  const [activeTab, setActiveTab] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'name' && !isNameValid(value)) {
      nameInput.current.setCustomValidity(
        'Name must be no longer than 16 characters and can only contain alphanumeric characters and underscores'
      );
    } else {
      nameInput.current.setCustomValidity('');
    }

    emailInput.current.setCustomValidity('');
    passwordInput.current.setCustomValidity('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.name.length > 16) {
      setFormError('Name must be no longer than 16 characters');
      return;
    }

    if (activeTab === 'user') {
      handleRegister(
        event,
        setFormError,
        navigate,
        registerUser,
        '/user-dashboard',
        false
      );
    } else {
      handleRegister(
        event,
        setFormError,
        navigate,
        registerVenueManager,
        '/venue-manager-dashboard',
        true
      );
    }
  };

  const isNameValid = (name) => {
    const regex = /^[\w]+$/;
    return regex.test(name) && name.length <= 16;
  };

  const handleRegister = async (
    event,
    setFormError,
    navigate,
    registerFunction,
    redirectTo,
    venueManager
  ) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const user = await registerFunction(formData);
      user.venueManager = venueManager;
      setCurrentUser(user);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(
        error.message || 'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <div className='wrapper-center'>
      <FormWrapper>
        <div className='tabs'>
          <button
            className={activeTab === 'user' ? 'active' : ''}
            onClick={() => handleClick('user')}
          >
            I am a user
          </button>
          <button
            className={activeTab === 'venue' ? 'active' : ''}
            onClick={() => handleClick('venue')}
          >
            I am a Venue Manager
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h4>
            {activeTab === 'user' ? 'User Sign Up' : 'Venue Manager Sign Up'}
          </h4>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Your name here'
              required
              ref={nameInput}
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Your email here'
              required
              ref={emailInput}
            />
          </div>
          <div>
            <label htmlFor='avatar'>Avatar:</label>
            <input
              type='url'
              id='avatar'
              name='avatar'
              placeholder='https://example.com/image.jpg'
              value={formData.avatar}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='********'
              required
              minLength='8'
              ref={passwordInput}
            />
          </div>
          <button className='btn' type='submit'>
            Sign Up
          </button>
        </form>
        {formError && <p className='error'>{formError}</p>}
      </FormWrapper>
    </div>
  );
};

export default SignUp;
