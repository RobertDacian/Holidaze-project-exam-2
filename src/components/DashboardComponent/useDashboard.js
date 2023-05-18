// // src/components/DashboardComponent/UserDashboard/useUserDashboard.js
// import { useEffect } from 'react';
// import { useGlobal } from '../../contexts/GlobalContext';
// import {
//   fetchUserBookings,
//   deleteBooking,
//   updateBooking,
// } from '../../api/bookings';
// import { updateProfileMedia } from '../../api/profiles';

// const useUserDashboard = () => {
//   const { currentUser, setBookings } = useGlobal();

//   useEffect(() => {
//     if (currentUser) {
//       fetchUserBookings(currentUser, currentUser.token)
//         .then((fetchedBookings) => {
//           setBookings(fetchedBookings);
//         })
//         .catch((error) => {
//           console.error('Error fetching bookings:', error);
//         });
//     }
//   }, [currentUser, setBookings]);

//   const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
//     try {
//       await updateProfileMedia(
//         currentUser.name,
//         mediaUrl,
//         currentUser.token,
//         currentUser.venueManager
//       );
//     } catch (error) {
//       console.error('Error while updating profile media:', error);
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     try {
//       await deleteBooking(bookingId, currentUser.token);
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking.id !== bookingId)
//       );
//     } catch (error) {
//       console.error('Error while canceling booking:', error);
//     }
//   };

//   const handleUpdateBooking = async (bookingId, bookingData) => {
//     try {
//       const isVenueManager = currentUser.userType === 'venue_manager';
//       await updateBooking(
//         bookingId,
//         bookingData,
//         isVenueManager,
//         currentUser._id
//       );
//     } catch (error) {
//       console.error('Error updating booking:', error);
//     }
//   };

//   return {
//     handleUpdateProfileMedia,
//     handleDeleteBooking,
//     handleUpdateBooking,
//   };
// };

// export default useUserDashboard;
// src/components/DashboardComponent/UserDashboard/useUserDashboard.js
import { useEffect } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
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
      fetchUserBookings(currentUser, currentUser.token)
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
        currentUser.venueManager
      );
    } catch (error) {
      console.error('Error while updating profile media:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, currentUser.token);
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
        currentUser._id
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
