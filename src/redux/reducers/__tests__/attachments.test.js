import attachments from '../attachments';
import {
  FETCH_ATTACHMENTS,
  FETCH_ATTACHMENTS_SUCCESS,
  FETCH_ATTACHMENTS_FAILURE,
} from '../../constants/actionTypes';

const initialState = {
  submissions: [],
  error: '',
  isFetching: false,
  success: false
};

const submissions = [{ destinationName: 'Lagos, Nigeria', checklist: [], tripId: 'wiWm8Nu2i8' },{ destinationName: 'Nairobi, Kenya', checklist: [], tripId: 'rOHLTQ7HwL' },{ destinationName: 'New York, United States', checklist: [], tripId: 'e5rUWSzpkE' }
];

describe('Attachments Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(attachments(initialState, unknownAction)).toEqual(initialState);
  });

  it('loads when fetching response', () => {
    const action = {
      type: FETCH_ATTACHMENTS
    };
    expect(attachments(initialState, action).isFetching).toBe(true);
  });

  it('returns attachments correctly', () => {
    const action = {
      type: FETCH_ATTACHMENTS_SUCCESS,
      payload: submissions
    };
    expect(attachments(initialState, action).submissions).toHaveLength(3);
  });

  it('updates the error with a fetch failure', () => {
    const errorAction = {
      type: FETCH_ATTACHMENTS_FAILURE,
      error: 'Server error'
    };
    expect(attachments(initialState, errorAction).error).toBe(
      errorAction.error
    );
  });
});
