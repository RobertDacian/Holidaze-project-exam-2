// import React, { useState } from 'react';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import BookingCard from '../BookingCard';
// import ProfileCard from '../ProfileCard';
// import { Grid, Tabs } from './UserDashboard.styles';
// import useUserDashboard from './useUserDashboard';

// const UserDashboard = ({ userId }) => {
//   const { currentUser, userBookings } = useGlobal();

//   const { handleUpdateProfileMedia, handleCancelBooking } =
//     useUserDashboard(userId);

//   const [activeTab, setActiveTab] = useState('bookings');

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
//               </div>
//             </div>
//             {activeTab === 'bookings' && (
//               <div className='tab-content'>
//                 <Grid>
//                   {userBookings.map((booking) => (
//                     <BookingCard
//                       key={booking.id}
//                       booking={booking}
//                       venue={booking.venue}
//                       handleCancelBooking={handleCancelBooking}
//                     />
//                   ))}
//                 </Grid>
//               </div>
//             )}
//             {activeTab === 'profile' && (
//               <div className='tab-content'>
//                 <ProfileCard
//                   profile={currentUser}
//                   updateProfileMedia={handleUpdateProfileMedia}
//                 />
//               </div>
//             )}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import BookingCard from '../BookingCard';
import ProfileCard from '../ProfileCard';
import { Grid, Tabs } from './UserDashboard.styles';
import useUserDashboard from './useUserDashboard';

const UserDashboard = () => {
  const { currentUser, bookings } = useGlobal();
  console.log('User bookings:', bookings);

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
                  {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        venue={booking.venue}
                        handleCancelBooking={handleDeleteBooking}
                      />
                    ))
                  ) : (
                    <p>No bookings found.</p>
                  )}
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
