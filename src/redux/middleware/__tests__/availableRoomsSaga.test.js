import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { watchFetchAvailableRooms } from '../availableRoomsSaga';
import AvailableRoomsAPI from '../../../services/AvailableRoomsAPI';
import beds from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const response = {
  data: {
    success: true,
    message: 'Available rooms fetched',
    beds
  }
};
const error = 'Possible network error, please reload the page';

const gender = 'Male';
const arrivalDate = '2018-12-23';
const departureDate = '2018-12-29';
const location = 'Lagos, Nigeria';
const tripType = 'multi';

const data = {
  action: {
    gender,
    arrivalDate,
    departureDate,
    location,
    tripType
  }
};

describe('Available Rooms Saga ', () => {
  it('fetches available rooms saga', () => {
    return expectSaga(watchFetchAvailableRooms, AvailableRoomsAPI).provide([
      [call(AvailableRoomsAPI.getAvailableRooms, data), response]
    ]).put({
      type: 'FETCH_AVAILABLE_ROOMS_SUCCESS',
      beds: response.data.beds
    }).dispatch({
      type: 'FETCH_AVAILABLE_ROOMS',
      action: data.action
    }).silentRun();
  });
  it('fails to fetch available rooms saga', () => {
    return expectSaga(watchFetchAvailableRooms, AvailableRoomsAPI).provide([
      [call(AvailableRoomsAPI.getAvailableRooms, data), throwError(error)]
    ]).put({
      type: 'FETCH_AVAILABLE_ROOMS_FAILURE',
      error
    }).dispatch({
      type: 'FETCH_AVAILABLE_ROOMS',
      action: data.action
    }).silentRun();
  });
});
