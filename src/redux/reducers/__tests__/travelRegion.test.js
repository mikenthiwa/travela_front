import travelRegionReducer from '../travelRegion';
import * as actionTypes from '../../constants/actionTypes';
import { editRegion, editRegionSuccess } from '../../actionCreator/travelRegionActions';
import travelRegion from '../travelRegion';

const fetchdata = {
  data:{
    success: true,
    message: 'Successfully retrieved regions',
    fetchRegions: [
      {}
    ]
  }
};
const body = {
  region: 'North America',
  description: 'Region for the North America'
};

const regions = [
  {
    id: 1,
    region: 'North India',
    description: 'This is a state of northern indians'
  },
  {
    id: 2,
    region: 'South India',
    description: 'This is a state of southern indians'
  },
];
const newRegion = {
  region: 'New Region',
  description: 'Should be a new Region'
};

describe('REGION REDUCER',() =>{
  const initialState = {
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    fetchRegions: {},
    editRegion: {},
    regionErrors: '',
    newRegion: {},
    regions: [],
    travelRegion: {},
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
describe('Edit Region', () => {
  it('Should handle EDIT_REGION', () => {
    const initialState = {};
    const action = {
      type: actionTypes.EDIT_REGION
    };
    expect(travelRegion(initialState, action)).toEqual({
      isEditing: true
    });
  });
  it('it should handle EDIT_REGION_FAILURE', () => {
    const initialState = {};
    const action = {
      type: actionTypes.EDIT_REGION_FAILURE,
      error: 'Possible network error, please reload the page',
    };
    expect(travelRegion(initialState, action)).toEqual({
      isEditing: false,
      regionErrors: 'Possible network error, please reload the page',
    });
  });
  it('should handle DELETE_REGION', () => {
    const initialState = {
      isLoading: false,
      isEditing: false,
      isDeleting: false,
      fetchRegions: {},
      editRegion: {},
      regionErrors: '',
      newRegion: {},
    };
    const currentState = {
      ...initialState,
    };
    let action, newState, expectedState;
    action = {
      type: actionTypes.DELETE_REGION,
      regionId: 2,
    };

    newState = travelRegionReducer(currentState, action);
    expectedState = {
      ...initialState,
      isDeleting: true,
    };

    expect(newState).toEqual(expectedState);
  });
});

describe('Delete travel regions Reducer', () => {
  const initialState = {
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    fetchRegions: {},
    editRegion: {},
    newRegion: {},
  };
  const currentState = {
    ...initialState,
    regions: []
  };
  let action, newState, expectedState, error, mockComments;
  it('should handle DELETE_REGION_SUCCESS', () => {
    action = {
      type: actionTypes.DELETE_REGION_SUCCESS,
      regionId: 1,
      deletedTraveloRegion: {
        id: 1,
      }
    };
    newState = travelRegionReducer(currentState, action);
    expectedState = {
      ...initialState,
      regions: [],
      isDeleting: false,
      regionErrors: ''
    };
    expect(newState).toEqual(expectedState);
  });
  it('should handle DELETE_REGION_FAILURE', () => {
    error = 'Travel Region not found';
    action = {
      type: actionTypes.DELETE_REGION_FAILURE,
      error
    };

    newState = travelRegionReducer(initialState, action);
    expectedState = {
      ...initialState,
      isDeleting: false,
      regionErrors: 'Travel Region not found'
    };
    expect(newState).toMatchObject(expectedState);
  });
});
