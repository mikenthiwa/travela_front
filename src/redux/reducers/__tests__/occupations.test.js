import occupationReducer from '../occupations';
import { FETCH_OCCUPATIONS_SUCCESS } from '../../constants/actionTypes';

const occupations={
  'occupations': [
    {
      'id': 1,
      'occupationName': 'success manager',
      'createdAt': '2018-09-27T13:57:13.898Z',
      'updatedAt': '2018-09-27T13:57:13.898Z'
    },
    {
      'id': 2,
      'occupationName': 'accounts manager',
      'createdAt': '2018-09-27T13:57:13.898Z',
      'updatedAt': '2018-09-27T13:57:13.898Z'
    }]
};

describe('occupations reducer', () => {
  const initialState = { occupations: [] };
  it('should return correct initial state', done => {
    expect(occupationReducer(undefined, {})).toEqual(initialState);
    done();
  });
  it('dispatched action FETCH_OCCUPATIONS_SUCCESSS', () => {
    const action = {
      type: FETCH_OCCUPATIONS_SUCCESS,
      occupations
    };
    const newState = occupationReducer(initialState, action);
    expect(newState.occupations).toEqual(occupations);
  });
});
