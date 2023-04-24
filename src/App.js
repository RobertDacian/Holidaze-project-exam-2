import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import {
  Home,
  Contact,
  Venues,
  UserDashboardPage,
  VenueManagerDashboardPage,
  VenueDetails,
  Login,
  SignUp,
  SuccessfulBooking,
} from './pages';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/venues' element={<Venues />} />
            <Route path='/venues/:id' element={<VenueDetails />} />
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
      </AuthProvider>
    </Router>
  );
}

export default App;
