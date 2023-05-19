import React, { useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext';
import { FormWrapper } from './ProfileCard.styles';

const ProfileCard = () => {
  const { currentUser, updateProfileMedia } = useGlobal();
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfileMedia(
        currentUser.name,
        avatarUrl,
        currentUser.token,
        currentUser.venueManager
      );
      alert('Avatar media updated successfully');
    } catch (error) {
      alert(`Error updating avatar media: ${error.message}`);
    }
  };

  return (
    <div className='wrapper-center'>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={currentUser.name}
              disabled
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={currentUser.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor='avatar'>Avatar:</label>
            <input
              type='url'
              id='avatar'
              name='avatar'
              placeholder='https://example.com/image.jpg'
              value={avatarUrl}
              onChange={handleAvatarUrlChange}
            />
          </div>
          <button className='btn' type='submit'>
            Update Profile
          </button>
        </form>
      </FormWrapper>
    </div>
  );
};

export default ProfileCard;
