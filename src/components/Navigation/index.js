// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
// import { NavContainer } from './Navigation.styles';
// import Header from '../Header';
// import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
// import { navLinks, authLinks } from '../../constants/navLinks';
// import { useGlobal } from '../../contexts/GlobalContext';

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { currentUser, logout } = useGlobal();
//   const dropdownRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to log out:', error);
//     } finally {
//       setIsMenuOpen(false);
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const authLinksToRender = currentUser ? (
//     <li className='auth-link'>
//       <div className='dropdown'>
//         <button className='dropbtn' onClick={toggleDropdown}>
//           {currentUser && currentUser.avatar ? (
//             <img
//               src={currentUser.avatar}
//               alt={currentUser.name}
//               className='user-avatar'
//             />
//           ) : (
//             <FaUser className='user-avatar-placeholder' />
//           )}
//           {currentUser && currentUser.name ? currentUser.name : 'User'}{' '}
//           <i className={`arrow-down ${isMenuOpen ? 'opened' : ''}`}></i>
//         </button>
//         <div
//           className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}
//         >
//           <NavLink
//             to={
//               currentUser && currentUser.venueManager
//                 ? '/venue-manager-dashboard'
//                 : '/user-dashboard'
//             }
//             onClick={() => {
//               toggleDropdown();
//               setIsMobileMenuOpen(false);
//             }}
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to='/'
//             onClick={() => {
//               handleLogout();
//               setIsMobileMenuOpen(false);
//             }}
//           >
//             Log out
//           </NavLink>
//         </div>
//       </div>
//     </li>
//   ) : (
//     <li className='auth-link'>
//       <div className='dropdown'>
//         <button className='dropbtn' onClick={toggleDropdown}>
//           Account <i className='arrow-down'></i>
//         </button>
//         <div
//           className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}
//         >
//           {authLinks.slice(0, 2).map((link) => {
//             return (
//               <NavLink
//                 key={link.id}
//                 to={link.url}
//                 onClick={() => {
//                   toggleDropdown();
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 {link.text}
//               </NavLink>
//             );
//           })}
//         </div>
//       </div>
//     </li>
//   );

//   return (
//     <NavContainer className='container' isMenuOpen={isMenuOpen}>
//       <div className='nav-center'>
//         <div className='nav-header'>
//           <NavLink to='/venues'>
//             <Header />
//           </NavLink>
//           <button
//             type='button'
//             className='nav-toggle'
//             onClick={toggleMobileMenu}
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         <ul className={`nav-links ${isMobileMenuOpen ? 'show-nav' : ''}`}>
//           <div className='nav-link'>
//             {navLinks.map((link) => {
//               const { id, text, url } = link;
//               return (
//                 <li key={id}>
//                   <NavLink
//                     to={url}
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       setIsMobileMenuOpen(false);
//                     }}
//                   >
//                     {text}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </div>
//           <div className='auth-links' ref={dropdownRef}>
//             {authLinksToRender}
//           </div>
//         </ul>
//       </div>
//     </NavContainer>
//   );
// };

// export default Navigation;
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { NavContainer } from './Navigation.styles';
import Header from '../Header';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { navLinks, authLinks } from '../../constants/navLinks';
import { useGlobal } from '../../contexts/GlobalContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useGlobal();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const authLinksToRender = currentUser ? (
    <li className='auth-link'>
      <div className='dropdown'>
        <button className='dropbtn' onClick={toggleDropdown}>
          {currentUser && currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className='user-avatar'
            />
          ) : (
            <FaUser className='user-avatar-placeholder' />
          )}
          {currentUser && currentUser.name ? currentUser.name : 'User'}{' '}
          <i className={`arrow-down ${isMenuOpen ? 'opened' : ''}`}></i>
        </button>
        <div
          className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}
        >
          <NavLink
            to={
              currentUser && currentUser.venueManager
                ? '/venue-manager-dashboard'
                : '/user-dashboard'
            }
            onClick={() => {
              toggleDropdown();
              setIsMobileMenuOpen(false);
            }}
          >
            Profile
          </NavLink>
          <NavLink
            to='/'
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            Log out
          </NavLink>
        </div>
      </div>
    </li>
  ) : (
    <li className='auth-link'>
      <div className='dropdown'>
        <button className='dropbtn' onClick={toggleDropdown}>
          Account <i className='arrow-down'></i>
        </button>
        <div
          className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}
        >
          {authLinks.slice(0, 2).map((link) => {
            return (
              <NavLink
                key={link.id}
                to={link.url}
                onClick={() => {
                  toggleDropdown();
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.text}
              </NavLink>
            );
          })}
        </div>
      </div>
    </li>
  );

  return (
    <NavContainer className='container' isMenuOpen={isMenuOpen}>
      <div className='nav-center'>
        <div className='nav-header'>
          <NavLink to='/venues'>
            <Header />
          </NavLink>
          <button
            type='button'
            className='nav-toggle'
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'show-nav' : ''}`}>
          <div className='nav-link'>
            {navLinks.map((link) => {
              const { id, text, url } = link;
              return (
                <li key={id}>
                  <NavLink
                    to={url}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </div>
          <div className='auth-links' ref={dropdownRef}>
            {authLinksToRender}
          </div>
        </ul>
      </div>
    </NavContainer>
  );
};

export default Navigation;
