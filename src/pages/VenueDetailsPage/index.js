import React from 'react';
import VenueDetails from '../../components/Venues/VenueDetail';

const VenueDetail = () => {
  return (
    <div className='section'>
      <div className='container '>
        <div className='wrapper-center'>
          <h1 className='title'>VenueDetail Page Content</h1>
          <VenueDetails />
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
