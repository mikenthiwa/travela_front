import {
  createHotelEstimate,
  createHotelEstimateSuccess,
  createHotelEstimateFailure
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
