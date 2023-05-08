// In src/api/booking/index.js i have the following code:
import {
  API_BASE_URL,
  API_BOOKINGS,
  API_BOOKING,
} from '../../constants/constants';

const sendRequest = async (url, method, body = null, token = null) => {
  try {
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

    console.log('Request URL:', url);
    console.log('Request options:', options);

    const response = await fetch(url, options);

    if (!response.ok) {
      const responseData = await response.json();
      console.log('Response:', response);
      console.log('Response data:', responseData);
      throw new Error(`Error: ${responseData.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchUserBookings = async (profileName, token) => {
  const url = `${API_BASE_URL}/holidaze/profiles/${profileName}/bookings`;

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log('API response:', response);

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch bookings.');
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchBookingById = async (id, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
};

export const createBooking = async (bookingData, token) => {
  // Validate the booking object
  if (!bookingData.dateFrom) {
    throw new Error('dateFrom is required');
  }

  try {
    const url = `${API_BASE_URL}${API_BOOKINGS}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...bookingData,
        dateFrom:
          bookingData.dateFrom instanceof Date
            ? bookingData.dateFrom.toISOString().split('T')[0]
            : null,
      }),
    };

    console.log('Requesting:', url);
    const response = await fetch(url, options);
    const responseData = await response.json();

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
