import {
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchAvailableRoomsfailure
} from '../availableRoomsActions';
import {
  FETCH_AVAILABLE_ROOMS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  FETCH_AVAILABLE_ROOMS_FAILURE
} from '../../constants/actionTypes';
import beds from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

describe('Available rooms action types', () => {
  it('should return action of type  FETCH_AVAILABLE_ROOMS', () => {
    const action = {
      gender: 'Male',
      arrivalDate: '2018-12-23',
      departureDate: '2018-12-29',
      location: 'Lagos,Nigeria'
    };
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS,
      action
    };
    const newAction = fetchAvailableRooms(action);
    expect(newAction).toEqual(expectedAction);
  });
  it('should return action of type  FETCH_AVAILABLE_ROOMS_FAILURE', () => {
    const error = 'Server error, please try again';
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS_FAILURE,
      error
    };
    const newAction = fetchAvailableRoomsfailure(error);
    expect(newAction).toEqual(expectedAction);
  });
  it('should return action of type FETCH_AVAILABLE_ROOMS_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Available rooms fetched',
        beds
      }
    };
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS_SUCCESS,
      beds
    };
    const newAction = fetchAvailableRoomsSuccess(response.data);
    expect(newAction).toEqual(expectedAction);
  });
});
