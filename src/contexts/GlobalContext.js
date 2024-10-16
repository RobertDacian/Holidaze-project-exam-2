import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import * as bookingsAPI from '../api/bookings';
import * as profilesAPI from '../api/profile'; // Ensure the path and file name are correct
import * as venuesAPI from '../api/venues';
import { API_KEY } from '../constants/constants';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('accessToken');
    return storedToken && storedToken !== 'undefined' ? storedToken : null;
  });

  const [venues, setVenues] = useState(() => {
    const storedVenues = localStorage.getItem('venues');
    return storedVenues && storedVenues !== 'undefined' ? JSON.parse(storedVenues) : [];
  });

  const [venueDetails, setVenueDetails] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const storedBookings = localStorage.getItem('bookings');
    return storedBookings && storedBookings !== 'undefined' ? JSON.parse(storedBookings) : [];
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
      if (!currentUser || !currentUser.name) return;

      const fetchedVenues = await venuesAPI.fetchVenuesByProfile(
        currentUser.name,
        token,
        API_KEY
      );
      setVenues(fetchedVenues);
    } catch (error) {
      console.log('Error fetching venues:', error);
    }
  }, [currentUser, token]);

  useEffect(() => {
    fetchUserVenuesFromAPI();
  }, [fetchUserVenuesFromAPI]);

  const createVenue = async (venueData) => {
    try {
      const newVenue = await venuesAPI.createVenue(venueData, token, API_KEY);
      fetchUserVenuesFromAPI();
      return newVenue;
    } catch (error) {
      console.log('Error creating venue:', error);
      throw error;
    }
  };

  const updateVenue = async (venueId, venueData) => {
    try {
      await venuesAPI.updateVenue(venueId, venueData, token, API_KEY);
      fetchUserVenuesFromAPI();
    } catch (error) {
      console.log('Error updating venue:', error);
      throw error;
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      await venuesAPI.deleteVenue(venueId, token, API_KEY);
      fetchUserVenuesFromAPI();
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await profilesAPI.fetchProfiles(API_KEY);
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.log('Error fetching profiles:', error);
    }
  };

  const updateProfileMedia = async (name, avatarUrl, isVenueManager = false) => {
    try {
      await profilesAPI.updateProfileMedia(name, avatarUrl, token, API_KEY, isVenueManager);
      setCurrentUser((prevUser) => ({ ...prevUser, avatar: avatarUrl }));
    } catch (error) {
      console.log('Error updating profile media:', error);
      throw error;
    }
  };

  const updateCurrentUserProfile = async (userData) => {
    try {
      const updatedUser = await profilesAPI.updateProfile(currentUser.name, userData, token, API_KEY);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const fetchUserBookingsFromAPI = useCallback(async () => {
    try {
      if (!currentUser || !currentUser.name) return;

      const fetchedBookings = await bookingsAPI.fetchUserBookings(currentUser.name, token, API_KEY);
      setBookings(fetchedBookings);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }, [currentUser, token]);

  useEffect(() => {
    fetchUserBookingsFromAPI();
  }, [fetchUserBookingsFromAPI]);

  const createBooking = async (bookingData) => {
    try {
      const newBooking = await bookingsAPI.createBooking(bookingData, token, API_KEY);
      fetchUserBookingsFromAPI();
      return newBooking;
    } catch (error) {
      console.log('Error creating booking:', error);
      throw error;
    }
  };

  const updateBooking = async (bookingId, bookingData) => {
    try {
      await bookingsAPI.updateBooking(bookingId, bookingData, token, API_KEY);
      fetchUserBookingsFromAPI();
    } catch (error) {
      console.log('Error updating booking:', error);
      throw error;
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await bookingsAPI.deleteBooking(bookingId, token, API_KEY);
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

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};


