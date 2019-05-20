import { 
  ADD_REGION,
  ADD_REGION_SUCCESS,
  ADD_REGION_FAILURE,
  GET_REGION,
  GET_REGION_SUCCESS,
  GET_REGION_FAILURE 
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  fetchRegions: {},
  regionErrors: '',
  regions: []
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
  default: return state;
  }
};
export default travelRegion;
