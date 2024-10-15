import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, login } from '../../../api/auth';
import { FormWrapper } from './SignUp.styles';
import { useGlobal } from '../../../contexts/GlobalContext';
import { API_KEY } from '../../../constants/constants';

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

  const isNameValid = (name) => {
    const regex = /^[\w]+$/;
    return regex.test(name) && name.length <= 16;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const isVenueManager = activeTab === 'venue';
    try {
      const user = await registerUser(formData, isVenueManager, API_KEY);  // Pass API key here

      const loggedInUser = await login(
        formData.email,
        formData.password,
        isVenueManager,
        setCurrentUser,
        API_KEY 
      );
      setCurrentUser(loggedInUser);

      navigate(user.venueManager ? '/venues' : '/venues', {
        replace: true,
      });
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
            User
          </button>
          <button
            className={activeTab === 'venue' ? 'active' : ''}
            onClick={() => handleClick('venue')}
          >
            Venue Manager
          </button>
        </div>

        <form onSubmit={handleRegister}>
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
