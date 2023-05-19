// // src/components/DashboardComponent/VenueManagerDashboard/UpdateDeleteVenue/index.js

// import React, { useState } from 'react';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import { UpdateDeleteVenueStyles } from './UpdateDeleteVenueStyles.styles';
// import CreateVenue from '../../DashboardComponent/CreateVenue';

// const UpdateDeleteVenue = ({
//   venue,
//   isOpen,
//   onClose,
//   handleUpdateVenue,
//   handleDeleteVenue,
// }) => {
//   const { currentUser } = useGlobal();
//   const [errorMessage, setErrorMessage] = useState('');

//   const onHandleUpdateVenue = async (venueData) => {
//     try {
//       await handleUpdateVenue(venue.id, venueData);
//       onClose();
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   const onHandleDeleteVenue = async () => {
//     try {
//       await handleDeleteVenue(venue.id);
//       onClose();
//     } catch (error) {
//       console.log('Error deleting venue:', error);
//       setErrorMessage('An error occurred while deleting the venue.');
//     }
//   };

//   return (
//     <UpdateDeleteVenueStyles>
//       {isOpen && (
//         <div className='modal-overlay'>
//           <div className='modal-content'>
//             <h4>Update {currentUser.name}'s Venue</h4>
//             <CreateVenue
//               isUpdate={true}
//               onUpdate={onHandleUpdateVenue}
//               venueDetails={venue}
//               errorMessage={errorMessage}
//             />
//             <button
//               className='btn btn-outline-red '
//               onClick={onHandleDeleteVenue}
//             >
//               Delete Venue
//             </button>
//             <button className='btn btn-close ' onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </UpdateDeleteVenueStyles>
//   );
// };

// export default UpdateDeleteVenue;

// src/components/DashboardComponent/VenueManagerDashboard/UpdateDeleteVenue/index.js

import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import { UpdateDeleteVenueStyles } from './UpdateDeleteVenueStyles.styles';
import CreateVenue from '../../DashboardComponent/CreateVenue';

const UpdateDeleteVenue = ({
  venue,
  isOpen,
  onClose,
  handleUpdateVenue,
  handleDeleteVenue,
}) => {
  const { currentUser } = useGlobal();
  const [errorMessage, setErrorMessage] = useState('');

  const onHandleUpdateVenue = async (venueData) => {
    try {
      await handleUpdateVenue(venue.id, venueData);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onHandleDeleteVenue = async () => {
    try {
      await handleDeleteVenue(venue.id);
      onClose();
    } catch (error) {
      console.log('Error deleting venue:', error);
      setErrorMessage('An error occurred while deleting the venue.');
    }
  };

  return (
    <UpdateDeleteVenueStyles>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h4>Update {currentUser.name}'s Venue</h4>
            <CreateVenue
              isUpdate={true}
              onUpdate={onHandleUpdateVenue}
              venueDetails={venue}
              errorMessage={errorMessage}
            />
            <button
              className='btn btn-outline-red '
              onClick={onHandleDeleteVenue}
            >
              Delete Venue
            </button>
            <button className='btn btn-close ' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </UpdateDeleteVenueStyles>
  );
};

export default UpdateDeleteVenue;
