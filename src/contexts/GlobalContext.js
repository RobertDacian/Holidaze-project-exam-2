// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Auth Context
// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem('currentUser', JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem('currentUser');
//     }
//   }, [currentUser]);

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
//     console.log('User logged out and local storage cleared');
//   };

//   const value = {
//     currentUser,
//     setCurrentUser,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Venues Context
// const VenuesContext = createContext();

// export const useVenues = () => {
//   return useContext(VenuesContext);
// };

// export const VenuesProvider = ({ children }) => {
//   const [venues, setVenues] = useState([]);

//   const value = {
//     venues,
//     setVenues,
//   };

//   return (
//     <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

// Global Context
const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [venues, setVenues] = useState([]);
  const [venueDetails, setVenueDetails] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out and local storage cleared');
  };

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    venues,
    setVenues,
    venueDetails,
    setVenueDetails,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
