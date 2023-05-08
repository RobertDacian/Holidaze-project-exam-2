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
import { fetchUserBookings } from '../api/bookings';

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
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out and local storage cleared');
  };

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await profilesAPI.fetchProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.log('Error fetching profiles:', error);
    }
  };

  const updateProfileMedia = async (name, avatarUrl, token) => {
    try {
      const updatedUser = await profilesAPI.updateProfileMedia(
        name,
        avatarUrl,
        token
      );
      if (updatedUser) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          avatar: updatedUser.avatar,
        }));
      } else {
        throw new Error('Error updating profile media');
      }
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
      if (!currentUser) {
        return;
      }

      const fetchedBookings = await fetchUserBookings(
        currentUser.name,
        currentUser.token
      );

      console.log('User bookings:', fetchedBookings);
      setBookings(fetchedBookings);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserBookingsFromAPI();
  }, [fetchUserBookingsFromAPI]);

  const addBooking = (newBooking) => {
    setBookings((prevBookings) => {
      const updatedBookings =
        prevBookings && prevBookings.length
          ? [...prevBookings, newBooking]
          : [newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings)); // Store updated bookings in local storage
      return updatedBookings;
    });
  };

  const createBookingForCurrentUser = async (bookingData, isVenueManager) => {
    try {
      const newBooking = await bookingsAPI.createBooking(
        bookingData,
        currentUser,
        venueDetails.id
      );
      const newBookingWithDetails = {
        ...newBooking,
        venueName: venueDetails.name,
        imageUrl: venueDetails.media[0] || '',
      };
      addBooking(newBookingWithDetails);
    } catch (error) {
      console.log('Error creating booking:', error);
    }
  };

  const updateBooking = async (
    bookingId,
    updatedBookingData,
    isVenueManager,
    userId
  ) => {
    try {
      const updatedBooking = await bookingsAPI.updateBooking(
        bookingId,
        updatedBookingData,
        currentUser.token,
        isVenueManager,
        userId
      );

      setBookings((prevBookings) => {
        const updatedBookings = prevBookings.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking
        );
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        return updatedBookings;
      });
    } catch (error) {
      console.log('Error updating booking:', error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const status = await bookingsAPI.deleteBooking(
        bookingId,
        currentUser.token
      );
      if (status === 204) {
        setBookings((prevBookings) => {
          const updatedBookings = prevBookings.filter(
            (booking) => booking.id !== bookingId
          );
          localStorage.setItem('bookings', JSON.stringify(updatedBookings)); // Store updated bookings in local storage
          return updatedBookings;
        });
      }
    } catch (error) {
      console.log('Error canceling booking:', error);
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
    // bookingDetails,
    // fetchBookingById,
    // setBookingDetails,
    // fetchBookings,
    // addBooking,
    createBookingForCurrentUser,
    deleteBooking,
    profiles,
    setProfiles,
    fetchProfiles,
    // profileBookings,
    // setProfileBookings,
    // profileVenues,
    // setProfileVenues,
    // fetchProfileVenues,
    updateCurrentUserProfile,
    updateProfileMedia,
    updateBooking,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
