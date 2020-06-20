import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  UPDATE_USER_CENTER,
  UPDATE_USER_CENTER_SUCCESS,
  UPDATE_USER_CENTER_FAILURE
} from '../constants/actionTypes';

export const fetchCenters = () => ({
  type: FETCH_CENTERS
});

export const fetchCentersSuccess = ({ centers }) => ({
  type: FETCH_CENTERS_SUCCESS,
  centers
});

export const fetchCentersFailure = error => ({
  type: FETCH_CENTERS_FAILURE,
  error
});

export const updateUserCenter = (data) => ({
  type: UPDATE_USER_CENTER,
  data
});

export const updateUserCenterSuccess = (response) => ({
  type: UPDATE_USER_CENTER_SUCCESS,
  response
});

export const updateUserCenterFailure = error => ({
  type: UPDATE_USER_CENTER_FAILURE,
  error
});

