// import React, { useState } from 'react';
// import { FilterFormWrapper } from './Filter.styles';
// import { Error } from '../../components/common/Errors/Error.styles';
// import useFormErrors from '../common/Errors';

// const Filter = ({ onFilter, onClearFilters }) => {
//   const [location, setLocation] = useState('');
//   const [guests, setGuests] = useState('');
//   const [errors, setError, clearError, clearAllErrors] = useFormErrors({
//     location: '',
//     guests: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!location && !guests) {
//       setError('location', 'Please enter location or number of guests');
//       return;
//     }
//     clearError('location');
//     onFilter({ location, guests });
//   };

//   const handleClearFilters = () => {
//     setLocation('');
//     setGuests('');
//     clearAllErrors();
//     onClearFilters();
//   };

//   return (
//     <FilterFormWrapper>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor='location'>Location</label>
//           <input
//             type='text'
//             id='location'
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder='Location'
//           />
//         </div>
//         <div>
//           <label htmlFor='guests'>Guests</label>
//           <input
//             type='number'
//             id='guests'
//             value={guests}
//             onChange={(e) => setGuests(e.target.value)}
//             min={0}
//             placeholder='Number of guests'
//           />
//         </div>
//         <button type='submit'>Apply Filter</button>
//         <button type='button' onClick={handleClearFilters}>
//           Clear Filter
//         </button>
//       </form>
//       <Error>
//         {errors.location && <p className='error'>{errors.location}</p>}
//         {errors.guests && <p className='error'>{errors.guests}</p>}
//       </Error>
//     </FilterFormWrapper>
//   );
// };

// export default Filter;

import React, { useState } from 'react';
import { FilterFormWrapper } from './Filter.styles';
import { Error } from '../../components/common/Errors/Error.styles';
import useFormErrors from '../common/Errors';

const Filter = ({
  onFilter,
  onClearFilters,
  filterErrors,
  filterErrorType,
}) => {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('');
  const [errors, setError, clearError, clearAllErrors] = useFormErrors({
    location: '',
    guests: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location && !guests) {
      setError('location', 'Please enter location or number of guests');
      return;
    }
    clearError('location');
    onFilter({ location, guests });
  };

  const handleClearFilters = () => {
    setLocation('');
    setGuests('');
    clearAllErrors();
    onClearFilters();
  };

  return (
    <FilterFormWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
          />
        </div>
        <div>
          <label htmlFor='guests'>Guests</label>
          <input
            type='number'
            id='guests'
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={0}
            placeholder='Number of guests'
          />
        </div>
        <button type='submit'>Apply Filter</button>
        <button type='button' onClick={handleClearFilters}>
          Clear Filter
        </button>
      </form>
      <Error>
        {filterErrors.filterError && (
          <p className={filterErrorType === 'warning' ? 'warning' : 'error'}>
            {filterErrors.filterError}
          </p>
        )}
        {errors.location && <p className='error'>{errors.location}</p>}
        {errors.guests && <p className='error'>{errors.guests}</p>}
      </Error>
    </FilterFormWrapper>
  );
};

export default Filter;
