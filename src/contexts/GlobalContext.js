// import React, { createContext, useContext, useState, useEffect } from 'react';

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

//   const [venues, setVenues] = useState([]);
//   const [venueDetails, setVenueDetails] = useState(null);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem('currentUser', JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem('currentUser');
//     }
//   }, [currentUser]);

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
//     console.log('User logged out and local storage cleared');
//   };

//   const value = {
//     currentUser,
//     setCurrentUser,
//     logout,
//     venues,
//     setVenues,
//     venueDetails,
//     setVenueDetails,
//   };

//   return (
//     <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as bookingsAPI from '../api/bookings';

// Global Context
const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [venues, setVenues] = useState([]);
  const [venueDetails, setVenueDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out and local storage cleared');
  };

  const fetchBookings = async (venueId) => {
    try {
      const fetchedBookings = await bookingsAPI.fetchBookings(
        venueId,
        currentUser.token
      );
      setBookings(fetchedBookings);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  };

  const fetchBookingById = async (bookingId) => {
    try {
      const fetchedBookingDetails = await bookingsAPI.fetchBookingById(
        bookingId,
        currentUser.token
      );
      setBookingDetails(fetchedBookingDetails);
    } catch (error) {
      console.log('Error fetching booking details:', error);
    }
  };

  const createBookingForCurrentUser = async (bookingData) => {
    try {
      const newBooking = await bookingsAPI.createBooking(
        bookingData,
        currentUser.token,
        currentUser.id,
        venueDetails.id
      );
      setBookings((prevBookings) => [...prevBookings, newBooking]);
    } catch (error) {
      console.log('Error creating booking:', error);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    venues,
    setVenues,
    venueDetails,
    setVenueDetails,
    bookings,
    setBookings,
    bookingDetails,
    setBookingDetails,
    fetchBookings,
    fetchBookingById,
    createBookingForCurrentUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
