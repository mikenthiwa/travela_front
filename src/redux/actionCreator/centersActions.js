import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
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

