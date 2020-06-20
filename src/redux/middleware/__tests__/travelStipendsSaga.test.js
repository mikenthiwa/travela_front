import { call } from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchgetAllTravelStipends,
  watchDeleteTravelStipend,
  watchCreateTravelStipendAsync,
  watchUpdateTravelStipend,
} from '../travelStipendsSaga';
import TravelStipendsAPI from '../../../services/TravelStipendsAPI';
import {
  DELETE_TRAVEL_STIPEND_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  DELETE_TRAVEL_STIPEND_FAILURE,
  DELETE_TRAVEL_STIPEND,
  EDIT_TRAVEL_STIPEND,
  EDIT_TRAVEL_STIPEND_SUCCESS,
  EDIT_TRAVEL_STIPEND_FAILURE
} from '../../constants/actionTypes';
import mockData from '../../../mockData/travelStipend';



describe('Travel stipends Saga', () => {
  const { stipends} = mockData;
  it('gets a response with travel stipends and dispatches FETCH_ALL_TRAVEL_STIPENDS_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Travel Stipends retrieved successfully',
        stipends: stipends
      }
    };
    return expectSaga(watchgetAllTravelStipends)
      .provide([[call(TravelStipendsAPI.getAllTravelStipends), response]])
      .put({
        type: FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
        stipends: response.data.stipends
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_STIPENDS
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchgetAllTravelStipends)
      .provide([[call(TravelStipendsAPI.getAllTravelStipends), throwError(error)]])
      .put({
        type: FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
        error: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_STIPENDS
      })
      .silentRun();
  });

});


describe('Create Travel Stipend Saga', () => {
  const action = {
    requestData: {
      center: 'Kigali',
      stipend: 1234
    }
  };

  const response = {
    data: { newStipend: {
      center: 'Kigali',
      stipend: 1234
    }
    }
  };

  const error = {
    response: {
      status: 422,
      data: {
        errors: [{msg: 'Center is required'}, {msg: 'Stipend is required'}]
      }
    }
  };

  it('Posts a new stipend successfully', () => {
    return expectSaga(watchCreateTravelStipendAsync, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(TravelStipendsAPI.postTravelStipend, action.requestData), response]
      ])
      .put({
        type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
        newStipend: response.data
      })
      .dispatch({
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: action.requestData
      })
      .silentRun();
  });

  it('throws error while creating a new request', () => {
    return expectSaga(watchCreateTravelStipendAsync, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(TravelStipendsAPI.postTravelStipend, action.requestData), throwError(error)]
      ])
      .put({
        type: 'CREATE_TRAVEL_STIPEND_FAILURE',
        error: 'Center is required, Stipend is required'
      })
      .dispatch({
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: action.requestData
      })
      .silentRun();
  });
});

describe('Delete travel stipend saga', () => {
  const action = {
    stipendId: 5
  };

  const response = {
    data: {
      message: 'Successfully deleted travel stipend',
      stipendId: 5
    }
  };

  const stipendId = 5;

  const error = 'Possible network error, please reload the page';


  it('deletes a travel stipend', () => {
    return expectSaga(watchDeleteTravelStipend,TravelStipendsAPI)
      .provide([
        [matchers.call.fn(TravelStipendsAPI.deleteTravelStipend, action.stipendId), response]
      ])
      .put({
        type: 'DELETE_TRAVEL_STIPEND_SUCCESS',
        deleteMessage: response.data.message,
        stipendId: response.data.stipendId
      })
      .dispatch({
        type: 'DELETE_TRAVEL_STIPEND',
        stipendId,
      })
      .silentRun();
  });

  it('throws error if delete travel stipend fails', () => {
    return expectSaga(watchDeleteTravelStipend, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(TravelStipendsAPI.deleteTravelStipend, action.stipendId), throwError(error)]
      ])
      .put({
        type: 'DELETE_TRAVEL_STIPEND_FAILURE',
        error
      })
      .dispatch({
        type: 'DELETE_TRAVEL_STIPEND',
        stipendId
      })
      .silentRun();
  });
});

describe('Update Travel Stipend', () => {
  const { action, validationError, response, otherError } = mockData;
  const { stipendId, payload } = action;
  const { response: { data: { errors } } } = validationError;

  it('renders validation errors while editing a travel stipend', () => {
    return expectSaga(watchUpdateTravelStipend, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(
          TravelStipendsAPI.updateTravelStipend,
          stipendId,
          payload
        ), throwError(validationError)]
      ])
      .put({
        type: EDIT_TRAVEL_STIPEND_FAILURE,
        errors: {
          stipend: errors[0].message
        }
      })
      .dispatch({
        type: EDIT_TRAVEL_STIPEND,
        stipendId,
        payload
      })
      .silentRun();
  });

  it('renders errors while editing a travel stipend', () => {
    return expectSaga(watchUpdateTravelStipend, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(
          TravelStipendsAPI.updateTravelStipend,
          stipendId,
          payload
        ), throwError(otherError)]
      ])
      .put({
        type: EDIT_TRAVEL_STIPEND_FAILURE,
        errors: {}
      })
      .dispatch({
        type: EDIT_TRAVEL_STIPEND,
        stipendId,
        payload
      })
      .silentRun();
  });

  it('should update a travel stipend', () => {
    const history = {
      push: jest.fn(),
    };
    return expectSaga(watchUpdateTravelStipend, TravelStipendsAPI)
      .provide([
        [matchers.call.fn(
          TravelStipendsAPI.updateTravelStipend,
          stipendId,
          payload,
        ), response]
      ])
      .put({
        type: EDIT_TRAVEL_STIPEND_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: EDIT_TRAVEL_STIPEND,
        stipendId,
        payload,
        history
      })
      .silentRun();
  });

});
