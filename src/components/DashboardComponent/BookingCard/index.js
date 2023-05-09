// eslint-disable-next-line react-hooks/rules-of-hooks

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './BookingCard.styles';
import VenueDetails from '../../../components/Venues/VenueDetail';
import UpdateDeleteBooking from '../UpdateDeleteBooking';

const BookingCard = (props) => {
  console.log('booking prop value:', props.booking);
  const [modalOpen, setModalOpen] = useState(false);

  const booking = props.booking;

  // Render null if booking prop is not defined yet
  if (!booking) {
    console.warn('Booking is undefined:', booking);
    return null;
  }

  const venue = booking.venue;

  if (!venue) {
    console.error('Venue is undefined in the booking object:', booking);
    return null;
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  console.log('BookingCard props:', props);
  console.log('BookingCard booking prop value:', booking);

  return (
    <>
      <Card>
        {/* Pass the venue details to the VenueDetails component */}
        <VenueDetails venueDetails={venue} isBookingCard={true} />
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
            handleCancelBooking={props.handleCancelBooking}
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
