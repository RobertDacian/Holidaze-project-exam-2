// src/components/DashboardComponent/UserDashboard/UpdateBooking/index.js

import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import { UpdateDeleteBookingStyles } from './UpdateDeleteBookingStyles.styles';
import BookingForm from '../../BookingForm';

const UpdateDeleteBooking = ({ booking, isOpen, onClose }) => {
  const { currentUser, updateBooking, deleteBookingById } = useGlobal();
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateBooking = async (bookingData) => {
    try {
      const isVenueManager = currentUser.userType === 'venue_manager';
      await updateBooking(
        booking.id,
        bookingData,
        isVenueManager,
        currentUser._id
      );
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteBookingById(booking.id, currentUser);
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
            <h2>Update {currentUser.name}'s Booking</h2>
            <BookingForm
              venueDetails={booking}
              onUpdate={handleUpdateBooking}
              booking={booking}
              errorMessage={errorMessage}
            />
            <button
              className='btn btn-outline-red'
              onClick={handleDeleteBooking}
            >
              Delete
            </button>
            <button className='btn' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </UpdateDeleteBookingStyles>
  );
};

export default UpdateDeleteBooking;
