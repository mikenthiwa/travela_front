import {
  ADD_MAINTENANCE_RECORD,
  UPDATE_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD_SUCCESS, 
  UPDATE_MAINTENANCE_RECORD_FAILURE, 
  DELETE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD_SUCCESS, 
  DELETE_MAINTENANCE_RECORD_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  maintenance: {},
  error: '',
  roomId: ''
};

const maintenance = (state = initialState, action) => {
  switch(action.type) {
  case ADD_MAINTENANCE_RECORD:
    return { ...state, roomId: ''};
  case UPDATE_MAINTENANCE_RECORD:
    return { ...state, isLoading: true };
  case UPDATE_MAINTENANCE_RECORD_SUCCESS:
    return { ...state, maintenance: action.maintenance, error: '', isLoading: false };
  case UPDATE_MAINTENANCE_RECORD_FAILURE:
    return { ...state, maintenance: {}, error: action.error, isLoading: false };
  case DELETE_MAINTENANCE_RECORD:
    return { ...state, isLoading: true };
  case DELETE_MAINTENANCE_RECORD_SUCCESS:
    return { ...state, roomId: action.roomId, error: '', isLoading: false };
  case DELETE_MAINTENANCE_RECORD_FAILURE:
    return { ...state, roomId: '', error: action.error, isLoading: false };
  default:
    return state;
  }
};

export default maintenance;
