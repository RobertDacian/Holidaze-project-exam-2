// //In src/context/GlobalContext.js i have the following code:
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from 'react';
// import * as bookingsAPI from '../api/bookings';
// import * as profilesAPI from '../api/profiles';
// import * as venuesAPI from '../api/venues';

// // Global Context
// const GlobalContext = createContext();

// export const useGlobal = () => {
//   return useContext(GlobalContext);
// };

// export const GlobalProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [token, setToken] = useState(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     return storedToken || null;
//   });

//   const [venues, setVenues] = useState([]);
//   const [venueDetails, setVenueDetails] = useState(null);
//   const [bookings, setBookings] = useState(() => {
//     const storedBookings = localStorage.getItem('bookings');
//     return storedBookings ? JSON.parse(storedBookings) : [];
//   });
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem('currentUser', JSON.stringify(currentUser));
//       if (currentUser.accessToken) {
//         localStorage.setItem('accessToken', currentUser.accessToken);
//         setToken(currentUser.accessToken);
//       }
//     } else {
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('accessToken');
//       setToken(null);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     localStorage.setItem('bookings', JSON.stringify(bookings));
//   }, [bookings]);

//   const logout = () => {
//     return new Promise((resolve, reject) => {
//       try {
//         setCurrentUser(null);
//         setToken(null);
//         // setVenues([]);
//         setVenueDetails(null);
//         setProfiles([]);
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem('accessToken');
//         console.log('User logged out and local storage cleared');
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };

//   const fetchUserVenuesFromAPI = useCallback(async () => {
//     try {
//       if (!currentUser || !currentUser.name) {
//         return;
//       }

//       const fetchedVenues = await venuesAPI.fetchVenuesByProfile(
//         currentUser,
//         currentUser.token
//       );

//       setVenues(fetchedVenues);
//     } catch (error) {
//       console.log('Error fetching venues:', error);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     fetchUserVenuesFromAPI();
//   }, [fetchUserVenuesFromAPI]);

//   const createVenue = async (venueData) => {
//     try {
//       const newVenue = await venuesAPI.createVenue(
//         venueData,
//         currentUser.token
//       );

//       // setVenues((prevVenues) => [...prevVenues, newVenue]);
//       fetchUserVenuesFromAPI();
//       return newVenue;
//     } catch (error) {
//       console.log('Error creating venue:', error);
//       throw error;
//     }
//   };

//   const updateVenue = async (venueId, venueData) => {
//     try {
//       await venuesAPI.updateVenue(venueId, venueData, currentUser.token);
//       fetchUserVenuesFromAPI(); // Refresh venues after updating
//     } catch (error) {
//       console.log('Error updating venue:', error);
//       throw error;
//     }
//   };

//   const deleteVenue = async (venueId) => {
//     try {
//       await venuesAPI.deleteVenue(venueId, currentUser.token);
//       fetchUserVenuesFromAPI(); // Refresh venues after deleting
//     } catch (error) {
//       console.error('Error deleting venue:', error);
//     }
//   };
//   const fetchProfiles = async () => {
//     try {
//       const fetchedProfiles = await profilesAPI.fetchProfiles();
//       setProfiles(fetchedProfiles);
//     } catch (error) {
//       console.log('Error fetching profiles:', error);
//     }
//   };

//   const updateProfileMedia = async (
//     name,
//     avatarUrl,
//     token,
//     isVenueManager = false
//   ) => {
//     try {
//       await profilesAPI.updateProfileMedia(
//         name,
//         avatarUrl,
//         token,
//         isVenueManager
//       );
//       setCurrentUser((prevUser) => ({
//         ...prevUser,
//         avatar: avatarUrl,
//       }));
//     } catch (error) {
//       console.log('Error updating profile media:', error);
//       throw error;
//     }
//   };

//   const updateCurrentUserProfile = async (userData) => {
//     try {
//       const updatedUser = await profilesAPI.updateProfile(
//         currentUser.name,
//         userData,
//         currentUser.token
//       );
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       console.log('Error updating profile:', error);
//     }
//   };

//   const fetchUserBookingsFromAPI = useCallback(async () => {
//     try {
//       if (!currentUser || !currentUser.name) {
//         return;
//       }

//       const fetchedBookings = await bookingsAPI.fetchUserBookings(
//         currentUser,
//         currentUser.token
//       );

//       setBookings(fetchedBookings);
//     } catch (error) {
//       console.log('Error fetching bookings:', error);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     fetchUserBookingsFromAPI();
//   }, [fetchUserBookingsFromAPI]);

//   const createBooking = async (bookingData) => {
//     try {
//       const newBooking = await bookingsAPI.createBooking(
//         bookingData,
//         currentUser.token
//       );
//       fetchUserBookingsFromAPI(); // Refresh bookings after creating
//       return newBooking;
//     } catch (error) {
//       console.log('Error creating booking:', error);
//       throw error;
//     }
//   };

//   const updateBooking = async (bookingId, bookingData) => {
//     try {
//       await bookingsAPI.updateBooking(
//         bookingId,
//         bookingData,
//         currentUser.token
//       );
//       fetchUserBookingsFromAPI(); // Refresh bookings after updating
//     } catch (error) {
//       console.log('Error updating booking:', error);
//       throw error;
//     }
//   };

//   const deleteBooking = async (bookingId) => {
//     try {
//       await bookingsAPI.deleteBooking(bookingId, currentUser.token);
//       // After deleting, refresh the bookings.
//       fetchUserBookingsFromAPI();
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   };

//   const value = {
//     currentUser,
//     setCurrentUser,
//     token,
//     setToken,
//     logout,
//     venues,
//     setVenues,
//     venueDetails,
//     setVenueDetails,
//     createVenue,
//     deleteVenue,
//     fetchUserVenuesFromAPI,
//     updateVenue,
//     bookings,
//     setBookings,
//     createBooking,
//     deleteBooking,
//     profiles,
//     setProfiles,
//     fetchProfiles,
//     updateCurrentUserProfile,
//     fetchUserBookingsFromAPI,
//     updateProfileMedia,
//     updateBooking,
//   };

//   return (
//     <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
//   );
// };

//In src/context/GlobalContext.js i have the following code:
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import * as bookingsAPI from '../api/bookings';
import * as profilesAPI from '../api/profiles';
import * as venuesAPI from '../api/venues';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && storedUser !== 'undefined') {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken && storedToken !== 'undefined') {
      return storedToken;
    }
    return null;
  });

  const [venues, setVenues] = useState(() => {
    const storedVenues = localStorage.getItem('venues');
    if (storedVenues && storedVenues !== 'undefined') {
      return JSON.parse(storedVenues);
    }
    return [];
  });

  const [venueDetails, setVenueDetails] = useState(null);

  const [bookings, setBookings] = useState(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings && storedBookings !== 'undefined') {
      return JSON.parse(storedBookings);
    }
    return [];
  });

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (currentUser.accessToken) {
        localStorage.setItem('accessToken', currentUser.accessToken);
        setToken(currentUser.accessToken);
      }
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');
      setToken(null);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('venues', JSON.stringify(venues));
  }, [venues]);

  const logout = () => {
    return new Promise((resolve, reject) => {
      try {
        setCurrentUser(null);
        setToken(null);
        setVenueDetails(null);
        setProfiles([]);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        console.log('User logged out and local storage cleared');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const fetchUserVenuesFromAPI = useCallback(async () => {
    try {
      if (!currentUser || !currentUser.name) {
        return;
      }

      const fetchedVenues = await venuesAPI.fetchVenuesByProfile(
        currentUser,
        currentUser.token
      );

      setVenues(fetchedVenues);
    } catch (error) {
      console.log('Error fetching venues:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserVenuesFromAPI();
  }, [fetchUserVenuesFromAPI]);

  // const createVenue = async (venueData) => {
  //   try {
  //     const newVenue = await venuesAPI.createVenue(
  //       venueData,
  //       currentUser.token
  //     );

  //     // setVenues((prevVenues) => [...prevVenues, newVenue]);
  //     fetchUserVenuesFromAPI();
  //     return newVenue;
  //   } catch (error) {
  //     console.log('Error creating venue:', error);
  //     throw error;
  //   }
  // };
  const createVenue = async (name, venueData, token, venueManager) => {
    try {
      const newVenue = await venuesAPI.createVenue(venueData, token);

      // setVenues((prevVenues) => [...prevVenues, newVenue]);
      fetchUserVenuesFromAPI();
      return newVenue;
    } catch (error) {
      console.log('Error creating venue:', error);
      throw error;
    }
  };

  const updateVenue = async (venueId, venueData) => {
    try {
      await venuesAPI.updateVenue(venueId, venueData, currentUser.token);
      fetchUserVenuesFromAPI(); // Refresh venues after updating
    } catch (error) {
      console.log('Error updating venue:', error);
      throw error;
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      await venuesAPI.deleteVenue(venueId, currentUser.token);
      fetchUserVenuesFromAPI(); // Refresh venues after deleting
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await profilesAPI.fetchProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.log('Error fetching profiles:', error);
    }
  };

  const updateProfileMedia = async (
    name,
    avatarUrl,
    token,
    isVenueManager = false
  ) => {
    try {
      await profilesAPI.updateProfileMedia(
        name,
        avatarUrl,
        token,
        isVenueManager
      );
      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: avatarUrl,
      }));
    } catch (error) {
      console.log('Error updating profile media:', error);
      throw error;
    }
  };

  const updateCurrentUserProfile = async (userData) => {
    try {
      const updatedUser = await profilesAPI.updateProfile(
        currentUser.name,
        userData,
        currentUser.token
      );
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const fetchUserBookingsFromAPI = useCallback(async () => {
    try {
      if (!currentUser || !currentUser.name) {
        return;
      }

      const fetchedBookings = await bookingsAPI.fetchUserBookings(
        currentUser,
        currentUser.token
      );

      setBookings(fetchedBookings);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserBookingsFromAPI();
  }, [fetchUserBookingsFromAPI]);

  const createBooking = async (bookingData) => {
    try {
      const newBooking = await bookingsAPI.createBooking(
        bookingData,
        currentUser.token
      );
      fetchUserBookingsFromAPI(); // Refresh bookings after creating
      return newBooking;
    } catch (error) {
      console.log('Error creating booking:', error);
      throw error;
    }
  };

  const updateBooking = async (bookingId, bookingData) => {
    try {
      await bookingsAPI.updateBooking(
        bookingId,
        bookingData,
        currentUser.token
      );
      fetchUserBookingsFromAPI(); // Refresh bookings after updating
    } catch (error) {
      console.log('Error updating booking:', error);
      throw error;
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await bookingsAPI.deleteBooking(bookingId, currentUser.token);
      // After deleting, refresh the bookings.
      fetchUserBookingsFromAPI();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    logout,
    venues,
    setVenues,
    venueDetails,
    setVenueDetails,
    createVenue,
    deleteVenue,
    fetchUserVenuesFromAPI,
    updateVenue,
    bookings,
    setBookings,
    createBooking,
    deleteBooking,
    profiles,
    setProfiles,
    fetchProfiles,
    updateCurrentUserProfile,
    fetchUserBookingsFromAPI,
    updateProfileMedia,
    updateBooking,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
