import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import useUserDashboard from '../useDashboard';
import useVenueManagerDashboard from '../useVenueManagerDashboard';
import BookingCard from '../BookingCard';
import ProfileCard from '../ProfileCard';
import VenueCard from '../VenueCard';
import CreateVenue from '../CreateVenue';
import { Grid, Tabs } from './VenueManagerDashboard.styles';

const VenueManagerDashboard = () => {
  const { currentUser, bookings, venues } = useGlobal();
  const { handleUpdateProfileMedia, handleDeleteBooking } = useUserDashboard();
  const { updateVenue, deleteVenue } = useVenueManagerDashboard();
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className='section'>
      <div className='container'>
        <div className='wrapper-center'>
          <h1 className='title'>
            Welcome, {currentUser ? currentUser.name : 'User'}!
          </h1>
          <Tabs>
            <div className='tabs-wrapper'>
              <div className='tabs'>
                <button
                  className={activeTab === 'bookings' ? 'active' : ''}
                  onClick={() => setActiveTab('bookings')}
                >
                  Your Bookings
                </button>
                <button
                  className={activeTab === 'profile' ? 'active' : ''}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={activeTab === 'create' ? 'active' : ''}
                  onClick={() => setActiveTab('create')}
                >
                  Create Venue
                </button>
                <button
                  className={activeTab === 'venues' ? 'active' : ''}
                  onClick={() => setActiveTab('venues')}
                >
                  Your Venues
                </button>
              </div>
            </div>
            {activeTab === 'bookings' && bookings && (
              <div className='tab-content '>
                <Grid>
                  {bookings
                    .filter((booking) => booking && booking.id)
                    .map((booking) => (
                      <BookingCard
                        key={booking.id}
                        venueId={booking.venueId}
                        booking={booking}
                        currentUser={currentUser}
                        handleCancelBooking={handleDeleteBooking}
                        token={currentUser.token}
                      />
                    ))}
                </Grid>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className='tab-content'>
                <ProfileCard
                  currentUser={currentUser}
                  handleUpdateProfileMedia={handleUpdateProfileMedia}
                />
              </div>
            )}
            {activeTab === 'create' && (
              <div className='tab-content'>
                <CreateVenue setActiveTab={setActiveTab} />
              </div>
            )}
            {activeTab === 'venues' && venues && (
              <div className='tab-content '>
                <Grid>
                  {venues
                    .filter((venue) => venue && venue.id)
                    .map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        deleteVenue={deleteVenue}
                        updateVenue={updateVenue}
                      />
                    ))}
                </Grid>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VenueManagerDashboard;
