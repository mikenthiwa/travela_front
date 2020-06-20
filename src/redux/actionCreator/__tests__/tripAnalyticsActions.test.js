import {
  fetchDepartmentTrips,
  fetchDepartmentTripsSuccess,
  fetchDepartmentTripsFailure,
} from '../tripAnalyticsActions';
import {
  fetchDepartmentsTripsResponse,
  fetchDepartmentsTripsError
} from '../../__mocks__/reduxMocks';

describe('Departments Trips Analytics Action', () => {
  it('should return action type of FETCH_DEPARTMENT_TRIPS_ANALYTICS and payload', () => {
    const query = {
      filterBy: 'month',
      type: 'json'
    };
    const expectedAction = {
      type: 'FETCH_DEPARTMENT_TRIPS_ANALYTICS',
      query
    };
    const createdAction = fetchDepartmentTrips(query);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type of FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS and payload', () => {
    const expectedAction = {
      type: 'FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS',
      report: fetchDepartmentsTripsResponse.data,
      success: fetchDepartmentsTripsResponse.success
    };
    const createdAction = fetchDepartmentTripsSuccess(fetchDepartmentsTripsResponse);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type of FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE and payload', () => {
    const error = 'type must be \'json\' or \'file\'';
    const expectedAction = {
      type: 'FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE',
      error
    };
    const createdAction = fetchDepartmentTripsFailure(error);
    expect(createdAction).toEqual(expectedAction);
  });
});
