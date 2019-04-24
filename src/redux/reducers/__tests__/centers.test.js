import centers from '../centers';
import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  UPDATE_USER_CENTER,
  UPDATE_USER_CENTER_SUCCESS,
  UPDATE_USER_CENTER_FAILURE
} from '../../constants/actionTypes';

const centersResponse = [{
  id: 1,
  location: 'Lagos, Nigeria'
}, {
  id: 2,
  location: 'Nairobi, Kenya'
}];


describe('Centers Reducer', () => {
  describe('Fetch Centers Reducer', () => {
    const initialState = {
      update: {
        isLoading: false,
      }
    };
    it('returns the correct initial state', () => {
      expect(centers(undefined, {})).toEqual({
        ...initialState
      });
    });
    it('returns the correct state for FETCH_CENTERS', () => {
      const action = {
        type: FETCH_CENTERS
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: true
      });
    });
    it('returns the correct state for FETCH_CENTERS_SUCCESS', () => {
      const action = {
        type: FETCH_CENTERS_SUCCESS,
        centers: centersResponse
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        centers: action.centers
      });
    });

    it('returns the correct state for FETCH_USERS_FAILURE', () => {
      const action = {
        type: FETCH_CENTERS_FAILURE,
        error: 'An error occurres'
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        centersError: action.error
      });
    });

    it('returns the correct state for UPDATE_USER_CENTER', () => {
      const action = {
        type: UPDATE_USER_CENTER
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('returns the correct state for UPDATE_USER_CENTER_SUCCESS', () => {
      const action = {
        type: UPDATE_USER_CENTER_SUCCESS,
        centersUpdate: centersResponse
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        centers: action.centers
      });
    });

    it('returns the correct state for UPDATE_USER_CENTER_FAILURE', () => {
      const action = {
        type: UPDATE_USER_CENTER_FAILURE,
        error: 'An error occurres'
      };
      expect(centers(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        centersUpdateError: action.error
      });
    });
  });
});
