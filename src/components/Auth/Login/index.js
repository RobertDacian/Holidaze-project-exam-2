import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';
import { FormWrapper } from '../../../components/Auth/Signup/SignUp.styles';
import { useGlobal } from '../../../contexts/GlobalContext';
import { API_KEY } from '../../../constants/constants';

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
        setCurrentUser,
        API_KEY
      );

      if (user.status === 'error') {
        console.log(user.message);
        setFormError(user.message);
        return;
      }

      navigate(user.venueManager ? '/venues' : '/venues', { replace: true });
    } catch (error) {
      console.log(error.message);
      setFormError(
        error.message || 'Something went wrong. Please try again later.'
      );
    }
  };

  return (
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

      <form onSubmit={handleSubmit}>
        <h4>{activeTab === 'user' ? 'User Log In' : 'Venue Manager Log In'}</h4>
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
  );
};

export default LogIn;
