import listTravelReasons from '../travelReason';
import {
  fetchAllTravelReasons,
  fetchAllTravelReasonsFailure,
  fetchAllTravelReasonsSuccess
} from '../../actionCreator/listTravelReasonsActions';
import mockData from '../../../views/TravelReasons/__mocks__/TravelReasons';

describe('listTravelReasonsReducer', () => {
  const initialState = {
    errors: {},
    travelReasons: [],
    pagination: {},
    isLoading: false
  };
  it('returns initial state on an anonymous action', () => {
    const action = () => ({
      type: 'ANONYMOUS_ACTION'
    });
    const newState = listTravelReasons(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('sets isLoading to true when action is FETCH_ALL_TRAVEL_REASONS', () => {
    const action = fetchAllTravelReasons('?search=bootcamp&&page=1');
    const newState = listTravelReasons(initialState, action);
    const expectedState = {...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new travelReasons and pagination data if action is FETCH_ALL_TRAVEL_REASONS_SUCCESS'
    , () => {
      const { metaData, metaData: { travelReasons, pagination} } = mockData;
      const action = fetchAllTravelReasonsSuccess(metaData);
      const newState = listTravelReasons(initialState, action);
      const expectedState = {...initialState, travelReasons, pagination};
      expect(newState).toEqual(expectedState);
    });

  it('updates state with an error appropriately if action is FETCH_ALL_TRAVEL_REASONS_FAILURE'
    , () => {
      const errors = ['An error occured while fetching your request'];
      const action = fetchAllTravelReasonsFailure(errors);
      const newState = listTravelReasons(initialState, action);
      const expectedState = {...initialState, errors };
      expect(newState).toEqual(expectedState);
    });
});
