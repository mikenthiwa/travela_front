import {
  createTravelStipend,
  createTravelStipendSuccess,
  createTravelStipendFailure,
  updateTravelStipend,
  updateTravelStipendSuccess,
  updateTravelStipendFailure
} from '../travelStipendsActions';
  
describe('TravelStipends Actions', () => {
  
  describe('Create TravelStipends Actions', () => {
    it('should return action of type CREATE_TRAVEL_STIPEND', () => {
      const requestData = {
        center: 'Kigali, Rwanda',
        stipend: 45678,
      };
  
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: {
          center: 'Kigali, Rwanda',
          stipend: 45678,
        },
        closeRequestModal: undefined
      };
      const newAction = createTravelStipend(requestData);
      expect(newAction).toEqual(receivedAction);
    });
  
    it('should return action of type CREATE_TRAVEL_STIPEND_SUCCESS', () => {
      const newStipend = {
        center: 'Kigali, Rwanda',
        stipend: 45678,
      };
  
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
        newStipend: {
          center: 'Kigali, Rwanda',
          stipend: 45678,
        }
      };
      const newAction = createTravelStipendSuccess(newStipend);
      expect(newAction).toEqual(receivedAction);
    });
  
    it('should return action of type CREATE_TRAVEL_STIPEND_FAILURE', () => {
      const error = 'Could not create a new stipend';
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND_FAILURE',
        error: 'Could not create a new stipend'
      };
      const newAction = createTravelStipendFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });

  describe('Update Travel Stipends Action Creators', () => {

    it('should return action of type EDIT_TRAVEL_STIPEND', () => {
      const payload = {
        stipend: 100000
      };
      const stipendId = 1;
      const receivedAction = {
        type: 'EDIT_TRAVEL_STIPEND',
        stipendId,
        payload: {
          stipend: 100000,
        }
      };
      const newAction = updateTravelStipend(stipendId, payload);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type EDIT_TRAVEL_STIPEND_SUCCESS', () => {
      const response = {
        success: true,
        message: 'Travel stipend updated successfully',
        travelStipend: {
          id: 1,
          amount: 10000,
          centerId: 78901
        }
      };
      const receivedAction = {
        response,
        type: 'EDIT_TRAVEL_STIPEND_SUCCESS'
      };
      const newAction = updateTravelStipendSuccess(response);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type EDIT_TRAVEL_STIPEND_FAILURE', () => {
      const errors = {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            message: 'stipend has not been provided',
            name: 'stipend'
          }
        ]
      };
      const receivedAction = {
        errors,
        type: 'EDIT_TRAVEL_STIPEND_FAILURE'
      };
      const newAction = updateTravelStipendFailure(errors);
      expect(newAction).toEqual(receivedAction);
    });
  });
  
});
  
