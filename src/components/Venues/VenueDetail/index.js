// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import { VenueDetailsWrapper } from './VenueDetail.styles';
// import { fetchVenueDetails } from '../../../api/venues';

// const VenueDetails = () => {
//   const { venueDetails, setVenueDetails } = useGlobal();
//   const { id } = useParams();

//   useEffect(() => {
//     const loadVenueDetails = async () => {
//       try {
//         const data = await fetchVenueDetails(id);
//         setVenueDetails(data);
//       } catch (error) {
//         console.error('Error fetching venue details:', error);
//       }
//     };

//     loadVenueDetails();
//   }, [id, setVenueDetails]);

//   return (
//     <VenueDetailsWrapper>
//       {venueDetails && (
//         <>
//           <img src={venueDetails.media[0]} alt={venueDetails.name} />
//           <div className='venue-info'>
//             <h3>{venueDetails.name}</h3>
//             <p>
//               {venueDetails.location.city}, {venueDetails.location.country}
//             </p>
//             <p>Price: ${venueDetails.price}</p>
//             <p>Max Guests: {venueDetails.maxGuests}</p>
//             <p>Rating: {venueDetails.rating}</p>
//           </div>
//         </>
//       )}
//     </VenueDetailsWrapper>
//   );
// };

// src/components/Venues/VenueDetail/index.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from '../../../contexts/GlobalContext';
import { VenueDetailsWrapper } from './VenueDetail.styles';
import { fetchVenueDetails } from '../../../api/venues';
import { FiCheck, FiX } from 'react-icons/fi';
// import { createBooking } from '../../../api/bookings';
import BookingForm from '../../BookingForm';

const VenueDetails = () => {
  const { venueDetails, setVenueDetails, currentUser } = useGlobal();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('location');
  // const [bookingStartDate, setBookingStartDate] = useState(null);
  // const [bookingEndDate, setBookingEndDate] = useState(null);
  // const [formData, setFormData] = useState(null);

  // const submitBooking = async (e) => {
  //   e.preventDefault();
  //   if (bookingStartDate && bookingEndDate) {
  //     try {
  //       const guests = parseInt(formData.guests);
  //       if (isNaN(guests) || !formData.guests) {
  //         throw new Error('Guests must be a valid number');
  //       }
  //       const bookingData = {
  //         dateFrom: bookingStartDate.toISOString().split('T')[0],
  //         dateTo: bookingEndDate.toISOString().split('T')[0],
  //         guests,
  //         customerId: currentUser.id,
  //         venueId: venueDetails.id,
  //       };
  //       await createBooking(bookingData, currentUser, venueDetails);
  //       alert('Booking created successfully');
  //     } catch (error) {
  //       console.error('Error creating booking:', error);
  //       alert('Error creating booking:', error.message);
  //     }
  //   } else {
  //     alert('Please select a date range to create a booking');
  //   }
  // };

  // const onBookingDatesChange = (startDate, endDate) => {
  //   setBookingStartDate(startDate);
  //   setBookingEndDate(endDate);
  // };

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        const data = await fetchVenueDetails(id);
        setVenueDetails(data);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    loadVenueDetails();
  }, [id, setVenueDetails]);

  const renderTabContent = () => {
    const YesIcon = () => (
      <>
        <FiCheck color='green' /> Yes
      </>
    );
    const NoIcon = () => (
      <>
        <FiX color='red' /> No
      </>
    );
    switch (activeTab) {
      case 'location':
        return (
          <div className='tab-content'>
            <div className='info'>
              <p className='p-bold'>
                Address:
                <p className='p-gray '>{venueDetails.location.address}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                City: <p className='p-gray'>{venueDetails.location.city}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                ZIP: <p className='p-gray'>{venueDetails.location.zip}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                Country:
                <p className='p-gray'>{venueDetails.location.country}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                Continent:
                <p className='p-gray'>{venueDetails.location.continent}</p>
              </p>
            </div>
          </div>
        );
      case 'description':
        return <div className='tab-content'>{venueDetails.description}</div>;
      case 'meta':
        return (
          <div className='tab-content'>
            <div className='info'>
              <p className='p-bold'>
                WiFi:
                <p>{venueDetails.meta.wifi ? <YesIcon /> : <NoIcon />}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                Parking:
                <p className='p-gray'>
                  {venueDetails.meta.parking ? <YesIcon /> : <NoIcon />}
                </p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                Breakfast:
                <p>{venueDetails.meta.breakfast ? <YesIcon /> : <NoIcon />}</p>
              </p>
            </div>
            <div className='info'>
              <p className='p-bold'>
                Pets allowed:
                <p>{venueDetails.meta.pets ? <YesIcon /> : <NoIcon />}</p>
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <VenueDetailsWrapper>
      {venueDetails && (
        <>
          <img src={venueDetails.media[0]} alt={venueDetails.name} />
          <div className='venue-info'>
            <h3>{venueDetails.name}</h3>
            <p>
              {venueDetails.location.city}, {venueDetails.location.country}
            </p>
            <p>Price: ${venueDetails.price}</p>
            <p>Max Guests: {venueDetails.maxGuests}</p>
            <p>Rating: {venueDetails.rating}</p>
            <p>Last Updated: {venueDetails.updated}</p>
            <BookingForm
              venueDetails={venueDetails}
              currentUser={currentUser}
              // handleFormSubmit={submitBooking}
              // onBookingDatesChange={onBookingDatesChange}
              // formData={formData}
              // setFormData={setFormData}
            />
            {/* <button className='btn' onClick={() => submitBooking(formData)}>
              Book Now
            </button> */}
          </div>
          <div className='tabs-wrapper'>
            <div className='tabs'>
              <button onClick={() => setActiveTab('location')}>Location</button>
              <button onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button onClick={() => setActiveTab('meta')}>Amenities</button>
            </div>
            {renderTabContent()}
          </div>
        </>
      )}
    </VenueDetailsWrapper>
  );
};

export default VenueDetails;
