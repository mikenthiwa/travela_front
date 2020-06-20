import teammates from '../teammates';
import {
  fetchTeammates, fetchTeammatesSuccess, fetchTeammatesFailure
} from '../../actionCreator/homeActions';

const initialState = {
   payload: [],
  error: '',
  isLoading: false,
  success: false,
  message: ''
};

describe('View  Request teammates reducer', () => {
  it('should update \'isLoading\' state to true while fetching teammates', (done) => {
    const action = fetchTeammates('TDD');
    const newState = teammates(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });

  it('should handle FETCH_TEAMMATES',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        payload: []
      };
      const response = {teammates: []};
      const action = fetchTeammatesSuccess(response);
      const newState = teammates(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.payload).toMatchObject(response);
      done();
    });

  it('should handle FETCH_TEAMMATES_FAILURE',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        error: null
      };
      const error = 'Error';
      const action = fetchTeammatesFailure(error);
      const newState = teammates(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(error);
      done();
    });

  it('should return initial state', () => {
    expect(teammates(undefined, {})).toEqual({
      ...initialState
    });
  });
});
