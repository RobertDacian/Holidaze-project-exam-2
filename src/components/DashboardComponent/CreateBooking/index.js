// src/components/DashboardComponent/CreateBooking/index.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobal } from '../../../contexts/GlobalContext';

const CreateBooking = () => {
  const { createBookingForCurrentUser } = useGlobal();
  const history = useHistory();

  const handleCreateBooking = async (bookingData) => {
    await createBookingForCurrentUser(bookingData, true);
    history.push('/dashboard');
  };

  return (
    <div>
      {/* Your Create Booking Form */}
      {/* Pass handleCreateBooking function to your form's onSubmit event */}
    </div>
  );
};

export default CreateBooking;
