// src/components/DashboardComponent/VenueManagerDashboard/useVenueManagerDashboard.js
import { useEffect } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import * as venuesAPI from '../../api/venues';

const useVenueManagerDashboard = () => {
  const { currentUser, setVenues, fetchUserVenuesFromAPI } = useGlobal();

  useEffect(() => {
    if (currentUser) {
      fetchUserVenuesFromAPI();
    }
  }, [currentUser, fetchUserVenuesFromAPI]);

  const updateVenue = async (venueId, venueData) => {
    try {
      await venuesAPI.updateVenue(venueId, venueData, currentUser.token);
      fetchUserVenuesFromAPI(); // Refresh venues after updating
    } catch (error) {
      console.log('Error updating venue:', error);
      throw error;
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      await venuesAPI.deleteVenue(venueId, currentUser.token);
      // Filter out the deleted venue
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  return {
    updateVenue,
    deleteVenue,
  };
};

export default useVenueManagerDashboard;
