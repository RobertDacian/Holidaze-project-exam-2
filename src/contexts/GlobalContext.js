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

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });

  const [venues, setVenues] = useState([]);
  const [venueDetails, setVenueDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (currentUser.accessToken) {
        localStorage.setItem('token', currentUser.accessToken);
        setToken(currentUser.accessToken);
      }
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      setToken(null);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null); // Clear token state
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
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
      if (!currentUser) {
        return;
      }

      const fetchedBookings = await bookingsAPI.fetchUserBookings(
        currentUser, // Pass the whole currentUser object
        currentUser.token,
        currentUser.venueManager
      );

      const bookingsWithDetails = await Promise.all(
        fetchedBookings.map(async (booking) => {
          const bookingData = await bookingsAPI.fetchBookingById(
            booking.id,
            currentUser.token,
            { _venue: true, _customer: true }
          );
          return {
            ...bookingData,
            venueName: bookingData.venue.name,
            imageUrl: bookingData.venue.media[0] || '',
            venueManager: currentUser.venueManager ? true : undefined,
          };
        })
      );

      setBookings(bookingsWithDetails);
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
        {
          ...bookingData,
          venueId: venueDetails.id,
          venueManager: currentUser.venueManager, // Add this line
        },
        currentUser.token
      );
      const venue = await bookingsAPI.fetchBookingById(
        newBooking.id,
        currentUser.token,
        { _venue: true, _customer: true }
      );
      const newBookingWithDetails = {
        ...newBooking,
        venueName: venue.venue.name,
        imageUrl: venue.venue.media[0] || '',
        customer: venue.customer,
      };
      setBookings((prevBookings) => {
        const updatedBookings = [...prevBookings, newBookingWithDetails];
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        return updatedBookings;
      });
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
    token,
    setToken,
    logout,
    venues,
    setVenues,
    venueDetails,
    setVenueDetails,
    bookings,
    setBookings,
    // createBookingForCurrentUser,
    createBooking,
    deleteBooking,
    profiles,
    setProfiles,
    fetchProfiles,
    updateCurrentUserProfile,
    updateProfileMedia,
    updateBooking,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
