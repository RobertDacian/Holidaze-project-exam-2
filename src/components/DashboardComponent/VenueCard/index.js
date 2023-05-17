// // src/components/DashboardComponent/VenueCard/index.js
// import React from 'react';
// import PropTypes from 'prop-types';
// import { MdImage } from 'react-icons/md';
// import { Card } from '../BookingCard/BookingCard.styles';

// const VenueCard = ({ venue }) => {
//   if (!venue) {
//     console.warn('Venue is undefined:', venue);
//     return null;
//   }

//   return (
//     <Card>
//       {venue.media && Array.isArray(venue.media) && venue.media.length > 0 ? (
//         <img src={venue.media[0]} alt={venue.name} />
//       ) : (
//         <MdImage size={200} color={'var(--primary-color)'} />
//       )}
//       <div className='mb-2 mt-2'>
//         <h5>{venue.name}</h5>
//         <p>{venue.description}</p>
//         <p>Price: {venue.price}</p>
//         <p>Max Guests: {venue.maxGuests}</p>
//         <p>Rating: {venue.rating}</p>
//       </div>
//     </Card>
//   );
// };

// VenueCard.propTypes = {
//   venue: PropTypes.object.isRequired,
// };

// export default VenueCard;

// src/components/DashboardComponent/VenueCard/index.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdImage } from 'react-icons/md';
import { Card } from '../BookingCard/BookingCard.styles';

const VenueCard = ({ venue, updateVenue, deleteVenue }) => {
  const [updatedVenue, setUpdatedVenue] = useState(venue);

  if (!venue) {
    console.warn('Venue is undefined:', venue);
    return null;
  }

  const handleUpdate = () => {
    updateVenue(venue.id, updatedVenue);
  };

  const handleDelete = () => {
    deleteVenue(venue.id);
  };

  const handleChange = (e) => {
    setUpdatedVenue({ ...updatedVenue, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      {venue.media && Array.isArray(venue.media) && venue.media.length > 0 ? (
        <img src={venue.media[0]} alt={venue.name} />
      ) : (
        <MdImage size={200} color={'var(--primary-color)'} />
      )}
      <div className='mb-2 mt-2'>
        <input
          name='name'
          type='text'
          value={updatedVenue.name}
          onChange={handleChange}
        />
        <textarea
          name='description'
          value={updatedVenue.description}
          onChange={handleChange}
        />
        <input
          name='price'
          type='text'
          value={updatedVenue.price}
          onChange={handleChange}
        />
        <input
          name='maxGuests'
          type='text'
          value={updatedVenue.maxGuests}
          onChange={handleChange}
        />
        <input
          name='rating'
          type='text'
          value={updatedVenue.rating}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Update Venue</button>
        <button onClick={handleDelete}>Delete Venue</button>
      </div>
    </Card>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
  // updateVenue: PropTypes.func.isRequired,
  // deleteVenue: PropTypes.func.isRequired,
};

export default VenueCard;
