import {
  API_BASE_URL,
  API_BOOKINGS,
  API_BOOKING,
} from '../../constants/constants';
// import { useGlobal } from '../../contexts/GlobalContext';

const sendRequest = async (endpoint, token) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Requesting:', url);
    const response = await fetch(url, {
      headers:
        token && token !== 'undefined'
          ? { Authorization: `Bearer ${token}` }
          : {},
    });
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

export const fetchBookings = async (venueId, token) => {
  const endpoint = API_BOOKINGS + '?_venue=true&venue.id=' + venueId;
  return await sendRequest(endpoint, token);
};

export const fetchBookingById = async (bookingId, token) => {
  const endpoint =
    API_BOOKING.replace(':id', bookingId) + '?_venue=true&_customer=true';
  return await sendRequest(endpoint, token);
};

export const createBooking = async (bookingData, currentUser) => {
  const url = `${API_BASE_URL}${API_BOOKINGS}`;
  const { dateFrom, dateTo, guests } = bookingData;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`, // Ensure currentUser has a token property
    },
    body: JSON.stringify({
      dateFrom: new Date(dateFrom).toISOString(),
      dateTo: new Date(dateTo).toISOString(),
      guests,
      customerId: currentUser.id,
      venueId: bookingData.venueId,
    }),
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
