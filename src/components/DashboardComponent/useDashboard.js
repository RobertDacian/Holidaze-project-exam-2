import { useEffect } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import { API_KEY } from '../../constants/constants';  // Import the API key
import {
  fetchUserBookings,
  deleteBooking,
  updateBooking,
} from '../../api/bookings';
import { updateProfileMedia } from '../../api/profiles';

const useUserDashboard = () => {
  const { currentUser, setBookings } = useGlobal();

  useEffect(() => {
    if (currentUser) {
      fetchUserBookings(currentUser, currentUser.token, API_KEY)  // Pass API key here
        .then((fetchedBookings) => {
          setBookings(fetchedBookings);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    }
  }, [currentUser, setBookings]);

  const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
    try {
      await updateProfileMedia(
        currentUser.name,
        mediaUrl,
        currentUser.token,
        API_KEY,  // Pass API key here
        currentUser.venueManager
      );
    } catch (error) {
      console.error('Error while updating profile media:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, currentUser.token, API_KEY);  // Pass API key here
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error('Error while canceling booking:', error);
    }
  };

  const handleUpdateBooking = async (bookingId, bookingData) => {
    try {
      const isVenueManager = currentUser.userType === 'venue_manager';
      await updateBooking(
        bookingId,
        bookingData,
        isVenueManager,
        currentUser._id,
        API_KEY   // Pass API key here
      );
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return {
    handleUpdateProfileMedia,
    handleDeleteBooking,
    handleUpdateBooking,
  };
};

export default useUserDashboard;

