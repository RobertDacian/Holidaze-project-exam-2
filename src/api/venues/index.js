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
    headers.Authorization = `Bearer ${token}`;
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

// Fetch all venues
export const fetchVenues = async (token = null, apiKey = null) => {
  try {
    return await sendRequest(API_VENUES, 'GET', null, token, apiKey);
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

// Fetch venue details
export const fetchVenueDetails = async (venueId, token = null, apiKey = null) => {
  try {
    const endpoint = API_VENUE.replace(':id', venueId);
    return await sendRequest(endpoint, 'GET', null, token, apiKey);
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};

// Create a new venue
export const createVenue = async (venueData, token, apiKey) => {
  try {
    return await sendRequest(API_VENUES, 'POST', venueData, token, apiKey);
  } catch (error) {
    console.error('Error creating venue:', error);
    throw error;
  }
};

// Update an existing venue
export const updateVenue = async (venueId, updatedVenueData, token, apiKey) => {
  try {
    const endpoint = API_VENUE.replace(':id', venueId);
    return await sendRequest(endpoint, 'PUT', updatedVenueData, token, apiKey);
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error;
  }
};

// Delete a venue
export const deleteVenue = async (venueId, token, apiKey) => {
  try {
    const endpoint = API_VENUE.replace(':id', venueId);
    return await sendRequest(endpoint, 'DELETE', null, token, apiKey);
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw error;
  }
};
