// In src/components/DashboardComponent/VenueManagerDashboard/index.js
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import BookingCard from '../BookingCard';
import ProfileCard from '../ProfileCard';
import { Grid, Tabs } from './VenueManagerDashboard.styles';
import { deleteBooking, createBooking } from '../../../api/bookings';
import { updateProfileMedia } from '../../../api/profiles';
import BookingForm from '../../BookingForm';

const VenueManagerDashboard = ({ venueId }) => {
  const { currentUser, fetchBookings, venueManagerBookings } = useGlobal();
  const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
    try {
      await updateProfileMedia(
        currentUser.name,
        mediaType,
        mediaUrl,
        currentUser.token
      );
    } catch (error) {
      console.error('Error while updating profile media:', error);
    }
  };

  const [activeTab, setActiveTab] = useState('bookings');
  const isVenueManager = currentUser && currentUser.role === 'venue_manager';

  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchBookings(currentUser.id, isVenueManager); // Use isVenueManager variable
    }
  }, [currentUser, fetchBookings, isVenueManager]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, currentUser.token);
      fetchBookings(currentUser.id, true);
    } catch (error) {
      console.error('Error while canceling booking:', error);
    }
  };

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
                  Create Bookings
                </button>
              </div>
            </div>
            {activeTab === 'bookings' && (
              <div className='tab-content'>
                <Grid>
                  {venueManagerBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isVenueManager={isVenueManager}
                      handleCancelBooking={handleCancelBooking}
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
                <BookingForm
                  venueId={venueId}
                  onSubmit={async (bookingData) => {
                    try {
                      await createBooking(
                        currentUser.id,
                        bookingData,
                        currentUser.token
                      );
                      setActiveTab('bookings');
                      fetchBookings(currentUser.id, true);
                    } catch (error) {
                      console.error('Error while creating booking:', error);
                    }
                  }}
                />
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VenueManagerDashboard;
