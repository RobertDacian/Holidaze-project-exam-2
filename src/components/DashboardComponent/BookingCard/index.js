// //In src/components/DashboardComponent/UserDashboard/BookingCard/index.js i have the following code:

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Card } from './BookingCard.styles';
// import { MdImage } from 'react-icons/md';
// import UpdateDeleteBooking from '../UpdateDeleteBooking';

// const BookingCard = ({ booking, isVenueManager }) => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <Card>
//       {booking.imageUrl ? (
//         <img
//           className='card-img'
//           src={booking.imageUrl}
//           alt={booking.venueName}
//         />
//       ) : (
//         <MdImage size={200} color={'var(--primary-color)'} />
//       )}
//       <h3>{booking.venueName}</h3>
//       <p>Booking ID: {booking.id}</p>
//       <p>Date from: {booking.dateFrom}</p>
//       <p>Date to: {booking.dateTo}</p>
//       <p>Guests: {booking.guests}</p>
//       {/* Remove the isVenueManager check */}
//       <>
//         <button onClick={handleModalOpen}>Update Booking</button>
//         <UpdateDeleteBooking
//           booking={booking}
//           isOpen={modalOpen}
//           onClose={handleModalClose}
//         />
//       </>
//     </Card>
//   );
// };

// BookingCard.propTypes = {
//   booking: PropTypes.object.isRequired,
//   isVenueManager: PropTypes.bool,
// };

// export default BookingCard;

//In src/components/DashboardComponent/UserDashboard/BookingCard/index.js i have the following code:

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from './BookingCard.styles';
import { MdImage } from 'react-icons/md';
import UpdateDeleteBooking from '../UpdateDeleteBooking';
import { fetchBookingById } from '../../../api/bookings';

const BookingCard = (props) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const token = 'token';
      const bookingData = await fetchBookingById(props.booking.id, token);
      setBookingDetails(bookingData);
      setVenue(bookingData.venue);
    };
    fetchBookingDetails();
  }, [props.booking.id]);

  if (!venue) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Card>
      {venue.imageUrl ? (
        <img className='card-img' src={venue.imageUrl} alt={venue.name} />
      ) : (
        <MdImage size={200} color={'var(--primary-color)'} />
      )}
      <h3>{venue.name}</h3>
      <p>Booking ID: {bookingDetails.id}</p>
      <p>Date from: {bookingDetails.dateFrom}</p>
      <p>Date to: {bookingDetails.dateTo}</p>
      <p>Guests: {bookingDetails.guests}</p>
      <>
        <button onClick={handleModalOpen}>Update Booking</button>
        <UpdateDeleteBooking
          booking={bookingDetails}
          isOpen={modalOpen}
          onClose={handleModalClose}
          handleCancelBooking={props.handleCancelBooking}
        />
      </>
    </Card>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
  handleCancelBooking: PropTypes.func.isRequired,
};

export default BookingCard;
