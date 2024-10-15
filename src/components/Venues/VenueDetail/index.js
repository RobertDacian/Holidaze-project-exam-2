import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from '../../../contexts/GlobalContext';
import { formatDate } from '../../../utils/dateFormatUtils';
import { VenueDetailsWrapper } from './VenueDetail.styles';
import { fetchVenueDetails } from '../../../api/venues';
import { FiCheck, FiX } from 'react-icons/fi';
import { MdImage } from 'react-icons/md';
import BookingForm from '../../BookingForm';
import { calculateRatingStars } from '../../../utils/ratingUtils';

const VenueDetails = ({ venueId, currentUser }) => {
  const { createBooking } = useGlobal();
  const { id } = useParams();
  const [venueDetails, setVenueDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('location');
  const currentVenueIdRef = useRef(null);

  useEffect(() => {
    const loadVenueDetails = async () => {
      const currentId = id || venueId;

      if (!currentId) {
        console.error('Invalid venueId:', currentId);
        return;
      }

      if (currentVenueIdRef.current !== currentId) {
        try {
          const data = await fetchVenueDetails(currentId);
          setVenueDetails(data);
          currentVenueIdRef.current = currentId;
        } catch (error) {
          console.error('Error fetching venue details:', error);
        }
      }
    };

    if (id || venueId) {
      loadVenueDetails();
    }
  }, [id, venueId, setVenueDetails]);

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
              <span className='p-bold'>
                Address:
                <span className='p-gray '>{venueDetails.location.address}</span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                City:
                <span className='p-gray'>{venueDetails.location.city}</span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                ZIP: <span className='p-gray'>{venueDetails.location.zip}</span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                Country:
                <span className='p-gray'>{venueDetails.location.country}</span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                Continent:
                <span className='p-gray'>
                  {venueDetails.location.continent}
                </span>
              </span>
            </div>
          </div>
        );
      case 'description':
        return <div className='tab-content'>{venueDetails.description}</div>;
      case 'meta':
        return (
          <div className='tab-content'>
            <div className='info'>
              <span className='p-bold'>
                WiFi:
                <span className='p-gray'>
                  {venueDetails.meta.wifi ? <YesIcon /> : <NoIcon />}
                </span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                Parking:
                <span className='p-gray'>
                  {venueDetails.meta.parking ? <YesIcon /> : <NoIcon />}
                </span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                Breakfast:
                <span className='p-gray'>
                  {venueDetails.meta.breakfast ? <YesIcon /> : <NoIcon />}
                </span>
              </span>
            </div>
            <div className='info'>
              <span className='p-bold'>
                Pets allowed:
                <span className='p-gray'>
                  {venueDetails.meta.pets ? <YesIcon /> : <NoIcon />}
                </span>
              </span>
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

            <p>Last Updated: {formatDate(venueDetails.updated)}</p>

            <BookingForm
              venueId={venueDetails.id}
              currentUser={currentUser}
              createBooking={createBooking}
            />
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

