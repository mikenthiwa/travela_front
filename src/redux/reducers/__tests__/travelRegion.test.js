import travelRegionReducer from '../travelRegion';
import * as actionTypes from '../../constants/actionTypes';

const fetchdata = {
  data:{
    success: true,
    message: 'Successfully retrieved regions',
    fetchRegions: [
      {}
    ]
  }
};
const newRegion = {
  region: 'New Region',
  description: 'Should be a new Region'
};

describe('REGION REDUCER',() =>{
  const initialState = {
    isLoading: false,
    fetchRegions: {},
    regionErrors: '',
    regions: []
  };
  it('should return proper initial state', done => {
    expect(travelRegionReducer(undefined, {})).toEqual(initialState);
    done();
  });
  describe('Get Regions',() =>{
    it('dispatches action GET_REGION', done => {
      const action = {
        type: actionTypes.GET_REGION
      };
      const newState = travelRegionReducer(initialState, action);
      expect(newState.isLoading).toEqual(true);
      done();
    });
  
    it('dispatches action GET_REGION_SUCCESS:', done => {
      const action = {
        type: actionTypes.GET_REGION_SUCCESS,
        response: fetchdata
      };
      const newState = travelRegionReducer(initialState, action);
      expect(newState.regions).toEqual(fetchdata);
      done();
    });
  
    it('dispatches action GET_REGION_FAILURE', done => {
      const action = {
        type: actionTypes.GET_REGION_FAILURE,
        error: 'Possible network error, please reload the page'
      };
      const newState = travelRegionReducer(initialState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.regionErrors).toEqual(
        'Possible network error, please reload the page'
      );
      done();
    });
  });
  describe('Add region', () => {
    const initialState = {
      regions: []
    };

    it('returns the correct state for ADD_REGION action', () => {
      const action = {
        type: actionTypes.ADD_REGION,
        regionData: newRegion
      };
      expect(travelRegionReducer(initialState, action)).toEqual({
        isAddingRegion: true,
        regions: []
      });
    });

    it('returns the correct state for ADD_REGION_SUCCESS action', () => {
      const action = {
        type: actionTypes.ADD_REGION_SUCCESS,
        regions: []
      };
      expect(travelRegionReducer(initialState, action)).toEqual({
        isAddingRegion: false,
        regions:[action.response]
      });
    });

    it('returns the correct state for ADD_REGION_FAILURE action', () => {
      const action = {
        type: actionTypes.ADD_REGION_FAILURE,
        error: 'An error occurred'
      };
      expect(travelRegionReducer(initialState, action)).toEqual({
        isAddingRegion: false,
        error: 'An error occurred',
        regions: []
      });
    });
  });
});
