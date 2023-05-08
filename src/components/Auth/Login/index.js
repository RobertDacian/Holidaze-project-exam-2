// //In src/components/Auth/Login/index.js i have the following code:
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../../../api/auth';
// import { FormWrapper } from '../../../components/Auth/Signup/SignUp.styles';
// import { useGlobal } from '../../../contexts/GlobalContext';

// const LogIn = () => {
//   const { setCurrentUser } = useGlobal();
//   const [activeTab, setActiveTab] = useState('user');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   const [formError, setFormError] = useState(null);

//   const handleClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const isVenueManager = activeTab === 'venue';
//       const user = await login(
//         formData.email,
//         formData.password,
//         isVenueManager,
//         setCurrentUser
//       );

//       if (user.venueManager !== isVenueManager) {
//         setFormError(
//           isVenueManager
//             ? 'Please log in as a Venue Manager.'
//             : 'Please log in as a User.'
//         );
//         return;
//       }
//       // console.log('Logged in user:', user);
//       // console.log('User data set to currentUser:', user);
//       navigate(
//         user.venueManager ? '/venue-manager-dashboard' : '/user-dashboard',
//         { replace: true }
//       );
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
//         <h4>{activeTab === 'user' ? 'User Log In' : 'Venue Manager Log In'}</h4>
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
//           />
//         </div>
//         <button type='submit'>Log In</button>
//       </form>
//       {formError && <p className='error'>{formError}</p>}
//     </FormWrapper>
//   );
// };

// export default LogIn;
//In src/components/Auth/Login/index.js i have the following code:
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';
import { FormWrapper } from '../../../components/Auth/Signup/SignUp.styles';
import { useGlobal } from '../../../contexts/GlobalContext';

const LogIn = () => {
  const { setCurrentUser } = useGlobal();
  const [activeTab, setActiveTab] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const isVenueManager = activeTab === 'venue';
      const user = await login(
        formData.email,
        formData.password,
        isVenueManager,
        setCurrentUser
      );

      if (user.venueManager !== isVenueManager) {
        setFormError(
          isVenueManager
            ? 'Please log in as a Venue Manager.'
            : 'Please log in as a User.'
        );
        return;
      }
      // console.log('Logged in user:', user);
      // console.log('User data set to currentUser:', user);
      navigate(
        user.venueManager ? '/venue-manager-dashboard' : '/user-dashboard',
        { replace: true }
      );
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
            {activeTab === 'user' ? 'User Log In' : 'Venue Manager Log In'}
          </h4>
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
            />
          </div>
          <button className='btn' type='submit'>
            Log In
          </button>
        </form>
        {formError && <p className='error'>{formError}</p>}
      </FormWrapper>
    </div>
  );
};

export default LogIn;
