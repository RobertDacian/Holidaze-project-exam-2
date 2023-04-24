import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './Header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <NavLink className='header-link' to='/' exact>
        <h3>Holiodaze</h3>
      </NavLink>
    </HeaderContainer>
  );
};

export default Header;