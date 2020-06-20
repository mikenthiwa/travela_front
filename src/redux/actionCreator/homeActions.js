import {
  FETCH_TEAMMATES,
  FETCH_TEAMMATES_SUCCESS,
  FETCH_TEAMMATES_FAILURE,
} from '../constants/actionTypes';

export const fetchTeammates = query => ({
  type: FETCH_TEAMMATES,
  query
});

export const fetchTeammatesSuccess = payload => ({
  type: FETCH_TEAMMATES_SUCCESS,
  payload
});

export const fetchTeammatesFailure = error => ({
  type: FETCH_TEAMMATES_FAILURE,
  error
});
