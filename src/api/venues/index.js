// In src/api/venues/index.js i have the following code:
import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

const sendRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  token = null
) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    // console.log('Requesting:', url);
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

export const fetchVenueDetails = async (venueId, token) => {
  return await sendRequest(
    API_VENUE.replace(':id', venueId),
    'GET',
    null,
    token
  );
};

export const createVenue = async (venueData, token) => {
  return await sendRequest(API_VENUES, 'POST', venueData, token);
};

export const updateVenue = async (venueId, updatedVenueData, token) => {
  return await sendRequest(
    API_VENUE.replace(':id', venueId),
    'PUT',
    updatedVenueData,
    token
  );
};

export const deleteVenue = async (venueId, token) => {
  return await sendRequest(
    API_VENUE.replace(':id', venueId),
    'DELETE',
    null,
    token
  );
};

export const fetchVenues = async (token) => {
  return await sendRequest(API_VENUES, 'GET', null, token);
};
