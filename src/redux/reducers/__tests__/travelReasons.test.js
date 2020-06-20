import travelReasonReducer, { initialState } from '../travelReason';
import {
  createTravelReason,
  createTravelReasonSuccess,
  createTravelReasonFailure,
  editTravelReason,
  fetchTravelReason,
  editTravelReasonSuccess,
  editTravelReasonFailure,
  viewTravelDetails,
  viewTravelDetailsFailure,
  viewTravelDetailsSuccess,
} from '../../actionCreator/travelReasonsActions';

const body = {
  title: 'title',
  description: 'description'
};

const travelReasons = [
  {
    id: 1,
    title: 'First title',
    description: 'First description'
  },
  {
    id: 2,
    title: 'Second title',
    description: 'Second description'
  }
];


const id = 1;

describe('Create Travel Reason actions', () => {
  it('should return initial state', () => {
    expect(travelReasonReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_TRAVEL_REASONS', () => {
    const action = createTravelReason(body);
    const newState = travelReasonReducer(initialState, action);
    const expectedState = { ...initialState, isCreating: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isCreating).toBe(true);
  });

  it('should handle CREATE_TRAVEL_REASONS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isCreating: true,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };

      const action = createTravelReasonSuccess(body);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreating).toBe(false);
    });

  it('should handle CREATE_TRAVEL_REASONS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isCreating: false,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };
      const errors = 'Error';
      const action = createTravelReasonFailure(errors);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreating).toBe(false);
    });

  it('should handle EDIT_TRAVEL_REASON', () => {
    const state = { ...initialState};
    const action = editTravelReason(body);
    const newState = travelReasonReducer(state, action);

    const expectedSate = {...state, isEditing: true, errors: {}};
    expect(newState).toEqual(expectedSate);
  });

  it('should handle FETCH_TRAVEL_REASON', () => {
    const state = {...initialState, travelReasons };
    const action = fetchTravelReason(1);
    const newState = travelReasonReducer(state, action);

    expect(newState).toEqual({
      ...state,
      editReason: travelReasons[0]
    });
  });

  it('should handle EDIT_TRAVEL_REASON_SUCCESS', () => {
    const state = {...initialState, travelReasons};
    const travelReason = {
      id: 1,
      title: 'First New Title',
      description: 'First New Description'
    };

    const action = editTravelReasonSuccess({ travelReason });
    const newState = travelReasonReducer(state, action);

    expect(newState).toEqual({
      ...state,
      travelReasons: [travelReason, travelReasons[1]]
    });
  });

  it('should handle EDIT_TRAVEL_REASON_FAILURE', () => {
    const state = {...initialState};
    const action = editTravelReasonFailure('Something went wrong');

    const newState = travelReasonReducer(state, action);
    expect(newState)
      .toEqual({
        ...state,
        errors: 'Something went wrong',
        isEditing: false
      });
  });
});

describe('View Travel Reason Details actions', () => {
  const currentState = {
    ...initialState,
    travelReasons: [

    ]
  };
  let action, newState, expectedState, error, mockComments;
  it('should return initial state', () => {
    expect(travelReasonReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle VIEW_TRAVEL_REASON_DETAILS', () => {
    const action = viewTravelDetails(id);
    const newState = travelReasonReducer(initialState, action);
    const expectedState = { ...initialState, isFetching: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isFetching).toBe(true);
  });

  it('should handle VIEW_TRAVEL_REASON_DETAILS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isFetching: true,
        reasonDetails: {
          title: 'title',
          description: 'description'
        }
      };

      const action = viewTravelDetailsSuccess(body);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isFetching).toBe(false);
    });

  it('should handle VIEW_TRAVEL_REASON_DETAILS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isFetching: false,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };
      const errors = 'Error';
      const action = viewTravelDetailsFailure(errors);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isFetching).toBe(false);
    });
  it('should handle DELETE_TRAVEL_REASON', () => {
    action = {
      type: 'DELETE_TRAVEL_REASON',
      reasonId: 2,
    };

    newState = travelReasonReducer(currentState, action);
    expectedState = {
      ...initialState,
      isDeleting: true,
      error: {},
    };

    expect(newState).toEqual(expectedState);
  });
});
describe('Delete travel reasons Reducer', () => {
  const currentState = {
    ...initialState,
    travelReasons: [

    ]
  };
  let action, newState, expectedState, error, mockComments;
  it('should handle DELETE_TRAVEL_REASON_SUCCESS', () => {
    action = {
      type: 'DELETE_TRAVEL_REASON_SUCCESS',
      reasonId: 2,
      deletedReason: {
        id: 2,
      }
    };

    newState = travelReasonReducer(currentState, action);
    expectedState = {
      ...initialState,
      travelReasons: [],
      isDeleting: false,
      error: ''
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_REASON_FAILURE', () => {
    error = 'Travel Reason not found';
    action = {
      type: 'DELETE_TRAVEL_REASON_FAILURE',
      error
    };

    newState = travelReasonReducer(initialState, action);
    expectedState = {
      ...initialState,
      travelReasons: [],
      isDeleting: false,
      error: 'Travel Reason not found'
    };
    expect(newState).toMatchObject(expectedState);
  });
});
