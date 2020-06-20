import noPassport from '../noPassport';
import {ADD_NO_PASSPORT_NOTIFICATION, ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, ADD_NO_PASSPORT_NOTIFICATION_FAILURE} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  message: '',
  error: null
};

describe('No Passport Reducer Test Suite', () => {
  it('should return initial state', () => {
    expect(noPassport(undefined, {})).toEqual({...initialState});
  });

  it('should return correct case for ADD_NO_PASSPORT_NOTIFICATION', () => {
    const action = { type: ADD_NO_PASSPORT_NOTIFICATION };
    expect(noPassport(initialState, action)).toEqual({...initialState, isLoading: true});
  });
  it('should return correct case for ADD_NO_PASSPORT_NOTIFICATION_SUCCESS', () => {
    const action = { type: ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, message: 'notification sent' };
    expect(noPassport(initialState, action)).toEqual({...initialState, isLoading: false, message: action.message });
  });
  it('should return correct case for ADD_NO_PASSPORT_NOTIFICATION_FAILURE', () => {
    const action = { type: ADD_NO_PASSPORT_NOTIFICATION_FAILURE, error: 'something went wrong' };
    expect(noPassport(initialState, action)).toEqual({...initialState, isLoading: false, error: action.error });
  });
});
