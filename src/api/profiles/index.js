// //In src/api/profiles/index.js i have the following code:
// import {
//   API_BASE_URL,
//   API_PROFILES,
//   API_PROFILE,
//   API_PROFILE_MEDIA,
//   API_PROFILE_BOOKINGS,
//   API_PROFILE_VENUES,
// } from '../../constants/constants';

// const sendRequest = async (endpoint, token) => {
//   const url = `${API_BASE_URL}${endpoint}`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   };

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     const responseData = await response.json();
//     const errorMessage =
//       responseData.errors && responseData.errors.length
//         ? responseData.errors[0].message
//         : responseData.message || 'Something went wrong';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const fetchProfiles = async () => {
//   return await sendRequest(API_PROFILES);
// };

// export const fetchProfileByName = async (name) => {
//   const endpoint = API_PROFILE.replace(':name', name);
//   return await sendRequest(endpoint);
// };

// export const updateProfileMedia = async (name, avatarUrl, token) => {
//   const endpoint = API_PROFILE_MEDIA.replace(':name', name);
//   const requestOptions = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ avatar: avatarUrl }),
//   };

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
//   const responseData = await response.json();

//   if (!response.ok) {
//     const errorMessage =
//       responseData.errors && responseData.errors.length
//         ? responseData.errors[0].message
//         : responseData.message || 'Something went wrong';
//     throw new Error(errorMessage);
//   }

//   return responseData;
// };
// export const fetchProfileBookings = async (name, token) => {
//   const endpoint = API_PROFILE_BOOKINGS.replace(':name', name);
//   return await sendRequest(endpoint, token);
// };

// export const fetchProfileVenues = async (name, token) => {
//   const endpoint = API_PROFILE_VENUES.replace(':name', name);
//   return await sendRequest(endpoint, token);
// };

// export const updateProfile = async (name, userData, token) => {
//   const endpoint = API_PROFILE.replace(':name', name);
//   const url = `${API_BASE_URL}${endpoint}`;

//   const response = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     const responseData = await response.json();
//     const errorMessage =
//       responseData.errors && responseData.errors.length
//         ? responseData.errors[0].message
//         : responseData.message || 'Something went wrong';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

//In src/api/profiles/index.js i have the following code:
import {
  API_BASE_URL,
  API_PROFILES,
  API_PROFILE,
  API_PROFILE_MEDIA,
  // API_PROFILE_BOOKINGS,
  API_PROFILE_VENUES,
} from '../../constants/constants';

const sendRequest = async (endpoint, token) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

export async function fetchProfiles() {
  return await sendRequest(API_PROFILES);
}

export const fetchProfileByName = async (name) => {
  const endpoint = API_PROFILE.replace(':name', name);
  return await sendRequest(endpoint);
};

export const updateProfileMedia = async (name, avatarUrl, token) => {
  const endpoint = API_PROFILE_MEDIA.replace(':name', name);
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar: avatarUrl }),
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

export const fetchProfileVenues = async (name, token) => {
  const endpoint = API_PROFILE_VENUES.replace(':name', name);
  return await sendRequest(endpoint, token);
};

export const updateProfile = async (name, userData, token) => {
  const endpoint = API_PROFILE.replace(':name', name);
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
