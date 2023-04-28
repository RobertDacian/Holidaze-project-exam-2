// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Form, FormGroup, Label, Input, Button } from './BookingForm.styles';
// import { createBooking } from '../../api/bookings';

// const BookingForm = ({ venueDetails, currentUser }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [guests, setGuests] = useState(1);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (currentUser) {
//       console.log('currentUser:', currentUser);

//       try {
//         const bookingData = {
//           dateFrom: startDate.toISOString().split('T')[0],
//           dateTo: endDate.toISOString().split('T')[0],
//           guests: parseInt(guests, 10), // Convert guests value to a number
//           customerId: currentUser.id,
//           venueId: venueDetails.id,
//         };

//         await createBooking(bookingData, currentUser);
//         alert('Booking created successfully!');
//       } catch (error) {
//         alert(`An error occurred: ${error.message}`);
//       }
//     } else {
//       alert('You must be logged in to create a booking');
//     }
//   };

//   return (
//     <Form onSubmit={handleFormSubmit}>
//       <FormGroup>
//         <Label htmlFor='start-date'>Start Date</Label>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           name='start-date'
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='end-date'>End Date</Label>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//           name='end-date'
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='guests'>Guests</Label>
//         <Input
//           type='number'
//           id='guests'
//           name='guests'
//           value={guests}
//           onChange={(e) => setGuests(e.target.value)}
//           min={1}
//           max={10}
//           required
//         />
//       </FormGroup>
//       <Button type='submit'>Check Availability</Button>
//     </Form>
//   );
// };

// BookingForm.propTypes = {
//   venueDetails: PropTypes.object.isRequired,
//   currentUser: PropTypes.object.isRequired,
// };

// export default BookingForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Label, Input, Button } from './BookingForm.styles';
import { createBooking } from '../../api/bookings';
import useFormErrors from '../common/Errors';
import { Error } from '../common/Errors/Error.styles';

const BookingForm = ({ venueDetails, currentUser }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);

  // Add error state
  const [errors, setError, clearError, clearAllErrors] = useFormErrors({
    startDate: '',
    endDate: '',
    guests: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear all errors before validating
    clearAllErrors();

    if (!startDate) {
      setError('startDate', 'Please select a start date');
    }

    if (!endDate) {
      setError('endDate', 'Please select an end date');
    }

    if (startDate && endDate && currentUser) {
      try {
        const bookingData = {
          dateFrom: startDate.toISOString().split('T')[0],
          dateTo: endDate.toISOString().split('T')[0],
          guests: parseInt(guests, 10),
          customerId: currentUser.id,
          venueId: venueDetails.id,
        };

        await createBooking(bookingData, currentUser);
        alert('Booking created successfully!');
      } catch (error) {
        setError('bookingError', error.message);
      }
    } else {
      setError('loginError', 'You must be logged in to create a booking');
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    clearError('startDate');
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    clearError('endDate');
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
    clearError('guests');
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <Label htmlFor='start-date'>Start Date</Label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          name='start-date'
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='end-date'>End Date</Label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          name='end-date'
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='guests'>Guests</Label>
        <Input
          type='number'
          id='guests'
          name='guests'
          value={guests}
          onChange={handleGuestsChange}
          min={1}
          max={10}
          required
        />
      </FormGroup>
      <Button className='btn' type='submit'>
        Book Now
      </Button>
      <Error>
        {errors.startDate && <p className='error'>{errors.startDate}</p>}
        {errors.endDate && <p className='error'>{errors.endDate}</p>}
        {errors.guests && <p className='error'>{errors.guests}</p>}
        {errors.bookingError && <p className='error'>{errors.bookingError}</p>}
        {errors.loginError && <p className='error'>{errors.loginError}</p>}
      </Error>
    </Form>
  );
};

BookingForm.propTypes = {
  venueDetails: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

export default BookingForm;
