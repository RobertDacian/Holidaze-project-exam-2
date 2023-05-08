// // In src/components/BookingForm/index.js i have the following code:
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Form, FormGroup, Label, Input, Button } from './BookingForm.styles';
// import useFormErrors from '../common/Errors';
// import { Error } from '../common/Errors/Error.styles';
// import { useGlobal } from '../../contexts/GlobalContext';

// const BookingForm = ({ venueDetails }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [guests, setGuests] = useState(1);
//   const navigate = useNavigate();
//   const today = new Date();
//   const { currentUser, createBookingForCurrentUser } = useGlobal();

//   // Add error state
//   const [errors, setError, clearError, clearAllErrors] = useFormErrors({
//     startDate: '',
//     endDate: '',
//     guests: '',
//     loginError: '',
//     bookingError: '',
//     bookingSuccess: '',
//   });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Clear all errors before validating
//     clearAllErrors();

//     if (!startDate) {
//       setError('startDate', 'Please select a start date');
//     }

//     if (!endDate) {
//       setError('endDate', 'Please select an end date');
//     }

//     if (startDate && endDate && currentUser) {
//       try {
//         const bookingData = {
//           dateFrom: startDate.toISOString().split('T')[0],
//           dateTo: endDate.toISOString().split('T')[0],
//           guests: parseInt(guests, 10),
//           userId: currentUser.id,
//         };

//         // Use createBookingForCurrentUser function from the context
//         const isVenueManager = currentUser.role === 'venue_manager';
//         await createBookingForCurrentUser(bookingData, isVenueManager);

//         setError('bookingSuccess', 'Booking created successfully!');
//         setTimeout(() => {
//           navigate('/user-dashboard');
//         }, 2000);
//       } catch (error) {
//         setError('bookingError', error.message);
//       }
//     } else {
//       setError('loginError', 'You must be logged in to create a booking');
//     }
//   };

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     clearError('startDate');
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//     clearError('endDate');
//   };

//   const handleGuestsChange = (e) => {
//     setGuests(e.target.value);
//     clearError('guests');
//   };

//   return (
//     <Form onSubmit={handleFormSubmit}>
//       <div className='form-date'>
//         <FormGroup>
//           <Label htmlFor='start-date'>Start Date</Label>
//           <DatePicker
//             selected={startDate}
//             onChange={handleStartDateChange}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             name='start-date'
//             minDate={today}
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor='end-date'>End Date</Label>

//           <DatePicker
//             selected={endDate}
//             onChange={handleEndDateChange}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             name='end-date'
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor='guests'>Guests</Label>
//           <Input
//             type='number'
//             id='guests'
//             name='guests'
//             value={guests}
//             onChange={handleGuestsChange}
//             min={1}
//             max={10}
//             required
//           />
//         </FormGroup>
//       </div>
//       <FormGroup>
//         <Button className='btn' type='submit'>
//           Book Now
//         </Button>
//       </FormGroup>
//       <FormGroup>
//         <Error>
//           {errors.startDate && <p className='error'>{errors.startDate}</p>}
//           {errors.endDate && <p className='error'>{errors.endDate}</p>}
//           {errors.guests && <p className='error'>{errors.guests}</p>}
//           {errors.bookingError && (
//             <p className='error'>{errors.bookingError}</p>
//           )}
//           {errors.loginError && <p className='error'>{errors.loginError}</p>}
//           {errors.bookingSuccess && (
//             <p className='success'>{errors.bookingSuccess}</p>
//           )}
//         </Error>
//       </FormGroup>
//     </Form>
//   );
// };

// BookingForm.propTypes = {
//   venueDetails: PropTypes.object.isRequired,
//   currentUser: PropTypes.object,
// };

// export default BookingForm;

// In src/components/BookingForm/index.js i have the following code:
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Label, Input, Button } from './BookingForm.styles';
import useFormErrors from '../common/Errors';
import { Error } from '../common/Errors/Error.styles';
import { useGlobal } from '../../contexts/GlobalContext';

const BookingForm = ({ venueDetails, onUpdate, booking, errorMessage }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const today = new Date();
  const { currentUser, createBookingForCurrentUser } = useGlobal();

  useEffect(() => {
    if (booking) {
      setStartDate(new Date(booking.dateFrom));
      setEndDate(new Date(booking.dateTo));
      setGuests(booking.guests);
    }
  }, [booking]);

  // Add error state
  const [errors, setError, clearError, clearAllErrors] = useFormErrors({
    startDate: '',
    endDate: '',
    guests: '',
    loginError: '',
    bookingError: '',
    bookingSuccess: '',
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
      const bookingData = {
        dateFrom: startDate.toISOString().split('T')[0],
        dateTo: endDate.toISOString().split('T')[0],
        guests: parseInt(guests, 10),
      };

      if (onUpdate) {
        onUpdate(booking.id, bookingData, currentUser.token);
      } else {
        try {
          // Use createBookingForCurrentUser function from the context
          const isVenueManager = currentUser.role === 'venue_manager';
          await createBookingForCurrentUser(bookingData, isVenueManager);

          setError('bookingSuccess', 'Booking created successfully!');
          setTimeout(() => {
            navigate('/user-dashboard');
          }, 2000);
        } catch (error) {
          setError('bookingError', error.message);
        }
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
      <div className='form-date'>
        <FormGroup>
          <Label htmlFor='start-date'>Start Date</Label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            name='start-date'
            minDate={today}
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
      </div>
      <FormGroup>
        <Button className='btn' type='submit'>
          {onUpdate ? 'Update' : 'Book Now'}
        </Button>
      </FormGroup>
      <FormGroup>
        <Error>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          {errors.startDate && <p className='error'>{errors.startDate}</p>}
          {errors.endDate && <p className='error'>{errors.endDate}</p>}
          {errors.guests && <p className='error'>{errors.guests}</p>}
          {errors.bookingError && (
            <p className='error'>{errors.bookingError}</p>
          )}
          {errors.loginError && <p className='error'>{errors.loginError}</p>}
          {errors.bookingSuccess && (
            <p className='success'>{errors.bookingSuccess}</p>
          )}
        </Error>
      </FormGroup>
    </Form>
  );
};

BookingForm.propTypes = {
  venueDetails: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  onUpdate: PropTypes.func,
  booking: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default BookingForm;
