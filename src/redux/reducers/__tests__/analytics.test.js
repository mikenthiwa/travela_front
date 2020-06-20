import analytics from '../analytics';
import {
  fetchAnalytics, fetchAnalyticsSuccess, fetchAnalyticsFailure
} from '../../actionCreator/analyticsActions';
import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
} from '../../constants/actionTypes';
import {
  fetchDepartmentsTripsResponse
} from '../../__mocks__/reduxMocks';

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

describe('View  Request analytics reducer', () => {
  it('should update \'isLoading\' state to true while fetching analytincs', (done) => {
    const action = fetchAnalytics('?location');
    const newState = analytics(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });

  it('should handle FETCH_ANALYTICS',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        payload: {}
      };
      const response = {total_requests: 230};
      const action = fetchAnalyticsSuccess(response);
      const newState = analytics(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.payload).toMatchObject(response);
      done();
    });

  it('should handle FETCH_ANALYTICS_FAILURE',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        error: null
      };
      const error = 'Error';
      const action = fetchAnalyticsFailure(error);
      const newState = analytics(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(error);
      done();
    });
});


describe('Test suite for Analytics reducer', () => {
  describe('Test suite for Department Trips Analytics', () => {
    it('should return initial state', () => {
      expect(analytics(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('should return loading state for FETCH_DEPARTMENT_TRIPS_ANALYTICS', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: true,
        }
      });
    });

    it('should update state with payload for FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
        report: fetchDepartmentsTripsResponse.data,
        success: fetchDepartmentsTripsResponse.success
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: false,
          report: action.report,
        }
      });
    });

    it('should update state with error message for FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
        error: 'An error occurred'
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: false,
          error: action.error,
        }
      });
    });
  });
});
