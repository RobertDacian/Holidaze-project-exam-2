import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/dateFormatUtils';
import { MdImage } from 'react-icons/md';
import { Card } from './BookingCard.styles';
import UpdateDeleteBooking from '../UpdateDeleteBooking';

const BookingCard = ({
  booking,
  venueId,
  currentUser,
  handleCancelBooking,
  token,
}) => {
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
        {booking.venue &&
        Array.isArray(booking.venue.media) &&
        booking.venue.media.length > 0 ? (
          <img src={booking.venue.media[0]} alt={booking.venue.name} />
        ) : (
          <MdImage size={200} color={'var(--primary-color)'} />
        )}
        <div className='mb-2 mt-2'>
          <h5>Booking ID: {booking.id}</h5>
          <p>Date from: {formatDate(booking.dateFrom)}</p>
          <p>Date to: {formatDate(booking.dateTo)}</p>
          <p>Guests: {booking.guests}</p>
        </div>
        <>
          <button className='btn' onClick={handleModalOpen}>
            Update Booking
          </button>
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
