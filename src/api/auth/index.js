import {
  API_BASE_URL,
  API_AUTH_REGISTER,
  API_AUTH_LOGIN,
} from '../../constants/constants';

const sendRequest = async (endpoint, method, body = null, token = null) => {
  const headers = new Headers();

  if (!(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestOptions = {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
  };

  // console.log('Request URL:', `${API_BASE_URL}${endpoint}`);
  // console.log('Request options:', requestOptions);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    const responseData = await response.json();

    // console.log('Response:', response);
    // console.log('Response data:', responseData);

    if (!response.ok) {
      const errorMessage =
        responseData.errors && responseData.errors.length
          ? responseData.errors[0].message
          : responseData.message || 'Something went wrong';
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

// Register User Function
export const registerUser = async (data, isVenueManager) => {
  const { name, email, password, avatar } = data;
  const body = {
    name,
    email,
    password,
    avatar,
    venueManager: isVenueManager,
  };

  const response = await sendRequest(API_AUTH_REGISTER, 'POST', body);

  const existingUserEmails = JSON.parse(
    localStorage.getItem('existingUserEmails') || '[]'
  );
  const existingVenueManagerEmails = JSON.parse(
    localStorage.getItem('existingVenueManagerEmails') || '[]'
  );

  if (isVenueManager) {
    existingVenueManagerEmails.push(response.email);
    localStorage.setItem(
      'existingVenueManagerEmails',
      JSON.stringify(existingVenueManagerEmails)
    );
  } else {
    existingUserEmails.push(response.email);
    localStorage.setItem(
      'existingUserEmails',
      JSON.stringify(existingUserEmails)
    );
  }

  const userData = {
    name: response.name,
    email: response.email,
    avatar: response.avatar,
    venueManager: response.venueManager,
    token: response.accessToken,
  };

  localStorage.setItem('currentUser', JSON.stringify(userData));

  return userData;
};

export const login = async (
  email,
  password,
  isVenueManager,
  setCurrentUser
) => {
  try {
    const response = await sendRequest(API_AUTH_LOGIN, 'POST', {
      email,
      password,
      venueManager: isVenueManager,
    });

    const {
      name,
      email: responseEmail,
      avatar,
      venueManager,
      accessToken,
    } = response;

    if (responseEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
      throw new Error('Server response does not match login credentials');
    }

    if (venueManager !== isVenueManager) {
      return {
        status: 'error',
        message: `Please log in as a ${
          isVenueManager ? 'User' : 'Venue Manager'
        }.`,
      };
    }

    const userData = { name, email, avatar, venueManager, token: accessToken };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    // console.log('Logged in user:', userData);
    setCurrentUser(userData);

    return userData;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid email or password.');
  }
};
