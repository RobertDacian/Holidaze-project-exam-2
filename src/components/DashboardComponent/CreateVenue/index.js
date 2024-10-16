import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormWrapper,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TextArea,
} from './CreateVenue.styles';
import useFormErrors from '../../common/Errors';
import { Error } from '../../common/Errors/Error.styles';
import { useGlobal } from '../../../contexts/GlobalContext';
import CheckboxDropdown from '../../common/CheckboxDropdown';
import { API_KEY } from '../../../constants/constants';

const CreateVenue = ({
  setActiveTab,
  isUpdate = false,
  onUpdate,
  venueDetails = {},
}) => {
  const navigate = useNavigate();
  const { currentUser, createVenue } = useGlobal();
  const [venueUrl, setVenueUrl] = useState('');

  const [venue, setVenue] = useState({
    name: '',
    description: '',
    media: [],
    price: 1,
    maxGuests: 1,
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
    },
  });

  useEffect(() => {
    if (isUpdate) {
      setVenue(venueDetails);
      setVenueUrl(venueDetails.media[0]);
    }
  }, [isUpdate, venueDetails]);

  const [errors, setError, clearError, clearAllErrors] = useFormErrors({
    venueError: '',
    venueSuccess: '',
    name: '',
    description: '',
    media: '',
    price: '',
    maxGuests: '',
  });

  const handleCheckboxChange = (option) => {
    setVenue((prevState) => ({
      ...prevState,
      meta: {
        ...prevState.meta,
        [option.value]: !prevState.meta[option.value],
      },
    }));
  };

  const handleChange = (e) => {
    if (
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

  const handleCreateVenueClick = (e) => {
    e.preventDefault();

    if (isUpdate) {
      const updatedVenue = {
        ...venue,
        media: venueUrl ? [venueUrl] : [],
      };
      onUpdate(updatedVenue);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    clearAllErrors();

    try {
      if (venue.name === '') {
        setError('name', 'Name is required.');
        return;
      }

      if (venue.description === '') {
        setError('description', 'Description is required.');
        return;
      }

      if (venue.price <= 0) {
        setError('price', 'Price must be a positive number.');
        return;
      }

      if (venue.maxGuests <= 0) {
        setError('maxGuests', 'Max Guests must be a positive number.');
        return;
      }

      const newVenue = {
        ...venue,
        media: venueUrl ? [venueUrl] : [],
        price: Number(venue.price),
        maxGuests: Number(venue.maxGuests),
        rating: Number(venue.rating),
        meta: venue.meta,
      };

      if (isUpdate) {
        onUpdate(newVenue);
      } else {
        const venueId = await createVenue(
          currentUser.name,
          newVenue,
          currentUser.token,
          API_KEY,
          currentUser.venueManager
        );

        if (venueId) {
          setError(
            'venueSuccess',
            'Venue created successfully, you will be redirected to Your Venues tab...'
          );

          setTimeout(() => {
            navigate(`/venue-manager-dashboard`);
            setActiveTab('venues');
          }, 2000);
        } else {
          throw new Error('Venue was not created successfully');
        }
      }
    } catch (error) {
      setError('venueError', `Error creating venue: ${error.message}`);
    }
  };

  const metaOptions = [
    { value: 'wifi', label: 'Wifi' },
    { value: 'parking', label: 'Parking' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'pets', label: 'Pets' },
  ];

  return (
    <FormWrapper>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label htmlFor='name'>Name:</Label>
          <Input
            type='text'
            id='name'
            name='name'
            value={venue.name}
            onChange={handleChange}
            required
            placeholder='Venue name'
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor='description'>Description:</Label>
          <TextArea
            type='text'
            id='description'
            name='description'
            value={venue.description}
            onChange={handleChange}
            required
            placeholder='Venue description'
          />
          {errors.description && <p className='error'>{errors.description}</p>}
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
        <FormGroup className='numbers'>
          <div className='small'>
            <Label htmlFor='price'>Price:</Label>

            <Input
              type='number'
              id='price'
              name='price'
              value={venue.price}
              min='1'
              onChange={handleChange}
              placeholder='Ex. 200'
              required
            />
            {errors.price && <p className='error'>{errors.price}</p>}
          </div>
          <div className='small'>
            <Label htmlFor='maxGuests'>Max Guests:</Label>
            <Input
              type='number'
              id='maxGuests'
              name='maxGuests'
              value={venue.maxGuests}
              min='1'
              onChange={handleChange}
              placeholder='Ex. 8'
              required
            />
            {errors.maxGuests && <p className='error'>{errors.maxGuests}</p>}
          </div>
          <div className='small'>
            <Label htmlFor='rating'>Rating:</Label>
            <Input
              type='number'
              id='rating'
              name='rating'
              value={venue.rating}
              min='0'
              onChange={handleChange}
              placeholder='Ex. 5'
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='meta'></Label>
          <CheckboxDropdown
            options={metaOptions.map((option) => ({
              ...option,
              checked: venue.meta[option.value],
            }))}
            label='Meta'
            onChange={handleCheckboxChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor='address'>Address:</Label>
          <Input
            type='text'
            id='address'
            name='address'
            value={venue.location.address}
            onChange={handleChange}
            placeholder='Venue address'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='city'>City:</Label>
          <Input
            type='text'
            id='city'
            name='city'
            value={venue.location.city}
            onChange={handleChange}
            placeholder='In what city is the venue'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='zip'>ZIP:</Label>
          <Input
            type='text'
            id='zip'
            name='zip'
            value={venue.location.zip}
            onChange={handleChange}
            placeholder='The zip code'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='country'>Country:</Label>
          <Input
            type='text'
            id='country'
            name='country'
            value={venue.location.country}
            onChange={handleChange}
            placeholder='In what country is the venue'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='continent'>Continent:</Label>
          <Input
            type='text'
            id='continent'
            name='continent'
            value={venue.location.continent}
            onChange={handleChange}
            placeholder='On what continent is the venue'
          />
        </FormGroup>
        <FormGroup>
          <Button
            className='btn'
            type='submit'
            onClick={handleCreateVenueClick}
          >
            {isUpdate ? 'Update Venue' : 'Create Venue'}
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
    </FormWrapper>
  );
};

export default CreateVenue;

