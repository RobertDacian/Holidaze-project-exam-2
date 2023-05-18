// // In src/api/venues/index.js i have the following code:
// import { API_BASE_URL, API_VENUES, API_VENUE } from '../../constants/constants';

// const sendRequest = async (
//   endpoint,
//   method = 'GET',
//   body = null,
//   token = null
// ) => {
//   try {
//     const url = `${API_BASE_URL}${endpoint}`;
//     const options = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     if (token) {
//       options.headers.Authorization = `Bearer ${token}`;
//     }

//     if (body) {
//       options.body = JSON.stringify(body);
//     }

//     // console.log('Requesting:', url);
//     const response = await fetch(url, options);
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

// export const fetchVenueDetails = async (venueId, token) => {
//   return await sendRequest(
//     API_VENUE.replace(':id', venueId),
//     'GET',
//     null,
//     token
//   );
// };

// export const fetchVenuesByProfile = async (user, token) => {
//   if (!user || !user.name) {
//     throw new Error('User or user name is missing');
//   }
//   const url = new URL(`${API_BASE_URL}/holidaze/profiles/${user.name}/venues`);
//   url.searchParams.append('_venues', 'true');

//   const requestOptions = {
//     method: 'GET',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }),
//   };

//   try {
//     const response = await fetch(url.toString(), requestOptions);

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || 'Could not fetch venues.');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     throw error;
//   }
// };

// export const createVenue = async (venueData, token) => {
//   const url = `${API_BASE_URL}/holidaze/venues`;
//   const requestOptions = {
//     method: 'POST',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }),
//     body: JSON.stringify(venueData),
//   };

//   try {
//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || 'Could not create venue.');
//     }

//     const newVenue = await response.json();

//     return newVenue;
//   } catch (error) {
//     console.error('Error creating venue:', error);
//     throw error;
//   }
// };

// export const updateVenue = async (venueId, updatedVenueData, token) => {
//   const url = `${API_BASE_URL}/holidaze/venues/${venueId}`;
//   const requestOptions = {
//     method: 'PUT',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }),
//     body: JSON.stringify(updatedVenueData),
//   };

//   try {
//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || 'Could not update venue.');
//     }

//     return true;
//   } catch (error) {
//     console.error('Error updating venue:', error);
//     throw error;
//   }
// };

// export const deleteVenue = async (venueId, token) => {
//   const url = `${API_BASE_URL}/holidaze/venues/${venueId}`;
//   const requestOptions = {
//     method: 'DELETE',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }),
//   };

//   try {
//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || 'Could not delete venue.');
//     }

//     return true;
//   } catch (error) {
//     console.error('Error deleting venue:', error);
//     throw error;
//   }
// };

// export const fetchVenues = async (token) => {
//   return await sendRequest(API_VENUES, 'GET', null, token);
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

export const fetchVenuesByProfile = async (user, token) => {
  if (!user || !user.name) {
    throw new Error('User or user name is missing');
  }
  const url = new URL(`${API_BASE_URL}/holidaze/profiles/${user.name}/venues`);
  url.searchParams.append('_venues', 'true');

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not fetch venues.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const createVenue = async (venueData, token) => {
  const url = `${API_BASE_URL}/holidaze/venues`;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(venueData),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not create venue.');
    }

    const newVenue = await response.json();

    return newVenue;
  } catch (error) {
    console.error('Error creating venue:', error);
    throw error;
  }
};

export const updateVenue = async (venueId, updatedVenueData, token) => {
  const url = `${API_BASE_URL}/holidaze/venues/${venueId}`;
  const requestOptions = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(updatedVenueData),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not update venue.');
    }

    return true;
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error;
  }
};

// export const updateVenue = async (venueId, venueData, mediaData, token) => {
//   const response = await fetch(`/api/venues/${venueId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ ...venueData, media: mediaData }),
//   });

//   if (!response.ok) {
//     throw new Error('Error updating venue');
//   }

//   const data = await response.json();
//   return data;
// };

export const deleteVenue = async (venueId, token) => {
  const url = `${API_BASE_URL}/holidaze/venues/${venueId}`;
  const requestOptions = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not delete venue.');
    }

    return true;
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw error;
  }
};

export const fetchVenues = async (token) => {
  return await sendRequest(API_VENUES, 'GET', null, token);
};
