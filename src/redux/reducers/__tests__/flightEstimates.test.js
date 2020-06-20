import listAllFlightEstimates from '../flightEstimates';
import {
  fetchAllFlightEstimates,
  fetchAllFlightEstimatesFailure,
  fetchAllFlightEstimatesSuccess,
  fetchSingleFlightEstimate,
  createFlightEstimate,
  createFlightEstimateFailure,
  createFlightEstimateSuccess,
  deleteFlightEstimate,
  deleteFlightEstimateFailure,
  deleteFlightEstimateSuccess,
  updateFlightEstimate,
  updateFlightEstimateFailure,
  updateFlightEstimateSuccess
} from '../../actionCreator/flightEstimatesActions';
import mockData from '../../../mockData/flightEstimateMockData';

describe('fetch all flight estimates Reducer', () => {
  const initialState = {
    isLoading: false,
    flightEstimates: [],
    selectedEstimate: {},
    flightEstimate: {},
    error: {},
    isDeleting: false,
    updatedEstimate: {
      isSaving: false,
      errors: {},
      data: {}
    }
  };

  it('should return the initial state', () => {
    const initialState = listAllFlightEstimates(undefined, {});
    expect(initialState).toEqual({
      isLoading: false,
      flightEstimates: [],
      selectedEstimate: {},
      flightEstimate: {},
      error: {},
      isDeleting: false,
      updatedEstimate: {
        isSaving: false,
        errors: {},
        data: {}
      }
    });
  });

  it('sets isLoading to true when action is FETCH_ALL_FLIGHT_ESTIMATES', () => {
    const action = fetchAllFlightEstimates();
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new listAllFlightEstimates if action is FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS', () => {
    const { flightEstimates } = mockData;
    const action = fetchAllFlightEstimatesSuccess(flightEstimates);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, flightEstimates: action.flightEstimates };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with an error if action is FETCH_ALL_FLIGHT_ESTIMATES_FAILURE', () => {
    const error = 'An error occured while fetching your request';
    const action = fetchAllFlightEstimatesFailure(error);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, error: action.error };
    expect(newState).toEqual(expectedState);
  });

  it('sets isLoading to true when action is FETCH_SINGLE_FLIGHT_ESTIMATE', () => {
    const { selectedEstimate } = mockData;
    const action = fetchSingleFlightEstimate(selectedEstimate);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, selectedEstimate: {} };
    expect(newState).toEqual(expectedState);
  });

  it('sets selectedEstimate when action is FETCH_SINGLE_FLIGHT_ESTIMATE ', () => {
    const { flightEstimates } = mockData;
    const estimateId = flightEstimates[0].id;
    const action = fetchAllFlightEstimatesSuccess(mockData);
    const newState = listAllFlightEstimates(initialState, action);
    const singleEstimateAction = fetchSingleFlightEstimate(estimateId);
    const newSingleEstimateState = listAllFlightEstimates(newState, singleEstimateAction);
    const expectedState = { ...newState, selectedEstimate: flightEstimates[0] };
    expect(newSingleEstimateState).toEqual(expectedState);
  });

  it('should handle CREATE_FLIGHT_ESTIMATE', () => {
    const { flightEstimate } = mockData;
    const action = createFlightEstimate(flightEstimate);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with an error if action is CREATE_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = 'failed to create estimate';
    const action = createFlightEstimateFailure(error);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, error: { error: action.error } };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with a flight estimate if action is CREATE_FLIGHT_ESTIMATE_SUCESS', () => {
    const { newEstimate } = mockData;
    const action = createFlightEstimateSuccess(newEstimate);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, flightEstimate: action.newEstimate };
    expect(newState).toEqual(expectedState);
  });

  it('sets isDeleting to true when action is DELETE_FLIGHT_ESTIMATE', () => {
    const { flightEstimates } = mockData;
    const estimateId = flightEstimates[0].id;
    const expectedState = { ...initialState, isDeleting: true };
    const action = deleteFlightEstimate(estimateId);
    const newState = listAllFlightEstimates(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('updates state with an error if action is DELETE_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = 'failed to delete flight estimate';
    const action = deleteFlightEstimateFailure(error);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = { ...initialState, error: action.error };
    expect(newState).toEqual(expectedState);
  });

  it('should delete a flight estimate when action is DELETE_FLIGHT_ESTIMATE_SUCCESS', () => {
    const { flightEstimates } = mockData;
    const estimateId = flightEstimates[0].id;
    const action = fetchAllFlightEstimatesSuccess(mockData);
    const newState = listAllFlightEstimates(initialState, action);
    const deleteEstimateAction = deleteFlightEstimateSuccess(
      {
        success: true,
        message: 'Flight Estimate deleted successfully'
      },
      estimateId
    );
    const newFlightEstimateState = listAllFlightEstimates(newState, deleteEstimateAction);
    flightEstimates.splice(0, 1);
    const expectedState = { ...newState, flightEstimates, isDeleting: false };
    expect(newFlightEstimateState).toEqual(expectedState);
  });

  it('sets isSaving to true when action is UPDATE_FLIGHT_ESTIMATE', () => {
    const { flightEstimates } = mockData;
    const estimateId = flightEstimates[0].id;
    const expectedState = {
      ...initialState,
      updatedEstimate: {
        isSaving: true,
        errors: {}
      }
    };
    const action = updateFlightEstimate(estimateId);
    const newState = listAllFlightEstimates(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('updates state with an error if action is UPDATE_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = 'failed to update flight estimate';
    const action = updateFlightEstimateFailure(error);
    const newState = listAllFlightEstimates(initialState, action);
    const expectedState = {
      ...initialState,
      updatedEstimate: {
        isSaving: false,
        errors: action.error
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should set the data when action is UPDATE_FLIGHT_ESTIMATE_SUCCESS', () => {
    const { flightEstimates } = mockData;
    const expectedState = {
      ...initialState,
      updatedEstimate: {
        isSaving: false,
        errors: {},
        data: {
          id: 3,
          originRegion: null,
          destinationRegion: null,
          originCountry: 'Uganda',
          destinationCountry: 'Rwanda',
          createdBy: '2190',
          amount: 300,
          creator: {
            fullName: 'Peace Acio',
            id: 43
          }
        }
      }
    };
    const action = updateFlightEstimateSuccess({
      flightEstimate: flightEstimates[1]
    });
    const newState = listAllFlightEstimates(initialState, action);
    expect(JSON.stringify(newState)).toEqual(JSON.stringify(expectedState));
  });
});
