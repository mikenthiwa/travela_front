import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import toast from 'toastr';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';
import {
  watchFetchAllChecklists,
  watchDeleteChecklist,
  watchUpdateChecklist,
  watchCreateChecklist,
  watchFetchDeletedChecklistItems,
  watchRestoreChecklist
} from '../travelChecklistSaga';
import TravelChecklistAPI from '../../../services/travelChecklistAPI';
import {
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST_FAILURE,
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_DELETED_CHECKLISTITEMS,
  FETCH_DELETED_CHECKLISTITEMS_SUCCESS,
  FETCH_DELETED_CHECKLISTITEMS_FAILURE,
  RESTORE_TRAVEL_CHECKLIST,
  RESTORE_TRAVEL_CHECKLIST_SUCCESS,
  RESTORE_TRAVEL_CHECKLIST_FAILURE
} from '../../constants/actionTypes';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';

toast.error = jest.fn();
toast.success = jest.fn();

describe('Travel Checklist Saga test', () => {
  const error = new Error('Server error, try again');
  describe('Delete travel checklist item', () => {
    const checklistItemId = '23ErGDS6';
    const deleteReason = 'Hello world';
    const location = 'Nigeria';
    const response = {
      data: {
        checklistItem: {name: 'My new visa and green card'}
      }
    };

    it('deletes a travel checklist item successfully', () => {
      return expectSaga(watchDeleteChecklist)
        .provide([[
          call(TravelChecklistAPI.deleteChecklistItem, {
            checklistItemId, deleteReason, location
          }),
          response
        ]])
        .put({
          type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
          disabledChecklistItem: {name: 'My new visa and green card'},
          checklistItemId
        })
        .dispatch({
          type: DELETE_TRAVEL_CHECKLIST,
          checklistItemId,
          deleteReason,
          location
        })
        .silentRun();
    });

    it('handles failed travel checklist item delete', () => {
      error.response = { status: 500 };

      return expectSaga(watchDeleteChecklist)
        .provide([[
          call(TravelChecklistAPI.deleteChecklistItem, {
            checklistItemId, deleteReason, location
          }),
          throwError(error)
        ]])
        .put({
          type: DELETE_TRAVEL_CHECKLIST_FAILURE,
          error: error.message
        })
        .dispatch({
          type: DELETE_TRAVEL_CHECKLIST,
          checklistItemId,
          deleteReason,
          location
        })
        .silentRun();
    });
  });

  describe('Fetch travel checklist', () => {
    const response = {
      data: {
        userCenters: ['Lagos', 'Nairobi', 'Kenya', 'Uganda'],
        travelChecklists: travelChecklistMockData
      }
    };

    const requestId = 'request-test-id';

    it('fetches all travel checklist for a requestId', () => {
      return expectSaga(watchFetchAllChecklists)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.getAllChecklists, requestId),
          response
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
          travelChecklists: response.data.travelChecklists,
          userCenters: response.data.userCenters
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId
        })
        .silentRun();
    });

    it('fetches all travel checklist', () => {
      return expectSaga(watchFetchAllChecklists)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.getAllChecklists, undefined),
          response
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
          travelChecklists: response.data.travelChecklists,
          userCenters: response.data.userCenters
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId: undefined
        })
        .silentRun();
    });

    it('handles failed travel checklist fetch', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchFetchAllChecklists)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.getAllChecklists, requestId),
          throwError(error)
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_FAILURE,
          error: error.message
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId
        })
        .silentRun();
    });
  });

  describe('Create travel checklist', () => {
    const action = {
      checklist: {
        'id': 3434343,
        'name': 'Visa Application',
        'resources': [
          {
            'label': 'Application guide',
            'link': 'https://google.com/application-guide'
          }
        ],
      },
    };

    const response = {
      data: {
        checklistItem: action.checklist
      }
    };

    it('creates a travel checklist successfully', () => {
      return expectSaga(watchCreateChecklist, TravelChecklistAPI)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.createChecklist),
          response
        ]])
        .put({
          type: CREATE_TRAVEL_CHECKLIST_SUCCESS,
          checklistItem: response.data.checklistItem
        })
        .dispatch({
          type: CREATE_TRAVEL_CHECKLIST,
          checklistItemData: action.checklist
        })
        .silentRun();
    });

    it('handles failed travel checklist creation', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: ['Comment saga error']
          }
        }
      };

      return expectSaga(watchCreateChecklist, TravelChecklistAPI)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.createChecklist),
          throwError(error)
        ]])
        .put({
          type: CREATE_TRAVEL_CHECKLIST_FAILURE,
          error: ''
        })
        .dispatch({
          type: CREATE_TRAVEL_CHECKLIST,
          checklistItemData: action.checklist
        })
        .silentRun();
    });
  });

  describe('Update Checklist Item Saga', () => {
    const data = {
      checklistItemId: '20',
      checklistItemData: {name: 'ItemUpdates'}
    };

    const response = {
      data: {
        updatedChecklistItem: { name: 'updatedItem'}
      }
    };

    it('Updates Checklist Item successfully', () => {
      expectSaga(watchUpdateChecklist)
        .provide([
          [call(TravelChecklistAPI.updateChecklistItem, data.checklistItemId, data.checklistItemData), response]
        ])
        .put({
          type: UPDATE_TRAVEL_CHECKLIST_SUCCESS,
          updatedChecklistItem: { name: 'updatedItem'},
          checklistItemId: '20'
        })
        .dispatch({
          type: UPDATE_TRAVEL_CHECKLIST,
          checklistItemId: '20',
          checklistItemData: {name: 'ItemUpdates'}
        })
        .silentRun();
    });

    it('throws an error when updating fails', () => {
      expectSaga(watchUpdateChecklist)
        .provide([
          [call(TravelChecklistAPI.updateChecklistItem, data.checklistItemId, data.checklistItemData), throwError(error)]
        ])
        .put({
          type: UPDATE_TRAVEL_CHECKLIST_FAILURE,
          error: error.message
        })
        .dispatch({
          type: UPDATE_TRAVEL_CHECKLIST,
          checklistItemId: '20',
          checklistItemData: {name: 'ItemUpdates'}
        })
        .silentRun();
    });
  });

  describe('Fetch deleted checklist items', () => {
    const response = {
      data: {
        deletedTravelChecklists: travelChecklistMockData
      }
    };
    const destinationName = 'destinationName';
    it('fetches deleted checklist items', () => {
      expectSaga(watchFetchDeletedChecklistItems, TravelChecklistAPI)
        .provide([[
          matchers.call.fn(TravelChecklistAPI.getDeletedCheckListItems, destinationName),
          response
        ]])
        .put({
          type: FETCH_DELETED_CHECKLISTITEMS_SUCCESS,
          deletedTravelChecklists: response.data.deletedTravelChecklists
        })
        .dispatch({
          type: FETCH_DELETED_CHECKLISTITEMS,
          destinationName
        })
        .silentRun();
    });

    it('throws an error when fetching deleted checlist items fails', () => {
      expectSaga(watchFetchDeletedChecklistItems, TravelChecklistAPI)
        .provide([
          [matchers.call.fn(TravelChecklistAPI.getDeletedCheckListItems, destinationName), throwError(error)]
        ])
        .put({
          type: FETCH_DELETED_CHECKLISTITEMS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: FETCH_DELETED_CHECKLISTITEMS,
          destinationName
        })
        .silentRun();
    });
  });

  describe('Restore disabled travel checklist item', () => {
    const data = {
      checklistItemId: '20',
      checklistItemData: {name: 'ItemRestores'}
    };

    const response = {
      data: {
        updatedChecklistItem: { deletedAt: null}
      }
    };
    const error = {
      response: {
        status: 422,
        data: {
          errors: ['update error']
        }
      }
    };

    it('restores a disabled travel checklist item successfully', () => {
      return expectSaga(watchRestoreChecklist)
        .provide([[
          call(TravelChecklistAPI.updateChecklistItem, data.checklistItemId, data.checklistItemData),
          response
        ]])
        .put({
          type: RESTORE_TRAVEL_CHECKLIST_SUCCESS,
          updatedChecklistItem: { deletedAt: null },
          checklistItemId: '20'
        })
        .dispatch({
          type: RESTORE_TRAVEL_CHECKLIST,
          checklistItemId: '20',
          checklistItemData: {name: 'ItemRestores'}
        })
        .silentRun();
    });

    it('throws an error when item restore fails', () => {
      expectSaga(watchRestoreChecklist)
        .provide([
          [call(TravelChecklistAPI.updateChecklistItem, data.checklistItemId, data.checklistItemData), throwError(error)]
        ])
        .put({
          type: UPDATE_TRAVEL_CHECKLIST_FAILURE,
          error: 'Bad Request. ',
        })
        .dispatch({
          type: UPDATE_TRAVEL_CHECKLIST,
          checklistItemId: '20',
          checklistItemData: {deletedAt: '2018-11-26T08:33:16.139Z'}
        })
        .silentRun();
    });
  });
});
