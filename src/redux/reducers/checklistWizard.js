import { GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS } from '../constants/actionTypes';

const initialState = {
  checklists: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_DYNAMIC_CHECKLISTS:
    return { ...state, loading: true };
  case GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS:
    return { ...state, checklists: action.checklists, loading: false};
  case GET_ALL_DYNAMIC_CHECKLISTS_FAILURE:
    return { ...state, error: action.error, loading: false};
  default:
    return state;
  }
};
