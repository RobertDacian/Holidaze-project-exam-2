// In src/api/booking/index.js i have the following code:
import {
  API_BASE_URL,
  API_BOOKINGS,
  API_BOOKING,
} from '../../constants/constants';
const sendRequest = async (url, method, body = null, token = null) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  console.log('Response from fetching user bookings:', response);

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(`Error: ${responseData.status}`);
  }

  return response.json();
};

export const fetchUserBookings = async (user, token, venueManager) => {
  const userType = venueManager ? 'venueManager' : 'profiles';
  const url = `https://api.noroff.dev/api/v1/holidaze/${userType}/${user.name}/bookings?_bookings=true`;

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not fetch bookings.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// bookingsAPI.js
export const fetchBookingById = async (id, token, queryParams = {}) => {
  const url = new URL(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}`);
  if (queryParams._venue) {
    url.searchParams.append('_venue', 'true');
  }
  if (queryParams._customer) {
    url.searchParams.append('_customer', 'true');
  }
  console.log('Fetching booking by ID URL:', url.toString());
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Response from fetching booking by ID:', response);

  if (!response.ok) {
    throw new Error('Error fetching booking by ID');
  }

  return response.json();
};

export const createBooking = async (bookingData, token) => {
  const transformedDateFrom =
    bookingData.dateFrom instanceof Date
      ? bookingData.dateFrom.toISOString().split('T')[0]
      : null;

  if (!transformedDateFrom) {
    throw new Error('dateFrom is required');
  }
  console.log('Creating booking with data:', bookingData);

  const url = `https://api.noroff.dev/api/v1
/holidaze/bookings`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...bookingData,
      dateFrom: transformedDateFrom,
    }),
  };

  const response = await fetch(url, options);
  const responseData = await response.json();
  console.log('Response from creating booking:', response);
  if (!response.ok) {
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return responseData;
};

export const updateBooking = async (bookingId, updatedBookingData, token) => {
  const endpoint = API_BOOKING.replace(':id', bookingId);
  return await sendRequest(
    `${API_BASE_URL}${endpoint}`,
    'PUT',
    updatedBookingData,
    token
  );
};

export const deleteBooking = async (bookingId, token) => {
  const endpoint = API_BOOKINGS + '/' + bookingId;
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

  return response.status;
};

// // In src/api/booking/index.js i have the following code:
// import {
//   API_BASE_URL,
//   API_BOOKINGS,
//   API_BOOKING,
// } from '../../constants/constants';

// const sendRequest = async (url, method, body = null, token = null) => {
//   try {
//     const headers = new Headers({
//       'Content-Type': 'application/json',
//     });

//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`);
//     }

//     const options = {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : null,
//     };

//     console.log('Request URL:', url);
//     console.log('Request options:', options);

//     const response = await fetch(url, options);

//     if (!response.ok) {
//       const responseData = await response.json();
//       console.log('Response:', response);
//       console.log('Response data:', responseData);
//       throw new Error(`Error: ${responseData.status}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // src/api/bookings/index.js

// export const fetchUserBookings = async (profileName, token) => {
//   const url = `${API_BASE_URL}/holidaze/profiles/${profileName}/bookings`;

//   const requestOptions = {
//     method: 'GET',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       'x-access-token': token,
//     }),
//   };

//   const response = await fetch(url, requestOptions);
//   const data = await response.json();

//   console.log('API response:', response);

//   if (!response.ok) {
//     throw new Error(data.message || 'Could not fetch bookings.');
//   }

//   return data;
// };

// // export const fetchBookingById = async (bookingId, token) => {
// //   const endpoint = API_BOOKING.replace(':id', bookingId);
// //   return await sendRequest(`${API_BASE_URL}${endpoint}`, 'GET', null, token);
// // };

// export const createBooking = async (bookingData, currentUser, venueId) => {
//   const body = {
//     ...bookingData,
//     venueId,
//     customerId: currentUser.id,
//   };

//   return await sendRequest(
//     `${API_BASE_URL}${API_BOOKINGS}`,
//     'POST',
//     body,
//     currentUser.token
//   );
// };
// export const updateBooking = async (bookingId, updatedBookingData, token) => {
//   const endpoint = API_BOOKING.replace(':id', bookingId);
//   return await sendRequest(
//     `${API_BASE_URL}${endpoint}`,
//     'PUT',
//     updatedBookingData,
//     token
//   );
// };

// export const deleteBooking = async (bookingId, token) => {
//   const endpoint = API_BOOKINGS + '/' + bookingId;
//   const url = `${API_BASE_URL}${endpoint}`;
//   const options = {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
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

//   return response.status;
// };
