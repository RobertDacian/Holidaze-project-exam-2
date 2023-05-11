// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// // import { MdImage } from 'react-icons/md';
// import { Card } from './BookingCard.styles';
// import UpdateDeleteBooking from '../UpdateDeleteBooking';

// const BookingCard = ({ booking, handleCancelBooking }) => {
//   const [modalOpen, setModalOpen] = useState(false);

//   if (!booking) {
//     console.warn('Booking is undefined:', booking);
//     return null;
//   }

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       <Card>
//         <p>Booking ID: {booking.id}</p>
//         <p>Date from: {booking.dateFrom}</p>
//         <p>Date to: {booking.dateTo}</p>
//         <p>Guests: {booking.guests}</p>
//         <>
//           <button onClick={handleModalOpen}>Update Booking</button>
//           <UpdateDeleteBooking
//             booking={booking}
//             isOpen={modalOpen}
//             onClose={handleModalClose}
//             handleCancelBooking={handleCancelBooking}
//           />
//         </>
//       </Card>
//     </>
//   );
// };

// BookingCard.propTypes = {
//   booking: PropTypes.object.isRequired,
//   handleCancelBooking: PropTypes.func.isRequired,
// };

// export default BookingCard;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdImage } from 'react-icons/md';
import { Card } from './BookingCard.styles';
import UpdateDeleteBooking from '../UpdateDeleteBooking';

const BookingCard = ({ booking, handleCancelBooking }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!booking) {
    console.warn('Booking is undefined:', booking);
    return null;
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card>
        {Array.isArray(booking?.venue?.media) &&
        booking.venue.media.length > 0 ? (
          <img src={booking.venue.media[0]} alt={booking.venue.name} />
        ) : (
          <MdImage size={200} color={'var(--primary-color)'} />
        )}
        <p>Booking ID: {booking.id}</p>
        <p>Date from: {booking.dateFrom}</p>
        <p>Date to: {booking.dateTo}</p>
        <p>Guests: {booking.guests}</p>
        <>
          <button onClick={handleModalOpen}>Update Booking</button>
          <UpdateDeleteBooking
            booking={booking}
            isOpen={modalOpen}
            onClose={handleModalClose}
            handleCancelBooking={handleCancelBooking}
          />
        </>
      </Card>
    </>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
  handleCancelBooking: PropTypes.func.isRequired,
};

export default BookingCard;
