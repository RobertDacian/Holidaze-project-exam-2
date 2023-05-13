// src/api/booking/index.js
import {
  API_BASE_URL,
  API_BOOKING,
  API_BOOKINGS,
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
  const responseData = await response.json();

  // console.log(`Response from ${method} method on ${url}:`, responseData);

  if (!response.ok) {
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return responseData;
};

// export const fetchUserBookings = async (user, token) => {
//   if (!user || !user.name) {
//     throw new Error('User or user name is missing');
//   }

//   const url = new URL(
//     `${API_BASE_URL}/holidaze/profiles/${user.name}/bookings`
//   );

//   // Add _customer and _venue query parameters
//   url.searchParams.append('_customer', 'true');
//   url.searchParams.append('_venue', 'true');

//   const requestOptions = {
//     method: 'GET',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }),
//   };

//   try {
//     const response = await fetch(url.toString(), requestOptions);

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || 'Could not fetch bookings.');
//     }

//     const data = await response.json();
//     return data; // it should already be an array of bookings
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     throw error;
//   }
// };

export const fetchUserBookings = async (user, token) => {
  if (!user || !user.name) {
    throw new Error('User or user name is missing');
  }

  const url = new URL(
    `${API_BASE_URL}/holidaze/profiles/${user.name}/bookings`
  );

  url.searchParams.append('_customer', 'true');
  url.searchParams.append('_venue', 'true');

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const response = await fetch(url.toString(), requestOptions);

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

export const fetchBookingById = async (bookingId, token, queryParams = {}) => {
  const url = new URL(
    `${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`
  );
  if (queryParams._venue) {
    url.searchParams.append('_venue', 'true');
  }
  if (queryParams._customer) {
    url.searchParams.append('_customer', 'true');
  }

  return await sendRequest(url.toString(), 'GET', null, token);
};

export const createBooking = async (bookingData, token) => {
  if (
    !(
      Object.prototype.toString.call(bookingData.dateFrom) ===
        '[object Date]' &&
      Object.prototype.toString.call(bookingData.dateTo) === '[object Date]'
    )
  ) {
    throw new Error('dateFrom and dateTo should be instances of Date');
  }

  const transformedData = {
    ...bookingData,
    dateFrom: bookingData.dateFrom.toISOString().split('T')[0],
    dateTo: bookingData.dateTo.toISOString().split('T')[0],
    venueId: bookingData.venueId,
  };

  const url = `${API_BASE_URL}${API_BOOKINGS}`;

  return await sendRequest(url, 'POST', transformedData, token);
};

export const updateBooking = async (bookingId, updatedBookingData, token) => {
  const url = `${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`;

  return await sendRequest(url, 'PUT', updatedBookingData, token);
};

export const deleteBooking = async (bookingId, token) => {
  const url = `${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`;

  return await sendRequest(url, 'DELETE', null, token);
};

// export const fetchAllBookings = async (token) => {
//   const url = `${API_BASE_URL}${API_BOOKINGS}`;

//   return await sendRequest(url, 'GET', null, token);
// };
