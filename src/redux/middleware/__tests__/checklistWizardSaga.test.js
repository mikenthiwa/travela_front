import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import travelDynamiChecklistApi from '../../../services/travelDynamiChecklistApi';
import { watchgetAllDynamicChecklists, getAllDynamicChecklistsSaga } from '../checklistWizardSaga';
import {
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE
} from '../../constants/actionTypes';

const response = {
  data: {
    checklists: [{
      id: 1,
      createdBy: 'Jude Afam',
      name: 'poland-Uganda-dnZjGPGwo',
      config: [
        {
          url: '',
          type: 'image',
          order: 1,
          prompt: 'Do you have a passport',
          configuration: {
            url: '',
            options: [],
            behaviour: {
              name: 'preview image',
              action: {
                type: 'PREVIEW_IMAGE',
                payload: 'http://url'
              }
            }
          }
        }
      ],
      createdAt: '2019-07-18T15:16:35.047Z',
      updatedAt: '2019-07-18T15:16:35.047Z',
      ChecklistDestinations: 1,
      user: {
        fullName: 'Jude Afam'
      }
    }]
  }
};

const error = {
  response: {
    data: {
      error: 'An error occurred'
    }
  }
};

describe('Checklist wizard sagas', () => {
  it('gets all dynamic checklists', () => {
    return expectSaga(watchgetAllDynamicChecklists, travelDynamiChecklistApi)
      .provide([[matchers.call.fn(travelDynamiChecklistApi.getAllDynamicChecklists), response]])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
        checklists: response.data.checklists
      })
      .dispatch({
        type: GET_ALL_DYNAMIC_CHECKLISTS
      })
      .silentRun();
  });

  it('throws error if there is an error fetching checklists', () => {
    return expectSaga(watchgetAllDynamicChecklists, travelDynamiChecklistApi)
      .provide([[matchers.call.fn(travelDynamiChecklistApi.getAllDynamicChecklists), throwError(error)]])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: GET_ALL_DYNAMIC_CHECKLISTS
      })
      .silentRun();
  });
});
