import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import RegionAPI from '../../../services/RegionsAPI';
import {
  watchAddRegionSagaAsync,
  watchFetchRegionDataSagaAsync
} from '../travelRegionSaga';

const newRegion = {
  region: 'New Region',
  description: 'Should be a new Region'
};

const addRegionResponse = {
  data:{
    success: true,
    message: 'Region created successfully',
    fetchRegions: [
      {
        newRegion
      }
    ]
  }
};
const fetchdata = {
  data:{
    success: true,
    message: 'Successfully retrieved regions',
    fetchRegions: [
      {}
    ]
  }
};
const error = 'Possible network error, please reload the page';

describe('REGION SAGA', () => {
  describe('Add region saga', () => {
    it('Adds Region ', () => {
      const response = addRegionResponse;
      return expectSaga(watchAddRegionSagaAsync, RegionAPI)
        .provide([
          [matchers.call.fn(RegionAPI.addRegion, newRegion), response]
        ])
        .put({
          type: 'ADD_REGION_SUCCESS',
          response: response.data.TravelRegions
        })
        .dispatch({
          type: 'ADD_REGION',
          newRegion
        })
        .silentRun();
    });
    it('throws error if there is an error adding regions', () => {
      return expectSaga(watchAddRegionSagaAsync, RegionAPI)
        .provide([
          [matchers.call.fn(RegionAPI.addRegion), throwError(error)]
        ])
        .put({
          type: 'ADD_REGION_FAILURE',
          error
        })
        .dispatch({
          type: 'ADD_REGION',
          newRegion
        })
        .silentRun();
    });
  });
  describe('Fetch regions saga', () => {
    it('fetches roles ', () => {
      const response = fetchdata;
      return expectSaga(watchFetchRegionDataSagaAsync, RegionAPI)
        .provide([[call(RegionAPI.fetchRegions), response]])
        .put({
          type: 'GET_REGION_SUCCESS',
          response: response.data.fetchRegions
        })
        .dispatch({
          type: 'GET_REGION'
        })
        .silentRun();
    });
    it('throws error if there is an error fetching a roles', () => {
      return expectSaga(watchFetchRegionDataSagaAsync, RegionAPI)
        .provide([[call(RegionAPI.fetchRegions), throwError(error)]])
        .put({
          type: 'GET_REGION_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_REGION'
        })
        .silentRun();
    });
  });
});
