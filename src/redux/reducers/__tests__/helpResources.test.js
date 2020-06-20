import helpResourceReducer from '../helpResources';
import * as actionTypes from '../../constants/actionTypes';

const fetchdata = {
  data:{
    success: true,
    message: 'Help resources gotten successfully',
    helpResources: [
      {}
    ]
  }
};
const newResource = {
  link: 'New Resource',
  address: 'This is a new resource'
};

describe('HELP RESOURCE REDUCER',() =>{
  const initialState = {
    isLoading: false,
    fetchResources: {},
    helpResourceErrors: '',
    helpResources: []
  };
  it('should return proper initial state', done => {
    expect(helpResourceReducer(undefined, {})).toEqual(initialState);
    done();
  });

  describe('Get Help Resources',() =>{
    it('dispatches action GET_RESOURCE', done => {
      const action = {
        type: actionTypes.GET_RESOURCE
      };
      const newState = helpResourceReducer(initialState, action);
      expect(newState.isLoading).toEqual(true);
      done();
    });
  
    it('dispatches action GET_RESOURCE_SUCCESS:', done => {
      const action = {
        type: actionTypes.GET_RESOURCE_SUCCESS,
        response: fetchdata
      };
      const newState = helpResourceReducer(initialState, action);
      expect(newState.resources).toEqual(fetchdata);
      done();
    });
  
    it('dispatches action GET_RESOURCE_FAILURE', done => {
      const action = {
        type: actionTypes.GET_RESOURCE_FAILURE,
        error: 'Possible network error, please reload the page'
      };
      const newState = helpResourceReducer(initialState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.helpResourceErrors).toEqual(
        'Possible network error, please reload the page'
      );
      done();
    });
  });


  describe('Add help resource', () => {
    const initialState = {
      resources: [],
    };

    it('returns the correct state for ADD_RESOURCE action', () => {
      const action = {
        type: actionTypes.ADD_RESOURCE,
        linkData: newResource
      };
      expect(helpResourceReducer(initialState, action)).toEqual({
        isAddingResource: true,
        resources: []
      });
    });

    it('returns the correct state for ADD_RESOURCE_SUCCESS action', () => {
      const action = {
        type: actionTypes.ADD_RESOURCE_SUCCESS,
        helpResources: []
      };
      expect(helpResourceReducer(initialState, action)).toEqual({
        isAddingResource: false,
        resources:[action.response]
      });
    });

    it('returns the correct state for ADD_RESOURCE_FAILURE action', () => {
      const action = {
        type: actionTypes.ADD_RESOURCE_FAILURE,
        error: 'An error occurred'
      };
      expect(helpResourceReducer(initialState, action)).toEqual({
        isAddingResource: false,
        error: 'An error occurred',
        resources: []
      });
    });
  });
});
