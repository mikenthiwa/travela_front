import {
  FETCH_TRAVEL_COSTS_BY_LOCATION,
  FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
  FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE
} from '../../constants/actionTypes';
import {
  fetchTravelCostsByLocation,
  fetchTravelCostsByLocationSuccess,
  fetchTravelCostsByLocationFailure
} from '../travelCostsActions';

describe('TravelStipends Actions', () => {

  describe('GET TravelCosts Actions', () => {
    it('should return action of type FETCH_TRAVEL_COSTS_BY_LOCATION', () => {
      const locations =[
        {
          origin: 'Nigeria',
          destination: 'Kenya'
        }
      ];
      const receivedAction = {
        type: FETCH_TRAVEL_COSTS_BY_LOCATION,
        locations
      };
      const newAction = fetchTravelCostsByLocation(locations);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS', () => {
      const travelCosts = {
        travelStipends: [],
        flightCosts: [],
        hotelEstimates: []
      };

      const receivedAction = {
        type: FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
        travelCosts
      };
      const newAction = fetchTravelCostsByLocationSuccess(travelCosts);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE', () => {
      const error = 'Could not get travelCosts by location';
      const receivedAction = {
        type: FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE,
        error
      };
      const newAction = fetchTravelCostsByLocationFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});

