import {
  deleteTravelStipend, deleteTravelStipendFailure, deleteTravelStipendSuccess,
  fetchAllTravelStipends,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess, fetchSingleTravelStipend
} from '../travelStipendsActions';
import {
  DELETE_TRAVEL_STIPEND,
  DELETE_TRAVEL_STIPEND_FAILURE,
  DELETE_TRAVEL_STIPEND_SUCCESS, FETCH_SINGLE_TRAVEL_STIPEND
} from '../../constants/actionTypes';

const mockData = {
  stipends: [
    {
      center: {location: 'Nairobi, Kenya'},
      amount: 345
    },
    {
      center: {location: 'Kampala, Uganda'},
      amount: 345
    }
  ]
};
describe('listTravelStipendsActions', () => {
  it('should return action with type FETCH_TRAVEL_STIPENDS', () => {
    const action = fetchAllTravelStipends();
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS'
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_STIPENDS_SUCCESS', () => {
    const { stipends } = mockData;
    const action = fetchAllTravelStipendsSuccess({stipends});
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS_SUCCESS',
      stipends
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_STIPENDS_FAILURE', () => {
    const error = { error: {}};
    const action = fetchAllTravelStipendsFailure(error);
    const expectedResult = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS_FAILURE',
      error
    };
    expect(action).toEqual(expectedResult);
  });
});

describe('DELETE travel stipend actions', function () {
  it('returns action of type DELETE_TRAVEL_STIPEND', ()=>{
    const action=deleteTravelStipend(5);
    const expectedOutput = {
      type: DELETE_TRAVEL_STIPEND,
      stipendId: 5
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type DELETE_TRAVEL_STIPEND_SUCCESS', ()=>{
    const action = deleteTravelStipendSuccess('successfully deleted',6);
    const expectedOutput = {
      type: DELETE_TRAVEL_STIPEND_SUCCESS,
      deleteMessage: 'successfully deleted',
      stipendId: 6
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type DELETE_TRAVEL_STIPEND_FAILURE', ()=>{
    const action=deleteTravelStipendFailure({message:'did not delete'});
    const expectedOutput = {
      type: DELETE_TRAVEL_STIPEND_FAILURE,
      error: {message: 'did not delete'}
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_SINGLE_TRAVEL_STIPEND', ()=>{
    const action = fetchSingleTravelStipend(1);
    const expectedOutput = {
      type: FETCH_SINGLE_TRAVEL_STIPEND,
      stipendId: 1
    };
    expect(action).toEqual(expectedOutput);
  });

});
