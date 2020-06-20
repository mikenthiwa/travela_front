import travelCosts from '../travelCosts';
import {
  fetchTravelCostsByLocation,
  fetchTravelCostsByLocationSuccess,
  fetchTravelCostsByLocationFailure
} from '../../actionCreator/travelCostsActions';


describe('TravelCostsReducer', () => {
  const initialState = {
    error: {},
    stipends: [],
    flightCosts: [],
    hotelEstimates: [],
    isLoading: false
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = travelCosts(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('sets isLoading to true when action is FETCH_TRAVEL_COSTS_BY_LOCATION', () => {
    const action = fetchTravelCostsByLocation();
    const newState = travelCosts(initialState, action);
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new travelcosts if action is FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS'
    , () => {
      const travelCostsData = {
        travelStipends: [],
        flightCosts: [],
        hotelEstimates: [],
      };
      const action = fetchTravelCostsByLocationSuccess(travelCostsData);
      const newState = travelCosts(initialState, action);
      const expectedState = { ...initialState, 
        stipends: [],
        flightCosts: [],
        hotelEstimates: [],
        isLoading: false 
      };
      expect(newState).toEqual(expectedState);
    });
  it('updates state with an error if action is FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE'
    , () => {
      const error = 'An error occured while fetching your request';
      const action = fetchTravelCostsByLocationFailure(error);
      const newState = travelCosts(initialState, action);
      const expectedState = {...initialState, error: { error: action.error}, travelCosts: {} };
      expect(newState).toEqual(expectedState);
    });
});
