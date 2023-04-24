import React from 'react';
import Footer from '../Footer';
import Navigation from '../Navigation';
import { LayoutContainer } from './Layout.styles';

const Layout = ({ children }) => {
  return (
    <>
      <LayoutContainer>
        <Navigation />
        {children}
        <Footer />
      </LayoutContainer>
    </>
  );
};

export default Layout;
