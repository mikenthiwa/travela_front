import hotelEstimates from '../hotelEstimates';
import {
  updateHotelEstimate,
  updateHotelEstimateSuccess,
  updateHotelEstimateFailure,
  deleteHotelEstimate,
  deleteHotelEstimateSuccess,
  deleteHotelEstimateFailure,
  fetchAllHotelEstimatesSuccess,
  fetchSingleHotelEstimate
} from '../../actionCreator/hotelEstimateAction';
import mockData from '../../../mockData/hotelEstimateMockData';

describe('Hotel estimates reducer delete', () => {
  const initialState = {
    isDeleting: false,
    estimates: [],
    error: {}
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = hotelEstimates(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('sets isDeleting to true when action is DELETE_HOTEL_ESTIMATE', () => {
    const { estimates } = mockData;
    const estimateId = estimates[0].id;
    const expectedState = { ...initialState, isDeleting: true };
    const action = deleteHotelEstimate(estimateId);
    const newState = hotelEstimates(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should delete a hotel estimate when action is DELETE_HOTEL_ESTIMATE_SUCCESS', () => {
    const { estimates } = mockData;
    const estimateId = estimates[0].id;
    const action = fetchAllHotelEstimatesSuccess(mockData);
    const newState = hotelEstimates(initialState, action);
    const deleteSuccessAction = deleteHotelEstimateSuccess(
      { success: true, message: 'Hotel Estimates deleted successfully' },
      estimateId
    );
    const otherNewState = hotelEstimates(newState, deleteSuccessAction);
    estimates.splice(0, 1);
    const expectedState = { ...newState, estimates, isDeleting: false };
    expect(otherNewState).toEqual(expectedState);
  });
  it('sets errors when action is DELETE_HOTEL_ESTIMATE_FAILURE', () => {
    const estimateId = 5;
    const action = deleteHotelEstimateFailure(
      { message: 'did not delete' },
      estimateId
    );
    const newState = hotelEstimates(initialState, action);
    const expectedState = {
      ...initialState,
      error: { message: 'did not delete' },
      isDeleting: false
    };
    expect(newState).toEqual(expectedState);
  });
});

describe('hotel estimate reducer update', () => {
  const {
    action: { estimateId, payload },
    estimates,
    selectedEstimate
  } = mockData;

  const initialState = {
    estimates,
    selectedEstimate,
    updatedEstimate: {
      isSaving: false,
      errors: {},
      data: {}
    }
  };
  const error = {
    error: 'Something went wrong'
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = hotelEstimates(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('sets isSaving to true when action is UPDATE_HOTEL_ESTIMATE', () => {
    const expectedState = {
      estimates,
      selectedEstimate,
      updatedEstimate: {
        errors: {},
        isSaving: true
      }
    };
    const action = updateHotelEstimate(estimateId, payload);
    const newState = hotelEstimates(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('shoud set errors when UPDATE_HOTEL_ESTIMATE_FAILURE', () => {
    const expectedState = {
      estimates,
      selectedEstimate,
      hotelEstimate: {},
      updatedEstimate: {
        errors: {
          error: error.error
        },
        isSaving: false
      }
    };
    const action = updateHotelEstimateFailure(error);
    const newState = hotelEstimates(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set the data when UPDATE_HOTEL_ESTIMATE_SUCCESS dispatched', () => {
    const initialState = {
      estimates,
      selectedEstimate,
      updateHotelEstimate: {
        isSaving: false,
        errors: {},
        data: {}
      }
    };
    const expectedState = {
      estimates,
      selectedEstimate,
      updateHotelEstimate: {
        error: {},
        isSaving: false,
        data: {
          id: 53,
          amount: 150,
          createdBy: {
            id: 992,
            name: 'Sylvia Mbugua'
          },
          region: 'South Africa'
        }
      }
    };
    const dispatchedAction = updateHotelEstimateSuccess({
      hotelEstimate: estimates[1]
    });
    const newState = hotelEstimates(initialState, dispatchedAction);
    expect(newState).toEqual(expectedState);
  });

  it('sets selectedEstimate when action is FETCH_SINGLE_HOTEL_ESTIMATE ', ()=>{
    const { estimates } = mockData;
    const estimateId = estimates[0].id;
    const action = fetchAllHotelEstimatesSuccess(mockData);
    const newState = hotelEstimates(initialState, action);
    const singleEstimateAction = fetchSingleHotelEstimate(estimateId);
    const newSingleEstimateState = hotelEstimates(newState, singleEstimateAction);
    const expectedState = {...newState, selectedEstimate: estimates[0]};
    expect(newSingleEstimateState).toEqual(expectedState);
  });

});
