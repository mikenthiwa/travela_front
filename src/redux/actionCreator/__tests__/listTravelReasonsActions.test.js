import {
  fetchAllTravelReasons,
  fetchAllTravelReasonsFailure,
  fetchAllTravelReasonsSuccess
} from '../listTravelReasonsActions';
import mockData from '../../../views/TravelReasons/__mocks__/TravelReasons';


describe('listTravelReasonsActions', () => {
  it('should return action with type FETCH_TRAVEL_REASONS', () => {
    const action = fetchAllTravelReasons('?page=2&limit=10');
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_REASONS',
      query: '?page=2&limit=10'
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_REASONS_SUCCESS', () => {
    const {metaData, metaData: { pagination, travelReasons }} = mockData;
    const action = fetchAllTravelReasonsSuccess(metaData);
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_REASONS_SUCCESS',
      travelReasons,
      pagination
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_REASONS_FAILURE', () => {
    const errors = { errors: {}};
    const action = fetchAllTravelReasonsFailure(errors);
    const expectedResult = {
      type: 'FETCH_ALL_TRAVEL_REASONS_FAILURE',
      errors
    };
    expect(action).toEqual(expectedResult);
  });
});
