import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

const sendRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  token = null,
  apiKey = null
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,  // Include API key
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

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
};

export const fetchVenueDetails = async (venueId, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'GET', null, token, apiKey);
};

export const createVenue = async (venueData, token, apiKey) => {
  return await sendRequest(API_VENUES, 'POST', venueData, token, apiKey);
};

export const updateVenue = async (venueId, updatedVenueData, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'PUT', updatedVenueData, token, apiKey);
};

export const deleteVenue = async (venueId, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'DELETE', null, token, apiKey);
};

export const fetchVenues = async (token, apiKey) => {
  return await sendRequest(API_VENUES, 'GET', null, token, apiKey);
};

