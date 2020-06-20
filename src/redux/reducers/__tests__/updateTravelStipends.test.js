import travelStipends from '../travelStipends';
import {
  updateTravelStipend,
  updateTravelStipendSuccess,
  updateTravelStipendFailure,
  fetchSingleTravelStipend
} from '../../actionCreator/travelStipendsActions';
import mockData from '../../../mockData/travelStipend';

describe('PUT api/v1/travelStipend/:id', () => {
  const { action: { stipendId, payload }, stipends, selectedStipend } = mockData;

  const initialState = {
    stipends,
    selectedStipend,
    updatedStipend: {
      isSaving: false,
      errors: {},
      data: {}
    }
  };
  const error = {
    error: 'Something went wrong'
  };

  it('should return initial state when no action is dispatched', () => {
    const action = () => ({
      type: ''
    });
    const newState = travelStipends(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('sets isSaving to true when EDIT_TRAVEL_STIPEND is dispatched', () => {
    const expectedState = {
      stipends,
      selectedStipend,
      updatedStipend: {
        errors: {},
        isSaving: true
      }
    };
    const dispatchedAction = updateTravelStipend(stipendId, payload);
    const newState = travelStipends(initialState, dispatchedAction);
    expect(newState).toEqual(expectedState);
  });

  it('should set the errors when EDIT_TRAVEL_STIPEND_FAILURE dispatched', () => {
    const expectedState = {
      stipends,
      selectedStipend,
      updatedStipend: {
        errors: {
          error: error.error,
        },
        isSaving: false
      }
    };
    const dispatchedAction = updateTravelStipendFailure(error);
    const newState = travelStipends(initialState, dispatchedAction);
    expect(newState).toEqual(expectedState);
  });

  it('should set the data when EDIT_TRAVEL_STIPEND_SUCCESS dispatched', () => {
    const expectedState = {
      stipends,
      selectedStipend,
      updatedStipend: {
        errors: {},
        isSaving: false,
        data: {
          amount: 345,
          center: {
            location: 'Nairobi, Kenya'
          },
          id: 1
        }
      }
    };
    const dispatchedAction = updateTravelStipendSuccess({travelStipend: stipends[0]});
    const newState = travelStipends(initialState, dispatchedAction);
    expect(newState).toEqual(expectedState);
  });

  it('should set selected stipend when FETCH_SINGLE_TRAVEL_STIPEND', () => {
    const expectedState = {
      ...initialState,
      selectedStipend: {}
    };
    const dispatchedAction = fetchSingleTravelStipend(selectedStipend.id);
    const newState = travelStipends(initialState, dispatchedAction);
    expect(newState).toEqual(expectedState);
  });
});
