import travelStipends from '../travelStipends';
import {
  fetchAllTravelStipends,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess,
  deleteTravelStipend,
  deleteTravelStipendFailure,
  deleteTravelStipendSuccess, fetchSingleTravelStipend
} from '../../actionCreator/travelStipendsActions';
import mockData from '../../../mockData/travelStipend';
import {
  createStipendMock,
} from '../../__mocks__/reduxMocks';

describe('TravelStipendsReducer', () => {
  const initialState = {
    error: {},
    stipends: [],
    isLoading: false
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = travelStipends(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('sets isLoading to true when action is FETCH_ALL_TRAVEL_STIPENDS', () => {
    const action = fetchAllTravelStipends();
    const newState = travelStipends(initialState, action);
    const expectedState = {...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new travelStipends if action is FETCH_ALL_TRAVEL_STIPENDS_SUCCESS'
    , () => {
      const { stipends} = mockData;
      const action = fetchAllTravelStipendsSuccess(stipends);
      const newState = travelStipends(initialState, action);
      const expectedState = {...initialState, stipends:action.stipends };
      expect(newState).toEqual(expectedState);
    });

  it('updates state with an error if action is FETCH_ALL_TRAVEL_STIPENDS_FAILURE'
    , () => {
      const error = 'An error occured while fetching your request';
      const action = fetchAllTravelStipendsFailure(error);
      const newState = travelStipends(initialState, action);
      const expectedState = {...initialState, error: action.error };
      expect(newState).toEqual(expectedState);
    });

  it('sets isDeleting to true when action is DELETE_TRAVEL_STIPEND', () => {
    const { stipends }=mockData;
    const stipendId =  stipends[0].id;
    const expectedState = {...initialState, isDeleting: true};
    const action = deleteTravelStipend(stipendId);
    const newState = travelStipends(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('sets selectedStipend when action is FETCH_SINGLE_STIPEND_DETAILS ', ()=>{
    const { stipends } = mockData;
    const stipendId = stipends[0].id;
    const action = fetchAllTravelStipendsSuccess(mockData);
    const newState = travelStipends(initialState, action);
    const singleStipendAction = fetchSingleTravelStipend(stipendId);
    const newSingleStipendState = travelStipends(newState, singleStipendAction);
    const expectedState = {...newState, selectedStipend: stipends[0]};
    expect(newSingleStipendState).toEqual(expectedState);
  });

  it('should delete a travel stipend when action is DELETE_TRAVEL_STIPEND', () =>{
    const { stipends } = mockData;
    const stipendId = stipends[0].id;
    const action = fetchAllTravelStipendsSuccess(mockData);
    const newState = travelStipends(initialState, action);
    const deleteSuccessAction = deleteTravelStipendSuccess('deleted successfully',stipendId);
    const otherNewState = travelStipends(newState,deleteSuccessAction);
    stipends.splice(0, 1);
    const expectedState = {...newState, stipends, isDeleting:false};
    expect(otherNewState).toEqual(expectedState);
  });

  it('sets errors when action id DELETE_TRAVEL_STIPEND_FAILURE', ()=>{
    const action = deleteTravelStipendFailure({message:'did not delete'});
    const newState = travelStipends(initialState, action);
    const expectedState = {...initialState, error: {message:'did not delete'}, isDeleting: false};
    expect(newState).toEqual(expectedState);
  });

});

describe('travel stipends Reducer', () => {

  describe('Create Requests reducer', () => {
    let initialState = {
      isLoading: false,
      error: '',
      travelStipend: {},
    };

    let action, newState, receivedState, error;

    const requestObj = { ...createStipendMock.requestObj };

    it('should return initial state', () => {
      expect(travelStipends(initialState, {})).toEqual({
        ...initialState
      });
    });

    it('should handle CREATE_TRAVEL_STIPEND', () => {
      action = {
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: { ...requestObj },
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        ...initialState,
        isLoading: true,
      };

      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_TRAVEL_STIPEND_FAILURE', () => {
      error = 'failed to add new stipend';
      action = {
        type: 'CREATE_TRAVEL_STIPEND_FAILURE',
        error
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        ...initialState,
        isLoading: false,
        error: {
          error: 'failed to add new stipend'
        },
        travelStipend: {}
      };
      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_TRAVEL_STIPEND_SUCCESS', () => {
      initialState = {
        travelStipend: {},
      };
      action = {
        type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
        newStipend: { ...requestObj }
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        isLoading: false,
        travelStipend: action.newStipend,
        error: {}
      };

      expect(newState).toEqual(receivedState);
      expect(travelStipends(newState, action).travelStipend.center).toMatch('Kigali');
    });
  });
});
