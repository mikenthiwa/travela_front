import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import HelpResourceAPI from '../../../services/HelpResourceAPI';
import {
  watchAddResourcesSagaAsync,
  watchFetchLinkDataSagaAsync
} from '../helpResourceSaga';

const newResource = {
  link: 'New Resource',
  address: 'This is a new resource'
};

const addResourceResponse = {
  data:{
    success: true,
    message: 'Resource created successfully',
    fetchResources: [
      {
        newResource
      }
    ]
  }
};
const fetchdata = {
  data:{
    success: true,
    message: 'Help resources gotten successfully',
    fetchResources: [
      {}
    ]
  }
};
const error = 'Possible network error, please reload the page';

describe('HELP RESOURCE SAGA', () => {
  describe('Add resource saga', () => {
    it('Adds a Resource ', () => {
      const response = addResourceResponse;
      return expectSaga(watchAddResourcesSagaAsync, HelpResourceAPI)
        .provide([
          [matchers.call.fn(HelpResourceAPI.addResource, newResource), response]
        ])
        .put({
          type: 'ADD_RESOURCE_SUCCESS',
          response: response.data.helpResources
        })
        .dispatch({
          type: 'ADD_RESOURCE',
          newResource
        })
        .silentRun();
    });
    it('throws error if there is an error adding resource', () => {
      return expectSaga(watchAddResourcesSagaAsync, HelpResourceAPI)
        .provide([
          [matchers.call.fn(HelpResourceAPI.addResource), throwError(error)]
        ])
        .put({
          type: 'ADD_RESOURCE_FAILURE',
          error
        })
        .dispatch({
          type: 'ADD_RESOURCE',
          newResource
        })
        .silentRun();
    });
  });
  describe('Fetch resource saga', () => {
    it('fetches roles ', () => {
      const response = fetchdata;
      return expectSaga(watchFetchLinkDataSagaAsync, HelpResourceAPI)
        .provide([[call(HelpResourceAPI.fetchResource), response]])
        .put({
          type: 'GET_RESOURCE_SUCCESS',
          response: response.data.fetchResource
        })
        .dispatch({
          type: 'GET_RESOURCE'
        })
        .silentRun();
    });
    it('throws error if there is an error fetching a roles', () => {
      return expectSaga(watchFetchLinkDataSagaAsync, HelpResourceAPI)
        .provide([[call(HelpResourceAPI.fetchResource), throwError(error)]])
        .put({
          type: 'GET_RESOURCE_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_RESOURCE'
        })
        .silentRun();
    });
  });
});
