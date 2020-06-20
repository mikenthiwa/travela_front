import {
  FETCH_ANALYTICS,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  payload: {},
  error: '',
  isLoading: false,
  success: false,
  departmentTrips: {
    loading: false,
    report: [],
    error: ''
  }
};

const analytics = (state = initialState, action) => {
  const {payload, error, type} = action;

  switch (type) {
  case FETCH_ANALYTICS:
    return { ...state, isLoading: true};

  case FETCH_ANALYTICS_SUCCESS:
    return {...state, payload, success: true, isLoading: false, error: ''};

  case FETCH_ANALYTICS_FAILURE:
    return {...state, payload: {}, success: false, isLoading: false, error};

  case FETCH_DEPARTMENT_TRIPS_ANALYTICS:
    return { ...state, departmentTrips: { ...state.departmentTrips,  loading: true }};

  case FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS:
    return { ...state,
      departmentTrips: { ...state.departmentTrips,  loading: false,  report: action.report }};

  case FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE:
    return { ...state,
      departmentTrips: { ...state.departmentTrips, loading: false,  error: action.error }};

  default:
    return state;
  }
};

export default analytics;
