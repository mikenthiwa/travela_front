import { 
  ADD_RESOURCE,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILURE,
  GET_RESOURCE,
  GET_RESOURCE_SUCCESS,
  GET_RESOURCE_FAILURE 
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  fetchResources: {},
  helpResourceErrors: '',
  helpResources: []
};

const helpResource = (state = initialState, action) => {
  switch (action.type) {
  case ADD_RESOURCE:
    return {
      ...state,
      isAddingResource: true,
    };
  case ADD_RESOURCE_SUCCESS:
    return {
      ...state,
      isAddingResource: false,
      resources: [action.response, ...state.resources]
    };
  case ADD_RESOURCE_FAILURE:
    return {
      ...state,
      isAddingResource: false,
      error: action.error
    };
  case GET_RESOURCE:
    return { ...state, isLoading: true };
  case GET_RESOURCE_SUCCESS:
    return { ...state, resources: action.response, isLoading: false };
  case GET_RESOURCE_FAILURE:
    return { ...state, isLoading: false, helpResourceErrors: action.error };
  default: return state;
  }
};
export default helpResource;
