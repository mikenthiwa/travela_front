import {
  createFlightEstimate,
  createFlightEstimateFailure,
  createFlightEstimateSuccess,
  updateFlightEstimate,
  updateFlightEstimateFailure,
  updateFlightEstimateSuccess,
  deleteFlightEstimate,
  deleteFlightEstimateFailure,
  deleteFlightEstimateSuccess,
  fetchAllFlightEstimates,
  fetchAllFlightEstimatesFailure,
  fetchAllFlightEstimatesSuccess,
  fetchSingleFlightEstimate
} from '../flightEstimatesActions';

describe('Create Flight Estimate Actions', () => {
  it('should return action of type CREATE_FLIGHT_ESTIMATE', () => {
    const requestData = {
      flightEstimate: 80,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda'
    };

    const receivedAction = {
      type: 'CREATE_FLIGHT_ESTIMATE',
      requestData: {
        flightEstimate: 80,
        originCountry: 'Nigeria',
        destinationCountry: 'Uganda'
      },
      closeRequestModal: undefined
    };
    const newAction = createFlightEstimate(requestData);
    expect(newAction).toEqual(receivedAction);
  });

  it('should return action of type CREATE_FLIGHT_ESTIMATE_SUCCESS', () => {
    const newEstimate = {
      flightEstimate: 80,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda'
    };

    const receivedAction = {
      type: 'CREATE_FLIGHT_ESTIMATE_SUCCESS',
      newEstimate: {
        flightEstimate: 80,
        originCountry: 'Nigeria',
        destinationCountry: 'Uganda'
      }
    };
    const newAction = createFlightEstimateSuccess(newEstimate);
    expect(newAction).toEqual(receivedAction);
  });

  it('should return action of type CREATE_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = 'Could not create a new flight estimate';
    const receivedAction = {
      type: 'CREATE_FLIGHT_ESTIMATE_FAILURE',
      error: 'Could not create a new flight estimate'
    };
    const newAction = createFlightEstimateFailure(error);
    expect(newAction).toEqual(receivedAction);
  });
});

describe('Update Flight Estimate', () => {
  it('should return action of type EDIT_FLIGHT_ESTIMATE', () => {
    const payload = {
      flightstimate: 150
    };
    const estimateId = 3;
    const receivedAction = {
      type: 'EDIT_FLIGHT_ESTIMATE',
      estimateId,
      payload: {
        flightstimate: 150
      }
    };
    const updateAction = updateFlightEstimate(estimateId, payload);
    expect(updateAction).toEqual(receivedAction);
  });

  it('should return action of type EDIT_FLIGHT_ESTIMATE_SUCCESS', () => {
    const response = {
      success: true,
      message: 'Flight Estimate Successfully updated',
      flightEstimate: {
        id: 3,
        originRegion: null,
        destinationRegion: null,
        originCountry: 'Nigeria',
        destinationCountry: 'Uganda',
        createdBy: '2190',
        amount: 150
      }
    };
    const receivedAction = {
      response,
      type: 'EDIT_FLIGHT_ESTIMATE_SUCCESS'
    };
    const updateAction = updateFlightEstimateSuccess(response);
    expect(updateAction).toEqual(receivedAction);
  });

  it('should return action of type EDIT_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = {
      success: false,
      message: 'Validation failed',
      errors: [
        {
          message: 'amount is required and must be a positive number',
          name: 'flightestimate'
        }
      ]
    };
    const receivedAction = {
      error,
      type: 'EDIT_FLIGHT_ESTIMATE_FAILURE'
    };
    const updateAction = updateFlightEstimateFailure(error);
    expect(updateAction).toEqual(receivedAction);
  });
});

describe('Delete Flight Estimate', () => {
  it('should return action of type DELETE_FLIGHT_ESTIMATE', () => {
    const estimateId = 3;
    const receivedAction = {
      type: 'DELETE_FLIGHT_ESTIMATE',
      estimateId
    };
    const deleteAction = deleteFlightEstimate(estimateId);
    expect(deleteAction).toEqual(receivedAction);
  });

  it('should return action of type DELETE_FLIGHT_ESTIMATE_SUCCESS', () => {
    const estimateId = 3;
    const message = {
      success: true,
      message: 'Flight Estimate deleted successfully'
    };
    const receivedAction = {
      estimateId,
      message,
      type: 'DELETE_FLIGHT_ESTIMATE_SUCCESS'
    };
    const deleteAction = deleteFlightEstimateSuccess(message, estimateId);
    expect(deleteAction).toEqual(receivedAction);
  });

  it('should return action of type DELETE_FLIGHT_ESTIMATE_FAILURE', () => {
    const error = {
      success: false,
      message: 'Validation failed',
      errors: [
        {
          message: 'estimateId should be an integer',
          name: 'id'
        }
      ]
    };
    const receivedAction = {
      error,
      type: 'DELETE_FLIGHT_ESTIMATE_FAILURE'
    };
    const updateAction = deleteFlightEstimateFailure(error);
    expect(updateAction).toEqual(receivedAction);
  });
});

describe('Fetch Flight Estimates', () => {
  it('should return action of FETCH_ALL_FLIGHT_ESTIMATES', () => {
    const expectedAction = {
      type: 'FETCH_ALL_FLIGHT_ESTIMATES'
    };
    const newAction = fetchAllFlightEstimates();
    expect(newAction).toEqual(expectedAction);
  })

  it('should return action of FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS', () => {
    const response = { 
      data: {
        flightEstimates: [
          {
            id: 4,
            originRegion: null,
            destinationRegion: null,
            originCountry: "Kenya",
            destinationCountry: "Rwanda",
            createdBy: "2190",
            amount: 408,
          },
          {
            id: 7,
            originRegion: null,
            destinationRegion: null,
            originCountry: "Angola",
            destinationCountry: "Afghanistan",
            createdBy: "2190",
            amount: 400,
          }
        ]
      }
    }
    const {flightEstimates} = response.data
    const expectedAction = {
      type: 'FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS',
      flightEstimates: flightEstimates
    };
    const newAction = fetchAllFlightEstimatesSuccess(response.data);
    expect(newAction).toEqual(expectedAction);
  })

  it('should return action of FETCH_ALL_FLIGHT_ESTIMATES_FAILURE', () => {
    const error = 'An error occurred'
    const expectedAction = {
      type: 'FETCH_ALL_FLIGHT_ESTIMATES_FAILURE',
      error
    };
    const newAction = fetchAllFlightEstimatesFailure(error);
    expect(newAction).toEqual(expectedAction);
  })

  it('should return action of FETCH_SINGLE_FLIGHT_ESTIMATE', () => {
    const response = { 
      data: {
        flightEstimates: [
          {
            id: 4,
            originRegion: null,
            destinationRegion: null,
            originCountry: "Kenya",
            destinationCountry: "Rwanda",
            createdBy: "2190",
            amount: 408,
          }
        ]
      }
    }
    const {id} = response.data.flightEstimates
    const expectedAction = {
      type: 'FETCH_SINGLE_FLIGHT_ESTIMATE',
      estimateId: id
    };
    const newAction = fetchSingleFlightEstimate(id);
    expect(newAction).toEqual(expectedAction);
  })
});
