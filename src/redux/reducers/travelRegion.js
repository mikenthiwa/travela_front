import _ from 'lodash';
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
} from '../constants/actionTypes';

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
let editedRegionIndex;
let isNewRegion;

const deleteRegionReducer = (action) => {
  switch (action.type) {
  case DELETE_REGION:
    return true;
  case DELETE_REGION_SUCCESS:
  case DELETE_REGION_FAILURE:
    return false;
  }
};
const deleteTravelRegionsReducer = (state, action) => {
  switch (action.type) {
  case DELETE_REGION_SUCCESS:
    isNewRegion = state.regions.filter(checkRegion => checkRegion.id !== action.regionId);
    return isNewRegion;
  case DELETE_REGION:
    return state.regions;
  case DELETE_REGION_FAILURE:
    return state.regions;
  }
};

const deleteRegionReducerError = (state, action) => {
  switch (action.type) {
  case DELETE_REGION:
    return state.regionErrors;
  case DELETE_REGION_FAILURE:
    return action.error;
  case DELETE_REGION_SUCCESS:
    return '';
  }
};
const travelRegion = (state = initialState, action) => {
  switch (action.type) {
  case ADD_REGION:
    return {
      ...state,
      isAddingRegion: true,
    };
  case ADD_REGION_SUCCESS:
    return {
      ...state,
      isAddingRegion: false,
      regions: [action.response, ...state.regions]
    };
  case ADD_REGION_FAILURE:
    return {
      ...state,
      isAddingRegion: false,
      error: action.error
    };
  case GET_REGION:
    return { ...state, isLoading: true };
  case GET_REGION_SUCCESS:
    return { ...state, regions: action.response, isLoading: false };
  case GET_REGION_FAILURE:
    return { ...state, isLoading: false, regionErrors: action.error };
  case EDIT_REGION: {
    return {
      ...state,
      isEditing: true,
    };
  }
  case EDIT_REGION_SUCCESS: {
    const { travelRegion} = action.response;
    const regions = state.regions.slice();
    const index = _.findIndex(regions, { id: regions.id});
    regions[index] = travelRegion;
    return {
      ...state,
      isEditing: false,
      regions,
      editRegion: {},
      errors: {}
    };
  }
  case EDIT_REGION_FAILURE:
    return {...state, isEditing: false, regionErrors: action.error};
  case DELETE_REGION_SUCCESS:
  case DELETE_REGION:
  case DELETE_REGION_FAILURE:
    return {
      ...state,
      isDeleting: deleteRegionReducer(action),
      regionErrors: deleteRegionReducerError(state, action),
      regions: deleteTravelRegionsReducer(state, action)
    };
  default: return state;
  }
};
export default travelRegion;
