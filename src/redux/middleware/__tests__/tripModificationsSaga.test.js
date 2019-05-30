import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  watchFetchModificationForRequest,
  watchSubmitModificationRequest,
  watchUpdateTripModification
} from '../tripModificationSaga';
import TripModificationsAPI from '../../../services/TripModificationsAPI';
import {
  fetchModificationRequest,
  fetchModificationRequestFailure,
  fetchModificationRequestSuccess,
  submitModificationRequest,
  submitModificationRequestFailure,
  submitModificationRequestSuccess,
  updateModification,
  updateModificationFailure,
  updateModificationSuccess
} from '../../actionCreator/tripModificationActions';


describe('tripModificationsSaga', () => {
  describe('create modification request', () => {
    const data = {
      requestId: 1,
      type: 'Cancel Trip',
      reason: 'This is the reason'
    };
    const response = {
      data: {
        success: true,
        message: 'Trip modification created successfully',
        modification: {
          id: 1,
          type: 'Cancel Trip',
          status: 'Open',
        }
      }
    };
    const error = new Error();
    error.response = {
      status: 400,
      data: {
        success: false,
        message: 'This request has not been approved by the manager'
      }
    };

    it('should successfully make a modification request', () => {
      return expectSaga(watchSubmitModificationRequest, TripModificationsAPI)
        .provide([
          [
            call(TripModificationsAPI.submitModificationRequest, data.requestId, data.type, data.reason),
            response
          ]
        ])
        .put(submitModificationRequestSuccess(response.data))
        .dispatch(submitModificationRequest(data.requestId, data.type, data.reason))
        .silentRun();
    });

    it('should toast an error upon an error creating the modification request', () => {
      return expectSaga(watchSubmitModificationRequest, TripModificationsAPI)
        .provide([
          [call(TripModificationsAPI.submitModificationRequest, data.requestId, data.type, data.reason),
            throwError(error)]
        ]).put(submitModificationRequestFailure(error.response.data.message))
        .dispatch(submitModificationRequest(data.requestId, data.type, data.reason))
        .silentRun();
    });
  });

  describe('fetch trip modifications saga', () => {
    const requestId = 1;
    const response = {
      data: {
        success: true,
        modifications: [
          {
            id: 1,
            type: 'Cancel Trip',
            status: 'Open'
          }
        ]
      }
    };
    const error = new Error();
    error.response = {
      status: 400,
      data: {
        success: false,
        message: 'A request with this id does not exist'
      }
    };

    it('should make a successful request to fetch modifications', () => {
      return expectSaga(watchFetchModificationForRequest, TripModificationsAPI)
        .provide([
          [call(TripModificationsAPI.getModificationForRequest, requestId), response]
        ]).put(fetchModificationRequestSuccess(response.data))
        .dispatch(fetchModificationRequest(requestId))
        .silentRun();
    });

    it('should dispatch an error if the request was not successful', () => {
      return expectSaga(watchFetchModificationForRequest, TripModificationsAPI)
        .provide([
          [call(TripModificationsAPI.getModificationForRequest, requestId), throwError(error)]
        ]).put(fetchModificationRequestFailure(error.response.data.message))
        .dispatch(fetchModificationRequest(requestId))
        .silentRun();
    });
  });

  describe('update the status of a trip modification', () => {
    const modificationId = 1;
    const status = 'Approved';

    const response = {
      data: {
        success: true,
        modification: {
          id: modificationId,
          status,
          type: 'Cancel Trip'
        }
      }
    };

    const error = new Error();
    error.response = {
      status: 400,
      data: {
        success: false,
        message: 'Trip modification with this id does not exist'
      }
    };

    it('should update the status of a request and dispatch a success action', () => {
      return expectSaga(watchUpdateTripModification, TripModificationsAPI)
        .provide([
          [call(TripModificationsAPI.updateModification, modificationId, status), response]
        ]).put(updateModificationSuccess(response.data))
        .dispatch(updateModification(modificationId, status))
        .silentRun();
    });

    it('should dispatch an error if the update was not successful', () => {
      return expectSaga(watchUpdateTripModification, TripModificationsAPI)
        .provide([
          [call(TripModificationsAPI.updateModification, modificationId, status), throwError(error)]
        ]).put(updateModificationFailure(error.response.data.message))
        .dispatch(updateModification(modificationId, status))
        .silentRun();
    });
  });
});
