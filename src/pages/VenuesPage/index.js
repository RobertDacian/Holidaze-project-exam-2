import React from 'react';
import VenuesComponent from '../../components/Venues/AllVenues';

const Venue = () => {
  return (
    <div className='section'>
      <div className='container '>
        <div className='wrapper-center'>
          <h1 className='title'>Venue Page Content</h1>
        </div>
        <VenuesComponent />
      </div>
    </div>
  );
};

export default Venue;
