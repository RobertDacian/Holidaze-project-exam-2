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

export const fetchVenueDetails = async (venueId) => {
  const endpoint = API_VENUE.replace(':id', venueId);
  return await sendRequest(endpoint);
};

const createVenue = async (venueData) => {
  try {
    const response = await fetch('/holidaze/venues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData),
    });
    const createdVenue = await response.json();
    console.log(createdVenue);
  } catch (error) {
    console.error('Error creating venue:', error);
  }
};

const newVenueData = {
  name: 'Venue Name',
  description: 'Venue Description',
  media: ['https://example.com/image.jpg'],
  price: 100,
  maxGuests: 50,
  rating: 4.5,
  meta: {
    wifi: true,
    parking: true,
    breakfast: true,
    pets: false,
  },
  location: {
    address: '123 Main St',
    city: 'New York',
    zip: '10001',
    country: 'USA',
    continent: 'North America',
    lat: 40.7128,
    lng: -74.006,
  },
};

createVenue(newVenueData);
