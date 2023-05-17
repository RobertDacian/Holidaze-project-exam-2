// // src/components/DashboardComponent/CreateVenue/index.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
// } from '../../BookingForm/BookingForm.styles';
// import useFormErrors from '../../common/Errors';
// import { Error } from '../../common/Errors/Error.styles';
// import { useGlobal } from '../../../contexts/GlobalContext';

// const CreateVenue = () => {
//   const navigate = useNavigate();
//   const { currentUser, createVenue } = useGlobal();
//   const [venueUrl, setVenueUrl] = useState('');
//   const [venue, setVenue] = useState({
//     name: '',
//     description: '',
//     media: [],
//     price: 0,
//     maxGuests: 0,
//     rating: 0,
//     meta: {
//       wifi: false,
//       parking: false,
//       breakfast: false,
//       pets: false,
//     },
//     location: {
//       address: '',
//       city: '',
//       zip: '',
//       country: '',
//       continent: '',
//       lat: 0,
//       lng: 0,
//     },
//   });

//   const [errors, setError, clearError, clearAllErrors] = useFormErrors({
//     venueError: '',
//     venueSuccess: '',
//   });

//   const handleChange = (e) => {
//     if (e.target.type === 'checkbox') {
//       setVenue((prevState) => ({
//         ...prevState,
//         meta: {
//           ...prevState.meta,
//           [e.target.name]: e.target.checked,
//         },
//       }));
//     } else if (
//       ['address', 'city', 'zip', 'country', 'continent', 'lat', 'lng'].includes(
//         e.target.name
//       )
//     ) {
//       setVenue((prevState) => ({
//         ...prevState,
//         location: {
//           ...prevState.location,
//           [e.target.name]:
//             e.target.name === 'lat' || e.target.name === 'lng'
//               ? Number(e.target.value)
//               : e.target.value,
//         },
//       }));
//     } else {
//       setVenue({ ...venue, [e.target.name]: e.target.value });
//     }
//   };

//   const handleVenueUrlChange = (e) => {
//     setVenueUrl(e.target.value);
//     clearError();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     clearAllErrors();

//     try {
//       const newVenue = {
//         ...venue,
//         media: [venueUrl],
//         price: Number(venue.price),
//         maxGuests: Number(venue.maxGuests),
//         rating: Number(venue.rating),
//       };

//       console.log(newVenue);

//       const venueId = await createVenue(
//         currentUser.name,
//         newVenue,
//         currentUser.token,
//         currentUser.venueManager
//       );

//       // Only navigate to new venue page if the venue was successfully created.
//       if (venueId) {
//         setError(
//           'venueSuccess',
//           'Venue created successfully, navigate to Your Venues tab to see your venue!'
//         );
//         setTimeout(() => {
//           navigate(`/venue-manager-dashboard`);
//         }, 2000);
//       } else {
//         throw new Error('Venue was not created successfully');
//       }
//     } catch (error) {
//       setError('venueError', `Error creating venue: ${error.message}`);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Label htmlFor='name'>Name:</Label>
//         <Input
//           type='text'
//           id='name'
//           name='name'
//           onChange={handleChange}
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='description'>Description:</Label>
//         <Input
//           type='text'
//           id='description'
//           name='description'
//           onChange={handleChange}
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='media'>Media URL:</Label>
//         <Input
//           type='url'
//           id='media'
//           name='media'
//           placeholder='https://example.com/image.jpg'
//           value={venueUrl}
//           onChange={handleVenueUrlChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='price'>Price:</Label>
//         <Input
//           type='number'
//           id='price'
//           name='price'
//           onChange={handleChange}
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='maxGuests'>Max Guests:</Label>
//         <Input
//           type='number'
//           id='maxGuests'
//           name='maxGuests'
//           onChange={handleChange}
//           required
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='rating'>Rating:</Label>
//         <Input
//           type='number'
//           id='rating'
//           name='rating'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='wifi'>Wifi:</Label>
//         <Input type='checkbox' id='wifi' name='wifi' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='parking'>Parking:</Label>
//         <Input
//           type='checkbox'
//           id='parking'
//           name='parking'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='breakfast'>Breakfast:</Label>
//         <Input
//           type='checkbox'
//           id='breakfast'
//           name='breakfast'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='pets'>Pets:</Label>
//         <Input type='checkbox' id='pets' name='pets' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='address'>Address:</Label>
//         <Input
//           type='text'
//           id='address'
//           name='address'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='city'>City:</Label>
//         <Input type='text' id='city' name='city' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='zip'>ZIP:</Label>
//         <Input type='text' id='zip' name='zip' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='country'>Country:</Label>
//         <Input
//           type='text'
//           id='country'
//           name='country'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='continent'>Continent:</Label>
//         <Input
//           type='text'
//           id='continent'
//           name='continent'
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='lat'>Latitude:</Label>
//         <Input type='number' id='lat' name='lat' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Label htmlFor='lng'>Longitude:</Label>
//         <Input type='number' id='lng' name='lng' onChange={handleChange} />
//       </FormGroup>
//       <FormGroup>
//         <Button className='btn' type='submit'>
//           Create Venue
//         </Button>
//       </FormGroup>
//       <FormGroup>
//         <Error>
//           {errors.venueError && <p className='error'>{errors.venueError}</p>}
//           {errors.venueSuccess && (
//             <p className='success'>{errors.venueSuccess}</p>
//           )}
//         </Error>
//       </FormGroup>
//     </Form>
//   );
// };

// export default CreateVenue;

// src/components/DashboardComponent/CreateVenue/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from '../../BookingForm/BookingForm.styles';
import useFormErrors from '../../common/Errors';
import { Error } from '../../common/Errors/Error.styles';
import { useGlobal } from '../../../contexts/GlobalContext';

const CreateVenue = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { currentUser, createVenue } = useGlobal();
  const [venueUrl, setVenueUrl] = useState('');
  const [venue, setVenue] = useState({
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      lat: 0,
      lng: 0,
    },
  });

  const [errors, setError, clearError, clearAllErrors] = useFormErrors({
    venueError: '',
    venueSuccess: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setVenue((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [e.target.name]: e.target.checked,
        },
      }));
    } else if (
      ['address', 'city', 'zip', 'country', 'continent', 'lat', 'lng'].includes(
        e.target.name
      )
    ) {
      setVenue((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [e.target.name]:
            e.target.name === 'lat' || e.target.name === 'lng'
              ? Number(e.target.value)
              : e.target.value,
        },
      }));
    } else {
      setVenue({ ...venue, [e.target.name]: e.target.value });
    }
  };

  const handleVenueUrlChange = (e) => {
    setVenueUrl(e.target.value);
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();

    try {
      const newVenue = {
        ...venue,
        media: [venueUrl],
        price: Number(venue.price),
        maxGuests: Number(venue.maxGuests),
        rating: Number(venue.rating),
      };

      console.log(newVenue);

      const venueId = await createVenue(
        currentUser.name,
        newVenue,
        currentUser.token,
        currentUser.venueManager
      );

      // Only navigate to new venue page if the venue was successfully created.
      if (venueId) {
        setError(
          'venueSuccess',
          'Venue created successfully, you will be redirected to Your Venues tab...'
        );
        setTimeout(() => {
          navigate(`/venue-manager-dashboard`);
          setActiveTab('venues'); // Add this line to switch to the 'venues' tab
        }, 2000);
      } else {
        throw new Error('Venue was not created successfully');
      }
    } catch (error) {
      setError('venueError', `Error creating venue: ${error.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor='name'>Name:</Label>
        <Input
          type='text'
          id='name'
          name='name'
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='description'>Description:</Label>
        <Input
          type='text'
          id='description'
          name='description'
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='media'>Media URL:</Label>
        <Input
          type='url'
          id='media'
          name='media'
          placeholder='https://example.com/image.jpg'
          value={venueUrl}
          onChange={handleVenueUrlChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='price'>Price:</Label>
        <Input
          type='number'
          id='price'
          name='price'
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='maxGuests'>Max Guests:</Label>
        <Input
          type='number'
          id='maxGuests'
          name='maxGuests'
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='rating'>Rating:</Label>
        <Input
          type='number'
          id='rating'
          name='rating'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='wifi'>Wifi:</Label>
        <Input type='checkbox' id='wifi' name='wifi' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='parking'>Parking:</Label>
        <Input
          type='checkbox'
          id='parking'
          name='parking'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='breakfast'>Breakfast:</Label>
        <Input
          type='checkbox'
          id='breakfast'
          name='breakfast'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='pets'>Pets:</Label>
        <Input type='checkbox' id='pets' name='pets' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='address'>Address:</Label>
        <Input
          type='text'
          id='address'
          name='address'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='city'>City:</Label>
        <Input type='text' id='city' name='city' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='zip'>ZIP:</Label>
        <Input type='text' id='zip' name='zip' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='country'>Country:</Label>
        <Input
          type='text'
          id='country'
          name='country'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='continent'>Continent:</Label>
        <Input
          type='text'
          id='continent'
          name='continent'
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='lat'>Latitude:</Label>
        <Input type='number' id='lat' name='lat' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='lng'>Longitude:</Label>
        <Input type='number' id='lng' name='lng' onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Button className='btn' type='submit'>
          Create Venue
        </Button>
      </FormGroup>
      <FormGroup>
        <Error>
          {errors.venueError && <p className='error'>{errors.venueError}</p>}
          {errors.venueSuccess && (
            <p className='success'>{errors.venueSuccess}</p>
          )}
        </Error>
      </FormGroup>
    </Form>
  );
};

export default CreateVenue;
