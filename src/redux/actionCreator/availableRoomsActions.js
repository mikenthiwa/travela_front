import {
  FETCH_AVAILABLE_ROOMS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  FETCH_AVAILABLE_ROOMS_FAILURE
} from '../constants/actionTypes';

export const fetchAvailableRooms = action => {
  return {
    type: FETCH_AVAILABLE_ROOMS,
    action
  };
};

export const fetchAvailableRoomsSuccess = ({ beds }) => ({
  type: FETCH_AVAILABLE_ROOMS_SUCCESS,
  beds
});

export const fetchAvailableRoomsfailure = error => ({
  type: FETCH_AVAILABLE_ROOMS_FAILURE,
  error
});
