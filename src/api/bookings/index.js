import {
  API_BASE_URL,
  API_BOOKING,
  API_BOOKINGS,
} from '../../constants/constants';

const sendRequest = async (url, method, body = null, token = null, apiKey = null) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,  // Include API key
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  const responseData = response.status === 204 ? {} : await response.json();

  if (!response.ok) {
    const errorMessage =
      responseData.errors && responseData.errors.length
        ? responseData.errors[0].message
        : responseData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return responseData;
};

export const fetchUserBookings = async (user, token, apiKey) => {
  if (!user || !user.name) {
    throw new Error('User or user name is missing');
  }

  const url = new URL(`${API_BASE_URL}/profiles/${user.name}/bookings`);
  url.searchParams.append('_customer', 'true');
  url.searchParams.append('_venue', 'true');

  return await sendRequest(url.toString(), 'GET', null, token, apiKey);
};

export const fetchBookingById = async (bookingId, token, apiKey, queryParams = {}) => {
  const url = new URL(`${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`);
  if (queryParams._venue) {
    url.searchParams.append('_venue', 'true');
  }
  if (queryParams._customer) {
    url.searchParams.append('_customer', 'true');
  }

  return await sendRequest(url.toString(), 'GET', null, token, apiKey);
};

export const createBooking = async (bookingData, token, apiKey) => {
  if (
    !(
      Object.prototype.toString.call(bookingData.dateFrom) === '[object Date]' &&
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

  return await sendRequest(url, 'POST', transformedData, token, apiKey);
};

export const updateBooking = async (bookingId, updatedBookingData, token, apiKey) => {
  const url = `${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`;

  return await sendRequest(url, 'PUT', updatedBookingData, token, apiKey);
};

export const deleteBooking = async (bookingId, token, apiKey) => {
  const url = `${API_BASE_URL}${API_BOOKING.replace(':id', bookingId)}`;

  return await sendRequest(url, 'DELETE', null, token, apiKey);
};

