import { useEffect } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import { fetchUserBookings, deleteBooking } from '../../../api/bookings';
import { updateProfileMedia } from '../../../api/profiles';

const useUserDashboard = () => {
  const { currentUser, bookings, setBookings } = useGlobal();
  console.log('Current user:', currentUser);
  console.log('Bookings:', bookings);

  useEffect(() => {
    if (currentUser) {
      console.log('Fetching user bookings for:', currentUser.name);
      fetchUserBookings(currentUser.name, currentUser.token)
        .then((fetchedBookings) => {
          console.log('Fetched user bookings:', fetchedBookings);
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
      console.log('Profile media updated successfully.');
    } catch (error) {
      console.error('Error while updating profile media:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      console.log('Deleting booking:', bookingId);
      await deleteBooking(bookingId, currentUser.token);
      console.log('Booking deleted successfully.');
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
