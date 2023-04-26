import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

const sendRequest = async (endpoint) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Requesting:', url);
    const response = await fetch(url);
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

export const fetchVenues = async () => {
  return await sendRequest(API_VENUES);
};

export const fetchVenueDetails = async (venueId) => {
  const endpoint = API_VENUE.replace(':id', venueId);
  return await sendRequest(endpoint);
};
