import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { GlobalProvider } from './contexts/GlobalContext';
import {
  Home,
  Contact,
  VenuesPage,
  UserDashboardPage,
  VenueManagerDashboardPage,
  VenueDetailsPage,
  Login,
  SignUp,
  SuccessfulBooking,
} from './pages';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/venues' element={<VenuesPage />} />
            <Route path='/venues/:id' element={<VenueDetailsPage />} />
            <Route path='/user-dashboard' element={<UserDashboardPage />} />
            <Route
              path='/venue-manager-dashboard'
              element={<VenueManagerDashboardPage />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/booking/success' element={<SuccessfulBooking />} />
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </GlobalProvider>
    </Router>
  );
}

export default App;
