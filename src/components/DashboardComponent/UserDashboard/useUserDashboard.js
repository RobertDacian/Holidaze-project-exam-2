import { useEffect } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import { fetchUserBookings, deleteBooking } from '../../../api/bookings'; // Update this import
import { updateProfileMedia } from '../../../api/profiles';

const useUserDashboard = () => {
  const { currentUser, setBookings } = useGlobal();

  useEffect(() => {
    if (currentUser) {
      fetchUserBookings(currentUser.name, currentUser.token)
        .then((fetchedBookings) => {
          setBookings(fetchedBookings);
        })
        .catch((error) => {
          console.error('Error fetching user bookings:', error);
        });
    }
  }, [currentUser, setBookings]);

  const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
    try {
      await updateProfileMedia(
        currentUser.name,
        mediaType,
        mediaUrl,
        currentUser.token
      );
    } catch (error) {
      console.error('Error while updating profile media:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, currentUser.token);
      fetchUserBookings(currentUser.name, currentUser.token, false, false);
    } catch (error) {
      console.error('Error while canceling booking:', error);
    }
  };

  return {
    handleUpdateProfileMedia,
    handleDeleteBooking,
  };
};

export default useUserDashboard;
