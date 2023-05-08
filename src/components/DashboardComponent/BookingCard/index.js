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

// eslint-disable-next-line react-hooks/rules-of-hooks

// src/components/DashboardComponent/UserDashboard/BookingCard/index.js

// src/components/DashboardComponent/UserDashboard/BookingCard/index.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from './BookingCard.styles';
import VenueDetails from '../../../components/Venues/VenueDetail';
import UpdateDeleteBooking from '../UpdateDeleteBooking';
import { fetchBookingById } from '../../../api/bookings';
import { fetchVenueDetails } from '../../../api/venues';

const BookingCard = (props) => {
  console.log('Booking:', props.booking);

  const [bookingDetails, setBookingDetails] = useState(null);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const bookingData = await fetchBookingById(props.booking.id, props.token);
      if (bookingData) {
        setBookingDetails(bookingData);
        if (bookingData.venue) {
          setVenue(bookingData.venue);
        } else if (bookingData.venueId) {
          // Fetch venue details if they are not available in the booking object
          const venueData = await fetchVenueDetails(
            bookingData.venueId,
            props.token
          );
          setVenue(venueData);
        } else {
          console.error('Error: venueId is missing in the booking object');
        }
      } else {
        console.error('Error fetching booking details. Using fallback data.');
        setVenue(props.booking.venue);
      }
    };
    fetchBookingDetails();
  }, [
    props.booking.id,
    props.token,
    props.booking.venue,
    props.booking.venueId,
  ]);

  // Initialize modalOpen state outside of the conditional statement
  const [modalOpen, setModalOpen] = useState(false);

  if (!venue) {
    console.error('Venue is undefined in the booking object:', props.booking);
    return null;
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Card>
      <VenueDetails venueDetails={venue} isBookingCard={true} />
      <p>Booking ID: {props.booking.id}</p>
      <p>
        Date from:{' '}
        {bookingDetails ? bookingDetails.dateFrom : props.booking.dateFrom}
      </p>
      <p>
        Date to: {bookingDetails ? bookingDetails.dateTo : props.booking.dateTo}
      </p>
      <p>
        Guests: {bookingDetails ? bookingDetails.guests : props.booking.guests}
      </p>
      <>
        <button onClick={handleModalOpen}>Update Booking</button>
        <UpdateDeleteBooking
          booking={props.booking}
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
  token: PropTypes.string.isRequired,
};

export default BookingCard;
