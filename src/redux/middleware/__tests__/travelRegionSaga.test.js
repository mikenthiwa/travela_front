import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import RegionAPI from '../../../services/RegionsAPI';
import {
  watchAddRegionSagaAsync,
  watchFetchRegionDataSagaAsync,
  watchEditRegionDataSagaAsync,
  watchDeleteRegionDataSagaAsync,
} from '../travelRegionSaga';

const body = {
  region: 'North India',
  description: 'Region for all indians'
};

const addRegionResponse = {
  data:{
    success: true,
    message: 'Region created successfully',
    fetchRegions: [
      {
        body
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
const response = {
  data: {
    success: true,
    message: 'Travel Region Successfuly Updated',
    newTravelRegion: [{}]
  }
};
const otherError = {
  response: {
    status: 400,
    message: 'Bad Request',
    data: {
      errors: [{
        message: 'region has not been provided'
      }]
    }
  }
};

const error = 'Possible network error, please reload the page';

describe('REGION SAGA', () => {
  describe('Add region saga', () => {
    it('Adds Region ', () => {
      const response = addRegionResponse;
      return expectSaga(watchAddRegionSagaAsync, RegionAPI)
        .provide([
          [matchers.call.fn(RegionAPI.addRegion, body), response]
        ])
        .put({
          type: 'ADD_REGION_SUCCESS',
          response: response.data.TravelRegions
        })
        .dispatch({
          type: 'ADD_REGION',
          body
        })
        .silentRun();
    });
    it('fetches response with editing travel region and dispatches action', () => {
      const id = 1;
      return expectSaga(watchEditRegionDataSagaAsync, RegionAPI)
        .provide([
          [matchers.call.fn(
            RegionAPI.editRegion, id, body.region, body.description
          ),
          response
          ]
        ])
        .put({
          type: 'EDIT_REGION_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'EDIT_REGION',
          body
        })
        .silentRun();
    });
    it('throws error if there is an error editing a region', () => {
      return expectSaga(watchEditRegionDataSagaAsync, RegionAPI)
        .provide([
          [matchers.call.fn(RegionAPI.editRegion, body), throwError(otherError)]
        ])
        .put({
          type: 'EDIT_REGION_FAILURE',
          error: undefined
        })
        .dispatch({
          type: 'EDIT_REGION',
          body
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
          body
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
  describe('Delete Travel Region', () => {
    const regionId = 1;
    const response = {
      data: {
        deletedTravelRegion: {
          id: 1,
        }
      }
    };
    it('deletes a region successfully', () => {
      return expectSaga(watchDeleteRegionDataSagaAsync)
        .provide([
          [
            call(RegionAPI.deleteRegion, regionId),
            response
          ]
        ])
        .put({
          type: 'DELETE_REGION_SUCCESS',
          regionId,
          deletedTravelRegion: response.data.deletedTravelRegion
        })
        .dispatch({
          type: 'DELETE_REGION',
          regionId,
        })
        .silentRun();
    });
    it('handles failed region deletion', () => {
      const error = new Error('Server error, try again');
      error.response = {
        status: 500
      };
      return expectSaga(watchDeleteRegionDataSagaAsync)
        .provide([
          [
            call(RegionAPI.deleteRegion, regionId),
            throwError(error)
          ]
        ])
        .put({
          type: 'DELETE_REGION_FAILURE',
          error: error.message
        })
        .dispatch({
          type: 'DELETE_REGION',
          regionId,
        })
        .silentRun();
    });
  });
});
