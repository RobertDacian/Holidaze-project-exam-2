import React, { useEffect, useState } from 'react';
import { MdImage } from 'react-icons/md';
import { useGlobal } from '../../../contexts/GlobalContext';
import { VenuesWrapper, VenueCard } from './AllVenues.styles';
import { fetchVenues } from '../../../api/venues';
import { Link } from 'react-router-dom';
import { calculateRatingStars } from '../../../utils/ratingUtils';
import Filter from '../../Filters';
import useFormErrors from '../../common/Errors';

const VenuesComponent = () => {
  const { venues, setVenues } = useGlobal();
  const [visibleVenues, setVisibleVenues] = useState(9);
  const [errors, setError, clearError] = useFormErrors({
    filterError: '',
  });
  const [errorType, setErrorType] = useState('');

  const [filter, setFilter] = useState({
    location: '',
    guests: '',
  });

  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    const filterVenues = () => {
      const newFilteredVenues = venues.filter((venue) => {
        const locationMatch =
          venue.location.city
            .toLowerCase()
            .includes(filter.location.toLowerCase()) ||
          venue.location.country
            .toLowerCase()
            .includes(filter.location.toLowerCase());
        return locationMatch;
      });

      const guestsMatchingVenues = newFilteredVenues.filter(
        (venue) => venue.maxGuests >= filter.guests
      );

      if (newFilteredVenues.length === 0 && filter.location) {
        setError(
          'filterError',
          "Unfortunately, we couldn't find any venues matching your criteria."
        );
        setErrorType('danger');
        setFilteredVenues([]);
      } else if (guestsMatchingVenues.length > 0) {
        clearError('filterError');
        setFilteredVenues(guestsMatchingVenues);
      } else if (newFilteredVenues.length > 0) {
        setError(
          'filterError',
          'No venues match the guest number you entered, but other options are available in that location.'
        );
        setErrorType('warning');
        setFilteredVenues(newFilteredVenues);
      } else {
        clearError('filterError');
        setFilteredVenues([]);
      }
    };

    filterVenues();
  }, [venues, filter, setError, clearError]);

  const onFilter = (newFilter) => {
    setFilter(newFilter);
    setVisibleVenues(9);
  };

  const onClearFilters = () => {
    setFilter({ location: '', guests: '' });
    clearError('filterError');
  };

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchVenues();
        // console.log('Fetched venues:', data);
        if (Array.isArray(data)) {
          setVenues(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    loadVenues();
  }, [setVenues]);

  const loadMoreVenues = () => {
    setVisibleVenues((prevVisibleVenues) => prevVisibleVenues + 9);
  };
  return (
    <>
      <div className='wrapper-center '>
        <Filter
          onFilter={onFilter}
          onClearFilters={onClearFilters}
          filterErrors={errors}
          filterErrorType={errorType}
        />
      </div>

      <VenuesWrapper>
        {Array.isArray(filteredVenues) &&
          filteredVenues.slice(0, visibleVenues).map((venue) => (
            <VenueCard key={venue.id}>
              <Link to={`/venues/${venue.id}`}>
                {venue.media[0] ? (
                  <img
                    className='card-img'
                    src={venue.media[0]}
                    alt={venue.name}
                  />
                ) : (
                  <MdImage
                    className='card-img'
                    size={200}
                    color={'var(--primary-color)'}
                  />
                )}
                <div className='card-header mt-1 '>
                  <h5>{venue.name}</h5>
                  <p className='p-small'>
                    {venue.location.city}, {venue.location.country}
                  </p>
                </div>
                <div className='card-body price-maxGuests mt-0'>
                  <p className='p-dark'>Price: ${venue.price}</p>
                  <p className='p-gray'>Max Guests: {venue.maxGuests}</p>
                </div>
                <div className='card-footer mt-1'>
                  <div className='rating'>
                    {calculateRatingStars(venue.rating)}
                  </div>
                </div>
              </Link>
            </VenueCard>
          ))}
      </VenuesWrapper>
      {visibleVenues < filteredVenues.length && (
        <div className='wrapper-center mt-3'>
          <button className='btn-secondary' onClick={loadMoreVenues}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default VenuesComponent;
