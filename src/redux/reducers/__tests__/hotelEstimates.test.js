import listAllhotelEstimates from '../hotelEstimates';
import {
  fetchAllHotelEstimates,
  fetchAllHotelEstimatesFailure,
  fetchAllHotelEstimatesSuccess,
  fetchSingleHotelEstimate
} from '../../actionCreator/hotelEstimateAction';
import FETCH_SINGLE_HOTEL_ESTIMATE from '../../constants/actionTypes';
import mockData from '../../../mockData/hotelEstimate';
import { createHotelEstimateMock } from '../../__mocks__/reduxMocks';

describe('fetch all hotel estimates Reducer', () => {
  const initialState = {
    error: {},
    estimates: [],
    isLoading: false
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = listAllhotelEstimates(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('sets isLoading to true when action is FETCH_ALL_HOTEL_ESTIMATES', () => {
    const action = fetchAllHotelEstimates();
    const newState = listAllhotelEstimates(initialState, action);
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new listAllhotelEstimates if action is FETCH_ALL_HOTEL_ESTIMATES_SUCCESS', () => {
    const { estimates } = mockData;
    const action = fetchAllHotelEstimatesSuccess(estimates);
    const newState = listAllhotelEstimates(initialState, action);
    const expectedState = { ...initialState, estimates: action.estimates };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with an error if action is FETCH_ALL_HOTEL_ESTIMATES_FAILURE', () => {
    const error = 'An error occured while fetching your request';
    const action = fetchAllHotelEstimatesFailure(error);
    const newState = listAllhotelEstimates(initialState, action);
    const expectedState = { ...initialState, error: action.error };
    expect(newState).toEqual(expectedState);
  });
});

describe('Fetch single hotel estimate reducer', () => {
  const initialState = {
    error: {},
    selectedEstimate: {},
    isLoading: false
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = listAllhotelEstimates(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('sets isLoading to true when action is FETCH_SINGLE_HOTEL_ESTIMATE', () => {
    const selectedEstimate = {
      isLoading: false,
      error: {},
      hotelEstimate: {
        id: 1,
        amount: 1000,
        countryId: null,
        regionId: 1001,
        createdBy: 591,
        deletedAt: null,
        createdAt: '2019-05-27T05:57:40.339Z',
        updatedAt: '2019-05-27T05:57:40.339Z',
        creator: {
          id: 591,
          fullName: 'Andrew Hinga'
        }
      }
    };
    const expectedState = {
      ...initialState,
      selectedEstimate: {}
    };
    expect(
      listAllhotelEstimates(initialState, {
        type: FETCH_SINGLE_HOTEL_ESTIMATE,
        selectedEstimate: {
          estimate: selectedEstimate.hotelEstimate
        }
      })
    ).toEqual(expectedState);
  });
  it('sets selectedEstimate when action is FETCH_SINGLE_ESTIMATE ', () => {
    const { estimates } = mockData;
    const estimateId = estimates[0].id;
    const action = fetchAllHotelEstimatesSuccess(mockData);
    const newState = listAllhotelEstimates(initialState, action);
    const singleEstimateAction = fetchSingleHotelEstimate(estimateId);
    const newSingleEstimateState = listAllhotelEstimates(
      newState,
      singleEstimateAction
    );
    const expectedState = { ...newState, selectedEstimate: estimates[0] };
    expect(newSingleEstimateState).toEqual(expectedState);
  });
});

describe('Create Estimate reducer', () => {
  let initialState = {
    isLoading: false,
    error: '',
    hotelEstimate: {}
  };

  let action, newState, receivedState, error;

  const requestObj = { ...createHotelEstimateMock.requestObj };

  it('should return initial state', () => {
    expect(listAllhotelEstimates(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('should handle CREATE_HOTEL_ESTIMATE', () => {
    action = {
      type: 'CREATE_HOTEL_ESTIMATE',
      requestData: { ...requestObj }
    };

    newState = listAllhotelEstimates(initialState, action);
    receivedState = {
      ...initialState,
      isLoading: true
    };

    expect(newState).toEqual(receivedState);
  });

  it('should handle CREATE_HOTEL_ESTIMATE_FAILURE', () => {
    error = 'failed to add new estimate';
    action = {
      type: 'CREATE_HOTEL_ESTIMATE_FAILURE',
      error
    };

    newState = listAllhotelEstimates(initialState, action);
    receivedState = {
      ...initialState,
      isLoading: false,
      error: {
        error: 'failed to add new estimate'
      },
      hotelEstimate: {}
    };
    expect(newState).toEqual(receivedState);
  });

  it('should handle CREATE_HOTEL_ESTIMATE_SUCCESS', () => {
    initialState = {
      hotelEstimate: {}
    };
    action = {
      type: 'CREATE_HOTEL_ESTIMATE_SUCCESS',
      newEstimate: { ...requestObj }
    };

    newState = listAllhotelEstimates(initialState, action);
    receivedState = {
      isLoading: false,
      hotelEstimate: { country: 'Rwanda', estimate: 100 },
      error: {}
    };

    expect(newState).toEqual(receivedState);
    expect(
      listAllhotelEstimates(newState, action).hotelEstimate.country
    ).toMatch('Rwanda');
  });
});
