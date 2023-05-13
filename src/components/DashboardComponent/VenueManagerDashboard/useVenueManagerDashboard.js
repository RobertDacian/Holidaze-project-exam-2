// // src/components/DashboardComponent/VenueManagerDashboard/useVenueManagerDashboard.js

// import { useEffect } from 'react';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import { fetchUserBookings, deleteBooking } from '../../../api/bookings';
// import { updateProfileMedia } from '../../../api/profiles';

// const useVenueManagerDashboard = () => {
//   const { currentUser, venueManagerBookings, setVenueManagerBookings } =
//     useGlobal();
//   console.log('Current venue manager:', currentUser);
//   console.log('Venue manager bookings:', venueManagerBookings);

//   useEffect(() => {
//     if (currentUser && currentUser.role === 'venue_manager') {
//       console.log('Fetching venue manager bookings for:', currentUser.name);
//       fetchUserBookings(currentUser, currentUser.token)
//         .then((fetchedBookings) => {
//           console.log('Fetched venue manager bookings:', fetchedBookings);
//           setVenueManagerBookings(fetchedBookings);
//         })
//         .catch((error) => {
//           console.error('Error fetching venue manager bookings:', error);
//         });
//     }
//   }, [currentUser, setVenueManagerBookings]);

//   const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
//     try {
//       await updateProfileMedia(
//         currentUser.name,
//         mediaUrl,
//         currentUser.token,
//         currentUser.venueManager
//       );
//       console.log('Profile media updated successfully.');
//     } catch (error) {
//       console.error('Error while updating profile media:', error);
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     try {
//       console.log('Deleting booking:', bookingId);
//       await deleteBooking(bookingId, currentUser.token);
//       console.log('Booking deleted successfully.');
//       // Remove the deleted booking from the state
//       setVenueManagerBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking.id !== bookingId)
//       );
//     } catch (error) {
//       console.error('Error while canceling booking:', error);
//     }
//   };

//   return {
//     handleUpdateProfileMedia,
//     handleDeleteBooking,
//   };
// };

// export default useVenueManagerDashboard;
