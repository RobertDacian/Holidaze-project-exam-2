// // src/components/DashboardComponent/VenueCard/index.js
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { MdImage } from 'react-icons/md';
// import { Card } from '../BookingCard/BookingCard.styles';
// import UpdateDeleteVenue from '../UpdateDeleteVenue';

// const VenueCard = ({ venue, updateVenue, deleteVenue }) => {
//   const [modalOpen, setModalOpen] = useState(false);

//   if (!venue) {
//     console.warn('Venue is undefined:', venue);
//     return null;
//   }

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <Card>
//       {venue.media && Array.isArray(venue.media) && venue.media.length > 0 ? (
//         <img src={venue.media[0]} alt={venue.name} />
//       ) : (
//         <MdImage size={200} color={'var(--primary-color)'} />
//       )}
//       <div className='mb-2 mt-2'>
//         <h5>Venue ID: {venue.id}</h5>
//         <p>Name: {venue.name}</p>
//         <p>Description: {venue.description}</p>
//         <p>Price: {venue.price}</p>
//         <p>Max Guests: {venue.maxGuests}</p>
//         <p>Rating: {venue.rating}</p>
//         <button className='btn' onClick={handleModalOpen}>
//           Update Venue
//         </button>
//         <UpdateDeleteVenue
//           venue={venue}
//           isOpen={modalOpen}
//           onClose={handleModalClose}
//           handleUpdateVenue={updateVenue} // renamed the props here
//           handleDeleteVenue={deleteVenue} // renamed the props here
//         />
//       </div>
//     </Card>
//   );
// };

// VenueCard.propTypes = {
//   venue: PropTypes.object.isRequired,
//   updateVenue: PropTypes.func.isRequired, // renamed the props here
//   deleteVenue: PropTypes.func.isRequired, // renamed the props here
// };

// export default VenueCard;

// src/components/DashboardComponent/VenueCard/index.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdImage } from 'react-icons/md';
import { Card } from '../BookingCard/BookingCard.styles';
import UpdateDeleteVenue from '../UpdateDeleteVenue';
import { formatDate } from '../../../utils/dateFormatUtils';

const VenueCard = ({ venue, updateVenue, deleteVenue }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!venue) {
    console.warn('Venue is undefined:', venue);
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
      {venue.media && Array.isArray(venue.media) && venue.media.length > 0 ? (
        <img src={venue.media[0]} alt={venue.name} />
      ) : (
        <MdImage size={200} color={'var(--primary-color)'} />
      )}
      <div className='mb-2 mt-2'>
        <h5>Venue ID: {venue.id}</h5>
        <p>Name: {venue.name}</p>
        <p>Description: {venue.description}</p>
        <p>Price: {venue.price}</p>
        <p>Max Guests: {venue.maxGuests}</p>
        <p>Rating: {venue.rating}</p>
        <p>Wifi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
        <p>Parking: {venue.meta.parking ? 'Yes' : 'No'}</p>
        <p>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
        <p>Pets: {venue.meta.pets ? 'Yes' : 'No'}</p>
        <p>Address: {venue.location.address}</p>
        <p>City: {venue.location.city}</p>
        <p>ZIP: {venue.location.zip}</p>
        <p>Country: {venue.location.country}</p>
        <p>Continent: {venue.location.continent}</p>
        <p>Lat: {venue.location.lat}</p>
        <p>Lng: {venue.location.lng}</p>
        <p>Created: {formatDate(venue.created)}</p>
        <p>Updated: {formatDate(venue.updated)}</p>
        <button className='btn' onClick={handleModalOpen}>
          Update Venue
        </button>
        <UpdateDeleteVenue
          venue={venue}
          isOpen={modalOpen}
          onClose={handleModalClose}
          handleUpdateVenue={updateVenue}
          handleDeleteVenue={deleteVenue}
        />
      </div>
    </Card>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
  updateVenue: PropTypes.func.isRequired,
  deleteVenue: PropTypes.func.isRequired,
};

export default VenueCard;
