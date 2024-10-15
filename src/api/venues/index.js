import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

const sendRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  token = null,
  apiKey = null
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Handle non-JSON responses gracefully
  if (response.status === 204) {
    return {}; // No content
  }

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

// Fetch venue details by ID
export const fetchVenueDetails = async (venueId, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'GET', null, token, apiKey);
};

// Create a new venue
export const createVenue = async (venueData, token, apiKey) => {
  return await sendRequest(API_VENUES, 'POST', venueData, token, apiKey);
};

// Update an existing venue
export const updateVenue = async (venueId, updatedVenueData, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'PUT', updatedVenueData, token, apiKey);
};

// Delete a venue by ID
export const deleteVenue = async (venueId, token, apiKey) => {
  return await sendRequest(API_VENUE.replace(':id', venueId), 'DELETE', null, token, apiKey);
};

// Fetch all venues
export const fetchVenues = async (token, apiKey) => {
  return await sendRequest(API_VENUES, 'GET', null, token, apiKey);
};


