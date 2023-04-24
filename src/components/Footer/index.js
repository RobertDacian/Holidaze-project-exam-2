import React from 'react';
import { FooterContainer } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
