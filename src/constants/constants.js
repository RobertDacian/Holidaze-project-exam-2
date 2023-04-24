// Holidaze-auth base URL
export const API_BASE_URL = 'https://api.noroff.dev/api/v1';

// Holidaze-auth POST register endpoint
export const API_AUTH_REGISTER = '/holidaze/auth/register';
export const API_AUTH_VENUE_MANAGER_REGISTER = '/holidaze/auth/register';

// Holidaze-auth POST login endpoint
export const API_AUTH_LOGIN = `/holidaze/auth/login`;

// Holidaze-profiles GET profiles endpoint
export const API_PROFILES = `/profiles`;
// Holidaze-profiles GET profile endpoint
export const API_PROFILE = `/profiles/:name`;
// Holidaze-profiles PUT profile avatar endpoint
export const API_PROFILE_MEDIA = `/profiles/:name/media`;
// Holidaze-profiles GET profile venues endpoint
export const API_PROFILE_VENUES = `/profiles/:name/venues`;
// Holidaze-profiles GET profile bookings endpoint
export const API_PROFILE_BOOKINGS = `/profiles/:name/bookings`;

// Holidaze-venues GET & POST endpoints
export const API_VENUES = `/venues`;
// Holidaze-venues GET, PUT & DELETE endpoints
export const API_VENUE = `/venues/:id`;

//Holidaze-bookings GET & POST bookings endpoint
export const API_BOOKINGS = `/bookings`;
//Holidaze-bookings GET, PUT & DELETE booking endpoints
export const API_BOOKING = `/bookings/:id`;
