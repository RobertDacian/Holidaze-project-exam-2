import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import useUserDashboard from '../useDashboard';
import { UpdateDeleteBookingStyles } from './UpdateDeleteBookingStyles.styles';
import BookingForm from '../../BookingForm';

const UpdateDeleteBooking = ({ booking, isOpen, onClose }) => {
  const { currentUser } = useGlobal();
  const { handleUpdateBooking, handleDeleteBooking } = useUserDashboard();
  const [errorMessage, setErrorMessage] = useState('');

  const onHandleUpdateBooking = async (bookingData) => {
    try {
      await handleUpdateBooking(booking.id, bookingData);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onHandleDeleteBooking = async () => {
    try {
      await handleDeleteBooking(booking.id);
      onClose();
    } catch (error) {
      console.log('Error deleting booking:', error);
      setErrorMessage('An error occurred while deleting the booking.');
    }
  };

  return (
    <UpdateDeleteBookingStyles>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h4>Update {currentUser.name}'s Booking</h4>
            <BookingForm
              venueDetails={booking}
              onUpdate={onHandleUpdateBooking}
              booking={booking}
              errorMessage={errorMessage}
            />
            <button
              className='btn btn-outline-red '
              onClick={onHandleDeleteBooking}
            >
              Delete Booking
            </button>
            <button className='btn btn-close ' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </UpdateDeleteBookingStyles>
  );
};

export default UpdateDeleteBooking;
