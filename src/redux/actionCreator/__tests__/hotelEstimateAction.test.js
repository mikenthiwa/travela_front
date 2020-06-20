import {
  createHotelEstimate,
  createHotelEstimateSuccess,
  createHotelEstimateFailure,
  updateHotelEstimate,
  updateHotelEstimateSuccess,
  updateHotelEstimateFailure,
  deleteHotelEstimate,
  deleteHotelEstimateSuccess,
  deleteHotelEstimateFailure
} from '../hotelEstimateAction';

describe('hotelEstimate Actions', () => {
  describe('Create HotelEstimate Actions', () => {
    it('should return action of type CREATE_HOTEL_ESTIMATE', () => {
      const requestData = {
        country: 'Rwanda',
        estimate: 45678
      };

      const receivedAction = {
        type: 'CREATE_HOTEL_ESTIMATE',
        requestData: {
          country: 'Rwanda',
          estimate: 45678
        },
        closeRequestModal: undefined
      };
      const newAction = createHotelEstimate(requestData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_HOTEL_ESTIMATE_SUCCESS', () => {
      const newEstimate = {
        country: 'Rwanda',
        estimate: 45678
      };

      const receivedAction = {
        type: 'CREATE_HOTEL_ESTIMATE_SUCCESS',
        newEstimate: {
          country: 'Rwanda',
          estimate: 45678
        }
      };
      const newAction = createHotelEstimateSuccess(newEstimate);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_HOTEL_ESTIMATE_FAILURE', () => {
      const error = 'Could not create a new estimate';
      const receivedAction = {
        type: 'CREATE_HOTEL_ESTIMATE_FAILURE',
        error: 'Could not create a new estimate'
      };
      const newAction = createHotelEstimateFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});
describe('Hotel Estimate Actions', () => {
  describe('Update Hotel Estimate Action Creators', () => {
    it('should return action of type UPDATE_HOTEL_ESTIMATE', () => {
      const payload = {
        estimate: 150
      };
      const estimateId = 3;
      const receivedAction = {
        type: 'UPDATE_HOTEL_ESTIMATE',
        estimateId,
        payload: {
          estimate: 150
        }
      };
      const updateAction = updateHotelEstimate(estimateId, payload);
      expect(updateAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_HOTEL_ESTIMATE_SUCCESS', () => {
      const response = {
        success: true,
        message: 'Hotel estimate updated successfully',
        hotelEstimate: {
          id: 3,
          amount: 150,
          regionId: 9
        }
      };
      const receivedAction = {
        response,
        type: 'UPDATE_HOTEL_ESTIMATE_SUCCESS'
      };
      const updateAction = updateHotelEstimateSuccess(response);
      expect(updateAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_HOTEL_ESTIMATE_FAILURE', () => {
      const error = {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            message: 'amount is required and must be a positive number',
            name: 'estimate'
          }
        ]
      };
      const receivedAction = {
        error,
        type: 'UPDATE_HOTEL_ESTIMATE_FAILURE'
      };
      const updateAction = updateHotelEstimateFailure(error);
      expect(updateAction).toEqual(receivedAction);
    });
  });

  describe('Delete Hotel Estimate Action Creators', () => {
    it('should return action of type DELETE_HOTEL_ESTIMATE', () => {
      const estimateId = 3;
      const receivedAction = {
        type: 'DELETE_HOTEL_ESTIMATE',
        estimateId
      };
      const deleteAction = deleteHotelEstimate(estimateId);
      expect(deleteAction).toEqual(receivedAction);
    });
    it('should return action of type DELETE_HOTEL_ESTIMATE_SUCCESS', () => {
      const estimateId = 3;
      const deleteMessage = {
        success: true,
        message: 'Hotel Estimates deleted successfully'
      };
      const receivedAction = {
        estimateId,
        deleteMessage,
        type: 'DELETE_HOTEL_ESTIMATE_SUCCESS'
      };
      const deleteAction = deleteHotelEstimateSuccess(
        deleteMessage,
        estimateId
      );
      expect(deleteAction).toEqual(receivedAction);
    });
    it('should return action of type DELETE_HOTEL_ESTIMATE_FAILURE', () => {
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
        type: 'DELETE_HOTEL_ESTIMATE_FAILURE'
      };
      const updateAction = deleteHotelEstimateFailure(error);
      expect(updateAction).toEqual(receivedAction);
    });
  });
});
