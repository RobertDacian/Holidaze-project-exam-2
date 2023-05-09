// // In src/api/venues/index.js i have the following code:
// import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

// const sendRequest = async (endpoint) => {
//   try {
//     const url = `${API_BASE_URL}${endpoint}`;
//     console.log('Requesting:', url);
//     const response = await fetch(url);
//     const responseData = await response.json();

//     if (!response.ok) {
//       const errorMessage =
//         responseData.errors && responseData.errors.length
//           ? responseData.errors[0].message
//           : responseData.message || 'Something went wrong';
//       throw new Error(errorMessage);
//     }

//     return responseData;
//   } catch (error) {
//     console.log('Error:', error);
//     throw error;
//   }
// };

// export const fetchVenues = async () => {
//   return await sendRequest(API_VENUES);
// };

// export const fetchVenueDetails = async (venueId) => {
//   const endpoint = API_VENUE.replace(':id', venueId);
//   return await sendRequest(endpoint);
// };

// In src/api/venues/index.js i have the following code:
import { API_BASE_URL, API_VENUES } from '../../constants/constants';

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

export const fetchVenues = async () => {
  return await sendRequest(API_VENUES);
};

// export const fetchVenueDetails = async (venueId) => {
//   const endpoint =
//     API_VENUE.replace(':id', venueId) + '?_owner=true&_bookings=true';
//   return await sendRequest(endpoint);
// };

export const fetchVenueDetails = async (venueId, token, queryParams = {}) => {
  const url = new URL(
    `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`
  );
  if (queryParams._owner) {
    url.searchParams.append('_owner', 'true');
  }
  if (queryParams._bookings) {
    url.searchParams.append('_bookings', 'true');
  }
  console.log('Fetching venue details for venue ID:', venueId);
  console.log('Fetching venue details URL:', url.toString());
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Response from fetching venue details:', response);

  if (!response.ok) {
    throw new Error('Error fetching venue details');
  }

  return response.json();
};
