import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

// Helper function to send API requests
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

export const fetchVenueDetails = async (venueId, token = null, apiKey = null) => {
  try {
    // Log the venueId to ensure it's correct
    console.log('Fetching details for venueId:', venueId);

    const endpoint = API_VENUE.replace(':id', venueId);
    console.log('Using endpoint:', endpoint); // Debugging the URL

    const result = await sendRequest(endpoint, 'GET', null, token, apiKey);
    console.log('Fetched venue details:', result); // Log the fetched details
    return result;
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};
