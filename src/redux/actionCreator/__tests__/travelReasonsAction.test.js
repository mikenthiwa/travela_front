import * as types from '../../constants/actionTypes';
import * as actions from '../travelReasonsActions';


const actionsTester = (action, TYPE, expected) => (...args) =>  {
  expect(action(...args)).toEqual({
    type: TYPE,
    ...expected
  });
};


describe('Travel Reasons actions', () => {
  describe('Create new Travel Reasons', () => {
    it('should return action type CREATE_TRAVEL_REASON', () => {
      const body = {
        title: 'title',
        description: 'description'
      };
      const expectedAction = {
        type: types.CREATE_TRAVEL_REASON,
        body
      };
      actionsTester(
        actions.createTravelReason,
        types.CREATE_TRAVEL_REASON,
        { body}
      )(body);
    });

    it('should return action type CREATE_TRAVEL_REASON_SUCCESS', () => {
      const response = {
        id: 1,
        error: {},
        travelReason: {}
      };

      actionsTester(
        actions.createTravelReasonSuccess,
        types.CREATE_TRAVEL_REASON_SUCCESS,
        {response}
      )(response);
    });

    it('should return action type CREATE_TRAVEL_REASON_FAILURE', () => {
      const error = 'Error creating travel reason';
      actionsTester(
        actions.createTravelReasonFailure,
        types.CREATE_TRAVEL_REASON_FAILURE,
        {error}
      )(error);
    });

    it('should return action type FETCH_TRAVEL_REASON', () => {
      const id = 1;
      actionsTester(
        actions.fetchTravelReason,
        types.FETCH_TRAVEL_REASON,
        {
          travelReasonId: id }
      )(id);
    });

    it('should return action type EDIT_TRAVEL_REASON', () => {
      const body = {
        title: 'This is a title',
        description: 'This is a description'
      };

      actionsTester(
        actions.editTravelReason,
        types.EDIT_TRAVEL_REASON,
        {
          body
        }
      )(body);
    });

    it('should return action type EDIT_TRAVEL_REASON_SUCCESS', () => {
      const response = {
        travelReason: {
          id: 1
        }
      };

      actionsTester(
        actions.editTravelReasonSuccess,
        types.EDIT_TRAVEL_REASON_SUCCESS,
        {
          response
        }
      )(response);
    });

    it('should return action type EDIT_TRAVEL_REASON_FAILURE', () => {
      const error = {
        message: 'Something failed'
      };

      actionsTester(
        actions.editTravelReasonFailure,
        types.EDIT_TRAVEL_REASON_FAILURE,
        {
          error
        }
      )(error);
    });

  });

  describe('View Travel Reason Details', () => {
    it('should return action type VIEW_TRAVEL_REASON_DETAILS', () => {
      const id = 1;
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS,
        id
      };

      const action = actions.viewTravelDetails(id);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VIEW_TRAVEL_REASON_DETAILS_SUCCESS', () => {
      const response = {
        id: 1,
        title: 'title',
        description: 'description'
      };
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
        response,
      };

      const action = actions.viewTravelDetailsSuccess(response);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VIEW_TRAVEL_REASON_DETAILS_FAILURE', () => {
      const error = 'Error retrieving travel reason details';
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS_FAILURE,
        error,
      };

      const action = actions.viewTravelDetailsFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Delete reason Actions', () => {
    it('should return action of type DELETE_DOCUMENT', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_REASON',
        reasonId: 2,
      };
      const newAction = actions.deleteTravelReason(2);
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_REASON_SUCCESS', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_REASON_SUCCESS',
        reasonId: 2,
      };
      const newAction = actions.deleteTravelReasonSuccess(2);
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_REASON_FAILURE', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_REASON_FAILURE',
        error: 'Travel Reason not found'
      };
      const newAction = actions.deleteTravelReasonFailure('Travel Reason not found');
      expect(newAction).toEqual(expectedAction);
    });
  });
});
