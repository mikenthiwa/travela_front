import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import toast from 'toastr';
import travelDynamicChecklistApi from '../../../services/travelDynamiChecklistApi';


import {
  watchAddChecklistWizard,
  watchHandleChecklistItems,
  watchAddQuestion,
  watchDeleteItems,
  watchDeleteQuestion,
  watchUpdateBehaviour,
  watchUpdateNationality,
  watchUpdateDestination,
  watchCreateDynamicChecklist
} from '../travelChecklistWizardSaga';
import TravelChecklistAPI from '../../../services/travelChecklistAPI';
import {
UPDATE_NATIONALITY,
UPDATE_NATIONALITY_SUCCESS,
UPDATE_DESTINATION,
UPDATE_DESTINATION_SUCCESS,
ADD_NEW_CHECKLIST_ITEM,
ADD_NEW_CHECKLIST_ITEM_SUCCESS,
ADD_QUESTION,
ADD_QUESTION_SUCCESS,
DELETE_QUESTION,
DELETE_QUESTION_SUCCESS,
UPDATE_BEHAVIOUR,
UPDATE_BEHAVIOUR_SUCCESS,
HANDLE_ITEMS,
HANDLE_ITEMS_SUCCESS,
DELETE_ITEM,
DELETE_ITEM_SUCCESS,
CREATE_DYNAMIC_CHECKLIST,
CREATE_DYNAMIC_CHECKLIST_SUCCESS,
} from '../../constants/actionTypes';


toast.error = jest.fn();
toast.success = jest.fn();

describe('Travel Checklist Wizard Saga test', () => {
  // const error = new Error('Server error, try again');
  const response = {
    data: {
      message: 'Checklist created successfully'
    }
  }

  it('adds checklist item successfully', () => {
    return expectSaga(watchAddChecklistWizard)
      .put({
        type: ADD_NEW_CHECKLIST_ITEM_SUCCESS,
        newItem: [{}],
      })
      .dispatch({
        type: ADD_NEW_CHECKLIST_ITEM,
        item: [{}],
      })
      .silentRun();
  });

  it('handles checklist item', () => {
    return expectSaga(watchHandleChecklistItems)
      .put({
        type: HANDLE_ITEMS_SUCCESS,
        newItem: [{}],
      })
      .dispatch({
        type: HANDLE_ITEMS,
        item: [{}],
      })
      .silentRun();
  });

  it('adds question to the checklist item', () => {
    return expectSaga(watchAddQuestion)
      .put({
        type: ADD_QUESTION_SUCCESS,
        newItems: [{}],
      })
      .dispatch({
        type: ADD_QUESTION,
        items: [{}],
      })
      .silentRun();
  });

  it('removes an item from a checklist item', () => {
    return expectSaga(watchDeleteItems)
      .put({
        type: DELETE_ITEM_SUCCESS,
        order: 1,
      })
      .dispatch({
        type: DELETE_ITEM,
        order: 1,
      })
      .silentRun();
  });

  it('removes question from a checklist item', () => {
    return expectSaga(watchDeleteQuestion)
      .put({
        type: DELETE_QUESTION_SUCCESS,
        newItems: [{}],
      })
      .dispatch({
        type: DELETE_QUESTION,
        items: [{}],
      })
      .silentRun();
  });

  it('updates a checklist behaviour', () => {
    return expectSaga(watchUpdateBehaviour)
      .put({
        type: UPDATE_BEHAVIOUR_SUCCESS,
        newItems: [{}],
      })
      .dispatch({
        type: UPDATE_BEHAVIOUR,
        items: [{}],
      })
      .silentRun();
  });

  it('updates a checklist origin/nationality', () => {
    return expectSaga(watchUpdateNationality)
      .put({
        type: UPDATE_NATIONALITY_SUCCESS,
        nationality: {},
      })
      .dispatch({
        type: UPDATE_NATIONALITY,
        items: {},
      })
      .silentRun();
  });

  it('updates a checklist destination', () => {
    return expectSaga(watchUpdateDestination)
      .put({
        type: UPDATE_DESTINATION_SUCCESS,
        destination: [{}],
      })
      .dispatch({
        type: UPDATE_DESTINATION,
        items: [{}],
      })
      .silentRun();
  });
});
