import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import BookingCard from '../BookingCard';
import ProfileCard from '../ProfileCard';
import { Grid, Tabs } from './UserDashboard.styles';
import useUserDashboard from '../useDashboard';

const UserDashboard = () => {
  const { currentUser, bookings } = useGlobal();
  const { handleUpdateProfileMedia, handleDeleteBooking } = useUserDashboard();
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
              </div>
            </div>
            {activeTab === 'bookings' && (
              <div className='tab-content'>
                <Grid>
                  {bookings &&
                    bookings
                      .filter((booking) => booking && booking.id)
                      .map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          venueId={booking.venueId}
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
                  profile={currentUser}
                  updateProfileMedia={handleUpdateProfileMedia}
                />
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
