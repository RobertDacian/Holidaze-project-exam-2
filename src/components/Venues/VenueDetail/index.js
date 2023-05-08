// //In src/components/Venues/VenueDetail/index.js i have the following code:

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import { VenueDetailsWrapper } from './VenueDetail.styles';
// import { fetchVenueDetails } from '../../../api/venues';
// import { FiCheck, FiX } from 'react-icons/fi';
// import { MdImage } from 'react-icons/md';
// import BookingForm from '../../BookingForm';
// import { calculateRatingStars } from '../../../utils/ratingUtils';

// const VenueDetails = () => {
//   const { venueDetails, setVenueDetails, currentUser } = useGlobal();
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState('location');

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

//   const renderTabContent = () => {
//     const YesIcon = () => (
//       <>
//         <FiCheck color='green' /> Yes
//       </>
//     );
//     const NoIcon = () => (
//       <>
//         <FiX color='red' /> No
//       </>
//     );
//     switch (activeTab) {
//       case 'location':
//         return (
//           <div className='tab-content'>
//             <div className='info'>
//               <p className='p-bold'>
//                 Address:
//                 <p className='p-gray '>{venueDetails.location.address}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 City: <p className='p-gray'>{venueDetails.location.city}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 ZIP: <p className='p-gray'>{venueDetails.location.zip}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 Country:
//                 <p className='p-gray'>{venueDetails.location.country}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 Continent:
//                 <p className='p-gray'>{venueDetails.location.continent}</p>
//               </p>
//             </div>
//           </div>
//         );
//       case 'description':
//         return <div className='tab-content'>{venueDetails.description}</div>;
//       case 'meta':
//         return (
//           <div className='tab-content'>
//             <div className='info'>
//               <p className='p-bold'>
//                 WiFi:
//                 <p>{venueDetails.meta.wifi ? <YesIcon /> : <NoIcon />}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 Parking:
//                 <p className='p-gray'>
//                   {venueDetails.meta.parking ? <YesIcon /> : <NoIcon />}
//                 </p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 Breakfast:
//                 <p>{venueDetails.meta.breakfast ? <YesIcon /> : <NoIcon />}</p>
//               </p>
//             </div>
//             <div className='info'>
//               <p className='p-bold'>
//                 Pets allowed:
//                 <p>{venueDetails.meta.pets ? <YesIcon /> : <NoIcon />}</p>
//               </p>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <VenueDetailsWrapper>
//       {venueDetails && (
//         <>
//           {venueDetails.media[0] ? (
//             <img src={venueDetails.media[0]} alt={venueDetails.name} />
//           ) : (
//             <MdImage size={200} color={'var(--primary-color)'} />
//           )}
//           <div className='venue-info'>
//             <h3>{venueDetails.name}</h3>
//             <div className='rating'>
//               {calculateRatingStars(venueDetails.rating)}
//             </div>

//             <h4>Price: ${venueDetails.price}</h4>
//             <p>
//               {venueDetails.location.city}, {venueDetails.location.country}
//             </p>
//             <p>Max Guests: {venueDetails.maxGuests}</p>

//             <p>Last Updated: {venueDetails.updated}</p>
//             <BookingForm
//               venueDetails={venueDetails}
//               currentUser={currentUser}
//               venueId={venueDetails.id}
//             />
//           </div>
//           <div className='tabs-wrapper'>
//             <div className='tabs'>
//               <button onClick={() => setActiveTab('location')}>Location</button>
//               <button onClick={() => setActiveTab('description')}>
//                 Description
//               </button>
//               <button onClick={() => setActiveTab('meta')}>Amenities</button>
//             </div>
//             {renderTabContent()}
//           </div>
//         </>
//       )}
//     </VenueDetailsWrapper>
//   );
// };

// export default VenueDetails;

// //In src/components/Venues/VenueDetail/index.js i have the following code:

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from '../../../contexts/GlobalContext';
import { VenueDetailsWrapper } from './VenueDetail.styles';
import { fetchVenueDetails } from '../../../api/venues';
import { FiCheck, FiX } from 'react-icons/fi';
import { MdImage } from 'react-icons/md';
import BookingForm from '../../BookingForm';
import BookingCard from '../../DashboardComponent/BookingCard';
import { calculateRatingStars } from '../../../utils/ratingUtils';

const VenueDetails = ({ isBookingCard = false }) => {
  const { venueDetails, setVenueDetails, currentUser } = useGlobal();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('location');

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
          {venueDetails.media[0] ? (
            <img src={venueDetails.media[0]} alt={venueDetails.name} />
          ) : (
            <MdImage size={200} color={'var(--primary-color)'} />
          )}
          {isBookingCard ? (
            <BookingCard
              venueDetails={venueDetails}
              currentUser={currentUser}
            />
          ) : (
            <div className='venue-info'>
              <h3>{venueDetails.name}</h3>
              <div className='rating'>
                {calculateRatingStars(venueDetails.rating)}
              </div>

              <h4>Price: ${venueDetails.price}</h4>
              <p>
                {venueDetails.location.city}, {venueDetails.location.country}
              </p>
              <p>Max Guests: {venueDetails.maxGuests}</p>

              <p>Last Updated: {venueDetails.updated}</p>
              <BookingForm
                venueDetails={venueDetails}
                currentUser={currentUser}
                venueId={venueDetails.id}
              />
            </div>
          )}
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
