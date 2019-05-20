import { 
  ADD_REGION, 
  ADD_REGION_SUCCESS, 
  ADD_REGION_FAILURE, 
  GET_REGION, 
  GET_REGION_SUCCESS, 
  GET_REGION_FAILURE 
} from '../../constants/actionTypes';
import {
  addRegion,
  addRegionSuccess,
  addRegionFailure,
  fetchRegions,
  fetchRegionSuccess,
  fetchRegionFailure
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
});
