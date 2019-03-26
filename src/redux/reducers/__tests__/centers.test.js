import centers from '../centers';
import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE
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
  });
});
