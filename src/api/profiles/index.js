import {
  API_BASE_URL,
  API_PROFILES,
  API_PROFILE,
  API_PROFILE_MEDIA,
  API_PROFILE_BOOKINGS,
  API_PROFILE_VENUES,
} from '../../constants/constants';

const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/150';  // Placeholder avatar

const sendRequest = async (endpoint, token, apiKey) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,  // Include API key
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const responseData = await response.json();
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const fetchProfiles = async (apiKey) => {
  return await sendRequest(API_PROFILES, null, apiKey);
};

export const fetchProfileByName = async (name, apiKey) => {
  const endpoint = API_PROFILE.replace(':name', name);
  return await sendRequest(endpoint, null, apiKey);
};

export const updateProfileMedia = async (
  name,
  avatarUrl,
  token,
  apiKey,
  isVenueManager = false
) => {
  const endpoint = API_PROFILE_MEDIA.replace(':name', name);

  // If avatarUrl is missing or null, set it to the default placeholder
  const finalAvatarUrl = avatarUrl || DEFAULT_AVATAR_URL;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify({ avatar: finalAvatarUrl, venueManager: isVenueManager }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return responseData;
};

export const fetchProfileBookings = async (name, token, apiKey) => {
  const endpoint = API_PROFILE_BOOKINGS.replace(':name', name);
  return await sendRequest(endpoint, token, apiKey);
};

export const fetchProfileVenues = async (name, token, apiKey) => {
  const endpoint = API_PROFILE_VENUES.replace(':name', name);
  return await sendRequest(endpoint, token, apiKey);
};

export const updateProfile = async (name, userData, token, apiKey) => {
  const endpoint = API_PROFILE.replace(':name', name);
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const responseData = await response.json();
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return await response.json();
};
