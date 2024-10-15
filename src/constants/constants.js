// Noroff API base URL for version 2
export const API_BASE_URL = 'https://v2.api.noroff.dev';

// Authentication POST register and login endpoints
export const API_AUTH_REGISTER = '/auth/register';
export const API_AUTH_LOGIN = '/auth/login';
export const API_KEY_CREATE = '/auth/create-api-key'; // New API key creation endpoint

// Profiles-related endpoints
export const API_PROFILES = '/holidaze/profiles';              // GET all profiles
export const API_PROFILE = '/holidaze/profiles/:name';         // GET single profile
export const API_PROFILE_MEDIA = '/holidaze/profiles/:name/media';  // PUT profile avatar (now uses media model)
export const API_PROFILE_VENUES = '/holidaze/profiles/:name/venues'; // GET user's venues
export const API_PROFILE_BOOKINGS = '/holidaze/profiles/:name/bookings'; // GET user's bookings

// Venues-related endpoints
export const API_VENUES = '/holidaze/venues';                 // GET all venues, POST new venue
export const API_VENUE = '/holidaze/venues/:id';              // GET, PUT, DELETE single venue

// Bookings-related endpoints
export const API_BOOKINGS = '/holidaze/bookings';             // GET all bookings, POST new booking
export const API_BOOKING = '/holidaze/bookings/:id';          // GET, PUT, DELETE single booking

// General pagination and sorting parameters can be added to queries as needed
export const PAGINATION_QUERY = '?page=';

