import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from '../../../contexts/GlobalContext';
import { VenueDetailsWrapper } from './VenueDetail.styles';
import { fetchVenueDetails } from '../../../api/venues';

const VenueDetails = () => {
  const { venueDetails, setVenueDetails } = useGlobal();
  const { id } = useParams();

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
          </div>
        </>
      )}
    </VenueDetailsWrapper>
  );
};

export default VenueDetails;
