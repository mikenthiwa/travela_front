import {
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  RESTORE_TRAVEL_CHECKLIST,
  RESTORE_TRAVEL_CHECKLIST_SUCCESS,
  RESTORE_TRAVEL_CHECKLIST_FAILURE
} from '../../constants/actionTypes';

import {
  fetchTravelChecklist, 
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  deleteTravelChecklist,
  deleteChecklistFailure,
  deleteChecklistSuccess,
  updateTravelChecklist,
  updateChecklistSuccess,
  updateChecklistFailure,
  createTravelChecklist,
  createChecklistSuccess,
  createChecklistFailure,
  restoreChecklist,
  restoreChecklistSuccess,
  restoreChecklistFailure
} from '../travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';

describe('Travel checklists actions test', () => {
  describe('Fetch TravelChecklist actions', () => {
    it('should return action of type FETCH_TRAVEL_CHECKLIST', (done) => {
      const expectedAction = {
        type: FETCH_TRAVEL_CHECKLIST,
        requestId: 'request-test-id'
      };

      const newAction = fetchTravelChecklist('request-test-id');
      expect(newAction).toEqual(expectedAction);

      done();
    });

    it('should return action of type FETCH_TRAVEL_CHECKLIST', (done) => {
      const response = {
        travelChecklists: travelChecklistMockData
      };

      const expectedAction = {
        type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
        travelChecklists: travelChecklistMockData
      };

      const newAction = fetchTravelChecklistSuccess(response);
      expect(newAction).toEqual(expectedAction);

      done();
    });

    it('should return action of type FETCH_TRAVEL_CHECKLIST_FAILURE',
      (done) => {
        const expectedAction = {
          type: FETCH_TRAVEL_CHECKLIST_FAILURE,
          error: 'There are no checklist items for your selected destination(s)'
        };

        const newAction = fetchTravelChecklistFailure(
          'There are no checklist items for your selected destination(s)'
        );
        expect(newAction).toEqual(expectedAction);

        done();
      });
  });
  describe('Update TravelChecklist actions', () => {
    it('should return action of type UPDATE_TRAVEL_CHECKLIST', (done) => {
      const expectedAction = {
        type: UPDATE_TRAVEL_CHECKLIST,
        checklistItemId: '20',
        checklistItemData: {name: 'itemToUpdate'}
      };
      const newAction = updateTravelChecklist('20', {name: 'itemToUpdate'});
      expect(newAction).toEqual(expectedAction);
      done();
    });

    it('should return action of type UPDATE_TRAVEL_CHECKLIST_SUCCESS', (done) => {
      const expectedAction = {
        type: UPDATE_TRAVEL_CHECKLIST_SUCCESS,
        updatedChecklistItem: {name: 'updatedItem'},
        checklistItemId: '20',
      };
      const newAction = updateChecklistSuccess({name: 'updatedItem'}, '20');

      expect(newAction).toEqual(expectedAction);

      done();
    });

    it('should return action of type UPDATE_TRAVEL_CHECKLIST_FAILURE', (done) => {
      const expectedAction = {
        type: UPDATE_TRAVEL_CHECKLIST_FAILURE,
        error: {name: 'error'},
      };
      const newAction = updateChecklistFailure({name: 'error'});

      expect(newAction).toEqual(expectedAction);

      done();
    });
  });

  describe('Delete Travel Checklist Actions', () => {
    it('should return action of type DELETE_TRAVEL_CHECKLIST', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST',
        checklistItemId: 'zdy6fs77sq',
        deleteReason: 'No longer applicable',
      };
      const newAction = deleteTravelChecklist('zdy6fs77sq', 'No longer applicable');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_CHECKLIST_SUCCESS', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST_SUCCESS',
        disabledChecklistItem: 'zdy6fs77sq',
      };
      const newAction = deleteChecklistSuccess('zdy6fs77sq');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_CHECKLIST_FAILURE', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST_FAILURE',
        error: 'Checklist item not found'
      };
      const newAction = deleteChecklistFailure('Checklist item not found');
      expect(newAction).toEqual(expectedAction);
    });
  });

  describe('Create travel checklist', () => {
    const checklistItemData = {
      name: 'Visa aplication',
      requiresFiles: 'true',
      label: 'Visa',
      link: 'http://visa@test.com'
    };
    it('should return action of type CREATE_TRAVEL_CHECKLIST', () => {
      const expectedAction = {
        type: CREATE_TRAVEL_CHECKLIST,
        checklistItemData: { ...checklistItemData },
      };
      const newAction = createTravelChecklist(checklistItemData);
      expect(newAction).toEqual(expectedAction);
    });
    it('should return action of type CREATE_TRAVEL_CHECKLIST_SUCCESS', () => {
      const expectedAction = {
        type: CREATE_TRAVEL_CHECKLIST_SUCCESS,
        checklistItem: { ...checklistItemData },
      };
      const newAction = createChecklistSuccess(checklistItemData);
      expect(newAction).toEqual(expectedAction);
    });
    it('should return action of type CREATE_TRAVEL_CHECKLIST_FAILURE', () => {
      const expectedAction = {
        type: CREATE_TRAVEL_CHECKLIST_FAILURE,
        error: 'error',
      };
      const newAction = createChecklistFailure('error');
      expect(newAction).toEqual(expectedAction);
    });
  });

  describe('Restore Disabled TravelChecklist actions', () => {
    it('should return action of type RESTORE_TRAVEL_CHECKLIST', (done) => {
      const expectedAction = {
        type: RESTORE_TRAVEL_CHECKLIST,
        checklistItemId: '5',
        checklistItemData: {name: 'my visa'}
      };
      const newAction = restoreChecklist('5', {name: 'my visa'});
      expect(newAction).toEqual(expectedAction);
      done();
    });

    it('should return action of type RESTORE_TRAVEL_CHECKLIST_SUCCESS', (done) => {
      const expectedAction = {
        type: RESTORE_TRAVEL_CHECKLIST_SUCCESS,
        updatedChecklistItem: {name: 'my visa'},
        checklistItemId: '5',
      };
      const newAction = restoreChecklistSuccess({name: 'my visa'}, '5');
      expect(newAction).toEqual(expectedAction);
      done();
    });

    it('should return action of type RESTORE_TRAVEL_CHECKLIST_FAILURE', (done) => {
      const expectedAction = {
        type: RESTORE_TRAVEL_CHECKLIST_FAILURE,
        error: {name: 'not restored'},
      };
      const newAction = restoreChecklistFailure({name: 'not restored'});
      expect(newAction).toEqual(expectedAction);
      done();
    });
  });
});
