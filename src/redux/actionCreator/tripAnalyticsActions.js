import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE
} from '../constants/actionTypes';

export const fetchDepartmentTrips = (query) => ({
  type: FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  query
});

export const fetchDepartmentTripsSuccess = (response) => ({
  type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  report: response.data,
  success: response.success
});

export const fetchDepartmentTripsFailure = (error) => ({
  type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
  error
});
