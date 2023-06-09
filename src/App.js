import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { GlobalProvider } from './contexts/GlobalContext';
import {
  VenuesPage,
  UserDashboardPage,
  VenueManagerDashboardPage,
  VenueDetailsPage,
  Login,
  SignUp,
} from './pages';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<VenuesPage />} />
            <Route path='/venues' element={<VenuesPage />} />
            <Route path='/venues/:id' element={<VenueDetailsPage />} />
            <Route path='/user-dashboard' element={<UserDashboardPage />} />
            <Route
              path='/venue-manager-dashboard'
              element={<VenueManagerDashboardPage />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Layout>
      </GlobalProvider>
    </Router>
  );
}

export default App;
