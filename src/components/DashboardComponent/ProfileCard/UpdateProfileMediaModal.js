// // src/components/DashboardComponent/UserDashboard/ProfileCard/UpdateProfileMediaModal.js
// import React, { useState } from 'react';
// import { useGlobal } from '../../../../contexts/GlobalContext';
// import { ModalStyles } from './UpdateProfileMediaModal.styles';

// const UpdateProfileMediaModal = ({ isOpen, onClose, onUpdateProfileMedia }) => {
//   const [mediaUrl, setMediaUrl] = useState('');
//   const { currentUser } = useGlobal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting mediaUrl:', mediaUrl);
//     onUpdateProfileMedia('avatar', mediaUrl);
//   };

//   const handleInputChange = (e) => {
//     setMediaUrl(e.target.value);
//   };

//   return (
//     <ModalStyles>
//       {isOpen && (
//         <div className='modal-overlay'>
//           <div className='modal-content'>
//             <h2>Update {currentUser.name}'s Avatar</h2>
//             <form onSubmit={handleSubmit}>
//               <label htmlFor='mediaUrl'>Avatar URL:</label>
//               <input
//                 type='url'
//                 id='mediaUrl'
//                 placeholder='Enter image URL'
//                 value={mediaUrl}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button className='btn btn-outline-green' type='submit'>
//                 Update
//               </button>
//             </form>
//             <button className='btn' onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </ModalStyles>
//   );
// };

// export default UpdateProfileMediaModal;

// src/components/DashboardComponent/UserDashboard/ProfileCard/UpdateProfileMediaModal.js
// import React, { useState } from 'react';
// import { useGlobal } from '../../../contexts/GlobalContext';
// import { ModalStyles } from './UpdateProfileMediaModal.styles';

// const UpdateProfileMediaModal = ({ isOpen, onClose }) => {
//   const [mediaUrl, setMediaUrl] = useState('');
//   const { currentUser, updateProfileMedia } = useGlobal();
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setMediaUrl(value);
//     setErrorMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProfileMedia(mediaUrl);
//       setMediaUrl(''); // Clear mediaUrl after successful update
//       onClose();
//     } catch (error) {
//       console.log('Error updating profile media:', error);
//       setErrorMessage('An error occurred while updating the profile media.');
//     }
//   };

//   return (
//     <ModalStyles>
//       {isOpen && (
//         <div className='modal-overlay'>
//           <div className='modal-content'>
//             <h2>Update {currentUser.name}'s Avatar</h2>
//             <form onSubmit={handleSubmit}>
//               <label htmlFor='mediaUrl'>Avatar URL:</label>
//               <input
//                 type='url'
//                 id='mediaUrl'
//                 placeholder='Enter image URL'
//                 value={mediaUrl}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errorMessage && <p className='error-message'>{errorMessage}</p>}
//               <button
//                 className='btn btn-outline-green'
//                 type='submit'
//                 disabled={!!errorMessage}
//               >
//                 Update
//               </button>
//             </form>
//             <button className='btn' onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </ModalStyles>
//   );
// };

// export default UpdateProfileMediaModal;
