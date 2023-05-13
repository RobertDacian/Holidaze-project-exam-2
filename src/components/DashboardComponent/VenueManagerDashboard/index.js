// // In src/components/DashboardComponent/VenueManagerDashboard/index.js
// import React, { useState, useEffect } from 'react';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import BookingCard from '../BookingCard';
// import ProfileCard from '../ProfileCard';
// import { Grid, Tabs } from './VenueManagerDashboard.styles';
// import { deleteBooking } from '../../../api/bookings';
// import { updateProfileMedia } from '../../../api/profiles';
// // import BookingForm from '../../BookingForm';

// const VenueManagerDashboard = ({ venueId }) => {
//   const { currentUser, fetchBookings, venueManagerBookings } = useGlobal();

//   const handleUpdateProfileMedia = async (mediaType, mediaUrl) => {
//     try {
//       await updateProfileMedia(
//         currentUser.name,
//         mediaType,
//         mediaUrl,
//         currentUser.token
//       );
//     } catch (error) {
//       console.error('Error while updating profile media:', error);
//     }
//   };

//   const [activeTab, setActiveTab] = useState('bookings');
//   const isVenueManager = currentUser && currentUser.role === 'venue_manager';

//   useEffect(() => {
//     if (currentUser && currentUser.id && isVenueManager) {
//       fetchBookings(currentUser.id, true);
//     }
//   }, [currentUser, fetchBookings, isVenueManager]);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       await deleteBooking(bookingId, currentUser.token);
//       fetchBookings(currentUser.id, true);
//     } catch (error) {
//       console.error('Error while canceling booking:', error);
//     }
//   };

//   return (
//     <div className='section'>
//       <div className='container'>
//         <div className='wrapper-center'>
//           <h1 className='title'>
//             Welcome, {currentUser ? currentUser.name : 'User'}!
//           </h1>
//           <Tabs>
//             <div className='tabs-wrapper'>
//               <div className='tabs'>
//                 <button
//                   className={activeTab === 'bookings' ? 'active' : ''}
//                   onClick={() => setActiveTab('bookings')}
//                 >
//                   Your Bookings
//                 </button>
//                 <button
//                   className={activeTab === 'profile' ? 'active' : ''}
//                   onClick={() => setActiveTab('profile')}
//                 >
//                   Profile
//                 </button>
//                 <button
//                   className={activeTab === 'create' ? 'active' : ''}
//                   onClick={() => setActiveTab('create')}
//                 >
//                   Create Venue
//                 </button>
//               </div>
//             </div>
//             {activeTab === 'bookings' && venueManagerBookings && (
//               <div className='tab-content'>
//                 <Grid>
//                   {venueManagerBookings
//                     .filter((booking) => booking && booking.id)
//                     .map((booking) => (
//                       <BookingCard
//                         key={booking.id}
//                         booking={booking}
//                         currentUser={currentUser}
//                         handleCancelBooking={handleCancelBooking}
//                         token={currentUser.token}
//                       />
//                     ))}
//                 </Grid>
//               </div>
//             )}
//             {activeTab === 'profile' && (
//               <div className='tab-content'>
//                 <ProfileCard
//                   currentUser={currentUser}
//                   handleUpdateProfileMedia={handleUpdateProfileMedia}
//                 />
//               </div>
//             )}
//             {activeTab === 'create' && <div className='tab-content'></div>}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VenueManagerDashboard;
// In src/components/DashboardComponent/VenueManagerDashboard/index.js
import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import useUserDashboard from '../UserDashboard/useUserDashboard';
import BookingCard from '../BookingCard';
import ProfileCard from '../ProfileCard';
import { Grid, Tabs } from './VenueManagerDashboard.styles';

const VenueManagerDashboard = () => {
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
                <button
                  className={activeTab === 'create' ? 'active' : ''}
                  onClick={() => setActiveTab('create')}
                >
                  Create Venue
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
            {activeTab === 'create' && <div className='tab-content'></div>}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VenueManagerDashboard;
