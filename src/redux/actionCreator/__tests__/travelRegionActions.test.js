import { 
  ADD_REGION, 
  ADD_REGION_SUCCESS, 
  ADD_REGION_FAILURE, 
  GET_REGION, 
  GET_REGION_SUCCESS, 
  GET_REGION_FAILURE,
  EDIT_REGION,
  EDIT_REGION_SUCCESS,
  EDIT_REGION_FAILURE, 
  DELETE_REGION,
  DELETE_REGION_SUCCESS,
  DELETE_REGION_FAILURE,
} from '../../constants/actionTypes';
import {
  addRegion,
  addRegionSuccess,
  addRegionFailure,
  fetchRegions,
  fetchRegionSuccess,
  fetchRegionFailure,
  editRegion,
  editRegionSuccess,
  editRegionFailure,
  deleteRegion,
  deleteRegionSuccess,
  deleteRegionFailure,
} from '../travelRegionActions';

const newRegion = {
  region: 'New Region',
  description: 'Should be a new Region'
};

describe('Region Actions', () => {
  it('should return action type ADD_Region', () => {
    const expectedAction = {
      type: ADD_REGION,
      regionData: newRegion
    };
    const createdAction = addRegion(newRegion);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type ADD_REGION_SUCCESS', () => {
    const expectedAction = {
      type: ADD_REGION_SUCCESS,
      response: newRegion
    };
    const createdAction = addRegionSuccess(newRegion);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type ADD_REGION_FAILURE', () => {
    const expectedAction = {
      type: ADD_REGION_FAILURE,
      error: 'Server Error'
    };
    const createdAction = addRegionFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type GET_REGION', () => {
    const expectedAction = {
      type: GET_REGION
    };
    const createdAction = fetchRegions();
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type GET_REGION_SUCCESS', () => {
    const expectedAction = {
      type: GET_REGION_SUCCESS,
      response: 'Successfully retrieved regions'
    };
    const createdAction = fetchRegionSuccess('Successfully retrieved regions');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type GET_REGION_FAILURE', () => {
    const expectedAction = {
      type: GET_REGION_FAILURE,
      error: 'Server Error'
    };
    const createdAction = fetchRegionFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type EDIT_REGION', () => {
    const body = {
      region: 'North America',
      description: 'This is a North America body',
    };
    const expectedAction = {
      type: EDIT_REGION,
      body,
    };
    const createdAction = editRegion(body);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type EDIT_REGION_SUCCESS', () => {
    const response = {
      'success': true,
      'message': 'Travel Region Successfuly Updated',
      'newTravelRegion': [
        1,
        [{
          'id': 1,
          'region': 'North Asia',
          'description': 'The north Asia',
          'createdAt': '2019-08-16T12:51:54.298Z',
          'updatedAt': '2019-08-16T12:52:32.719Z'
        }]
      ]
    };
    const expectedAction = {
      type: EDIT_REGION_SUCCESS,
      response,
    };
    const createdAction = editRegionSuccess(response);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type DELETE_REGION', () => {
    const expectedAction = {
      type: DELETE_REGION,
      regionId: 1
    };
    const createdAction = deleteRegion(1);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type DELETE_REGION_SUCCESS', () => {
    const expectedAction = {
      type: DELETE_REGION_SUCCESS,
      regionId: 1,
    };
    const createdAction = deleteRegionSuccess(1);
    expect(createdAction).toEqual(expectedAction);
  });

  it('shpuld return action type DELETE_REGION_FAILURE', () => {
    const expectedAction = {
      type: DELETE_REGION_FAILURE,
      error: 'Server Error',
    };
    const createdAction = deleteRegionFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
});
