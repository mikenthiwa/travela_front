import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchCreateTravelReason,
  watchViewTravelReasonDetails,
  watchDeleteTravelReason,
  watchEditTravelReason
} from '../travelReasonsSaga';
import TravelReasonsAPI from '../../../services/TravelReasonsAPI';
import {
  CREATE_TRAVEL_REASON,
  VIEW_TRAVEL_REASON_DETAILS,
  EDIT_TRAVEL_REASON,
  EDIT_TRAVEL_REASON_SUCCESS,
  EDIT_TRAVEL_REASON_FAILURE,
} from '../../constants/actionTypes';

const body = {
  title: 'title',
  description: 'description'
};

const id = 1;

const newReason = {
  title: body.title,
  description: body.description,
  createdBy: 1,
};

const history = {
  push: jest.fn()
};

const response = {
  data: {
    success: true,
    message: 'success',
    newReason
  }
};

const responseError = {
  response: {
    status: 500,
    data: {
      message: 'Server error, try again'
    }
  }
};

const error = new Error('Server error, try again');
error.response = responseError.response;

// closeModal = jest.fn();
describe('Travel reasons Saga', () => {
  it('gets a response with travel reasons and dispatches CREATE_TRAVEL_REASON_SUCCESS', () => {
    return expectSaga(watchCreateTravelReason)
      .provide([[call(TravelReasonsAPI.createTravelReasons, body), response]])
      .dispatch({
        type: CREATE_TRAVEL_REASON,
        body,
        history
      })
      .silentRun();
  });

  it('handles an error', () => {
    return expectSaga(watchCreateTravelReason)
      .provide([[call(TravelReasonsAPI.createTravelReasons, body), throwError(error)]])
      .dispatch({
        type: CREATE_TRAVEL_REASON,
        body,
        history
      })
      .silentRun();
  });

  it('gets a response with editing travel reason and dispatches action', () => {
    const id = 1;
    return expectSaga(watchEditTravelReason)
      .provide([[matchers.call.fn(
        TravelReasonsAPI.editTravelReason, id, body.title, body.description),
      response]])
      .put({
        type: EDIT_TRAVEL_REASON_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: EDIT_TRAVEL_REASON,
        body
      })
      .silentRun();
  });

  it('handles travel reasons error', () => {
    const id = 1;
    return expectSaga(watchEditTravelReason)
      .provide([[
        matchers.call.fn(
          TravelReasonsAPI.editTravelReason,
          id, body.title, body.description
        ), throwError(error)
      ]])
      .put({
        type: EDIT_TRAVEL_REASON_FAILURE,
        error: error.response.data
      })
      .dispatch({
        type: EDIT_TRAVEL_REASON,
        body
      })
      .silentRun();
  });

  it('gets a response with travel reason details and dispatches VIEW_TRAVEL_REASON_DETAILS', () => {
    const response = {
      data: {
        success: true,
        message: 'success',
        newReason
      }
    };
    return expectSaga(watchViewTravelReasonDetails)
      .provide([[call(TravelReasonsAPI.viewTravelReasonDetails, id), response]])
      .dispatch({
        type: VIEW_TRAVEL_REASON_DETAILS,
        id,
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = {
      response: {
        data: {
          status: 500,
          message: 'Server error, try again'
        }
      }
    };
    return expectSaga(watchViewTravelReasonDetails)
      .provide([[call(TravelReasonsAPI.viewTravelReasonDetails, id), throwError(error)]])
      .dispatch({
        type: VIEW_TRAVEL_REASON_DETAILS,
        id
      })
      .silentRun();
  });
});
describe('Delete document', () => {
  const reasonId = 2;
  const response = {
    data: {
      deletedReason: {
        id: 2,
      }
    }
  };
  it('deletes a reason successfully', () => {
    return expectSaga(watchDeleteTravelReason)
      .provide([[
        call(TravelReasonsAPI.deleteTravelReason, reasonId),
        response
      ]])
      .put({
        type: 'DELETE_TRAVEL_REASON_SUCCESS',
        reasonId,
        deletedReason: response.data.deletedReason
      })
      .dispatch({
        type: 'DELETE_TRAVEL_REASON',
        reasonId,
      })
      .silentRun();
  });
  it('handles failed document deletion', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchDeleteTravelReason)
      .provide([[
        call(TravelReasonsAPI.deleteTravelReason, reasonId),
        throwError(error)
      ]])
      .put({
        type: 'DELETE_TRAVEL_REASON_FAILURE',
        error: error.message
      })
      .dispatch({
        type: 'DELETE_TRAVEL_REASON',
        reasonId,
      })
      .silentRun();
  });
});

