import {
  API_BASE_URL,
  API_AUTH_REGISTER,
  API_AUTH_VENUE_MANAGER_REGISTER,
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

  console.log('Request URL:', `${API_BASE_URL}${endpoint}`);
  console.log('Request options:', requestOptions);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    const responseData = await response.json();

    console.log('Response:', response);
    console.log('Response data:', responseData);

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
export const registerUser = async (formData) => {
  const email = formData.get('email');
  const existingUserEmails = JSON.parse(
    localStorage.getItem('existingUserEmails') || '[]'
  );

  if (existingUserEmails.includes(email)) {
    throw new Error('A profile with this email already exists.');
  }

  const body = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    avatar: formData.get('avatar'),
  };

  const response = await sendRequest(API_AUTH_REGISTER, 'POST', body);

  existingUserEmails.push(email);
  localStorage.setItem(
    'existingUserEmails',
    JSON.stringify(existingUserEmails)
  );

  const user = {
    ...response,
    venueManager: false,
  };
  return user;
};

// Register VenueManagerFunction
export const registerVenueManager = async (formData) => {
  const email = formData.get('email');
  const existingVenueManagerEmails = JSON.parse(
    localStorage.getItem('existingVenueManagerEmails') || '[]'
  );

  if (existingVenueManagerEmails.includes(email)) {
    throw new Error('A profile with this email already exists.');
  }

  const body = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    avatar: formData.get('avatar'),
    venueManager: true,
  };

  const response = await sendRequest(
    API_AUTH_VENUE_MANAGER_REGISTER,
    'POST',
    body
  );

  existingVenueManagerEmails.push(email);
  localStorage.setItem(
    'existingVenueManagerEmails',
    JSON.stringify(existingVenueManagerEmails)
  );

  const venueManager = {
    ...response,
  };
  return venueManager;
};

export const login = async (
  email,
  password,
  isVenueManager,
  setCurrentUser
) => {
  const existingEmailsKey = isVenueManager
    ? 'existingVenueManagerEmails'
    : 'existingUserEmails';

  const existingEmails = JSON.parse(
    localStorage.getItem(existingEmailsKey) || '[]'
  );

  if (!existingEmails.includes(email)) {
    throw new Error(
      isVenueManager
        ? 'A venue manager profile with this email does not exist.'
        : 'A user profile with this email does not exist.'
    );
  }

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

    if (responseEmail !== email) {
      throw new Error('Server response does not match login credentials');
    }

    const userData = { name, email, avatar, venueManager };
    localStorage.setItem('accessToken', accessToken);

    console.log('Logged in user:', userData);
    setCurrentUser(userData);

    return userData;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid email or password.');
  }
};
