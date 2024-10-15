
import {
  API_BASE_URL,
  API_AUTH_REGISTER,
  API_AUTH_LOGIN,
  API_KEY_CREATE,
} from '../../constants/constants';

const sendRequest = async (endpoint, method, body = null, token = null, apiKey = null) => {
  const headers = new Headers();

  if (!(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (apiKey) {
    headers.append('X-Noroff-API-Key', apiKey);
  }

  const requestOptions = {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.errors?.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Register User Function
export const registerUser = async (data, isVenueManager, apiKey) => {
  const { name, email, password, avatar } = data;
  const body = {
    name,
    email,
    password,
    avatar: { url: avatar.url, alt: avatar.alt }, // Updated media model
    venueManager: isVenueManager,
  };

  const response = await sendRequest(API_AUTH_REGISTER, 'POST', body, null, apiKey);

  const userData = {
    name: response.data.name,
    email: response.data.email,
    avatar: response.data.avatar,
    venueManager: response.data.venueManager,
    token: response.data.accessToken,
  };

  localStorage.setItem('currentUser', JSON.stringify(userData));

  return userData;
};

// Login Function
export const login = async (email, password, isVenueManager, setCurrentUser, apiKey) => {
  try {
    const response = await sendRequest(API_AUTH_LOGIN, 'POST', {
      email,
      password,
      venueManager: isVenueManager,
    }, null, apiKey);

    const { name, email: responseEmail, avatar, venueManager, accessToken } = response.data;

    if (responseEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
      throw new Error('Server response does not match login credentials');
    }

    const userData = { name, email: responseEmail, avatar, venueManager, token: accessToken };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    setCurrentUser(userData);

    return userData;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid email or password.');
  }
};

