import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchFetchUsersReadinessDocuments,
  watchFetchReadinessDocuments,
  watchFetchReadinessDocumentDetails,
  watchVerifyTravelReadinessDocuments,
  watchEditTravelReadinessDocument,
  watchDeleteTravelReadinessDocument
} from '../travelReadinessDocumentsSaga';
import * as types from '../../constants/actionTypes';
import TravelReadinessDocumentsAPI from '../../../services/TravelReadinessDocumentsAPI';

toast.error = jest.fn();
toast.success = jest.fn();

describe('Travel Readiness Documents saga', () => {
  describe('fetchUsersReadinessDocumentsAsync', () => {
    const query = 'uchechukwu';
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched users',
        users: [{id: 1}, {id: 2}],
        meta: {
          currentPage: 1,
          pageCount: 1,
        },
        searchQuery: 'uchechukwu'
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches all users and their readiness documents', () => {
      return expectSaga(watchFetchUsersReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getAllUsersReadiness, query), response]
        ])
        .put({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
          users: response.data.users,
          meta: response.data.meta,
        })
        .dispatch({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS,
          query
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchUsersReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getAllUsersReadiness, query), throwError(error)]
        ])
        .put({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS,
          query
        })
        .silentRun();
    });
  });

  describe('fetchReadinessDocumentsAsync', () => {
    const userId = 'xclfkgs';
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched user readiness',
        user: {id: 1},
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches a users readiness documents', () => {
      return expectSaga(watchFetchReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getUserReadiness, userId), response]
        ])
        .put({
          type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
          user: response.data.user
        })
        .dispatch({
          type: types.FETCH_USER_READINESS_DOCUMENTS,
          userId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getUserReadiness, userId), throwError(error)]
        ])
        .put({
          type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_USER_READINESS_DOCUMENTS,
          userId,
        })
        .silentRun();
    });
  });

  describe('fetchReadinessDocumentDetailsAsync', () => {
    const documentId = 'ableGod';
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched document',
        document: {id: 'ableGod'},
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches a travel readiness document', () => {
      return expectSaga(watchFetchReadinessDocumentDetails)
        .provide([
          [call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, documentId), response]
        ])
        .put({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
          document: response.data.document
        })
        .dispatch({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchReadinessDocumentDetails)
        .provide([
          [call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, documentId), throwError(error)]
        ])
        .put({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });
  });

  describe('Verify Travel Readiness Document', () => {
    const documentId = 'getIt';
    const response = {
      data: {
        success: true,
        message: 'Successfully verified document',
        updatedDocument: { id: 'getIt' },
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('verifies travel readiness document', () => {
      return expectSaga(watchVerifyTravelReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.verifyTravelReadinessDocument, documentId), response]
        ])
        .put({
          type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
          document: response.data.updatedDocument
        })
        .dispatch({
          type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchVerifyTravelReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.verifyTravelReadinessDocument, documentId), throwError(error)]
        ])
        .put({
          type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });
  });

  describe('Update Travel Readiness Document', () => {
    const documentId = 'getIt';
    const payload = {
      'visa': {
        'entryType':'Multiple',
        'country': 'Estoni and Herzegovina',
        'dateOfIssue': '02/01/2018',
        'expiryDate': '06/01/2019',
        'cloudinaryUrl': 'http://n.com'
      }
    };
    const response = {
      data: {
        success: true,
        message: 'Visa updated successfully',
        updatedDocument: { id: 'getIt' },
      }
    };

    const error = {
      response: {
        data: 'Server error, try again',
        status: 500
      }
    };


    it('updates travel readiness document', () => {
      return expectSaga(watchEditTravelReadinessDocument)
        .provide([
          [call(TravelReadinessDocumentsAPI.editTravelReadinessDocument, 'visa', payload, documentId), response]
        ])
        .put({
          type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
          document: response.data.updatedDocument
        })
        .dispatch({
          type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
          documentType: 'visa',
          payload,
          documentId,
        })
        .silentRun();
    });

    it('handles errors from update', () => {
      return expectSaga(watchEditTravelReadinessDocument)
        .provide([
          [matchers.call.fn(
            TravelReadinessDocumentsAPI.editTravelReadinessDocument,
            'passport',{
              name: 'value'
            }, documentId),
          throwError(error)]
        ])
        .put({
          type: types.EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
          error: error.response.data
        })
        .dispatch({
          type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
          documentType: 'passport',
          documentId,
        })
        .silentRun();
    });
  });

  describe('DELETE Travel Readiness Document', () => {
    const documentId = 'getIt';
    const response = {
      data: {
        success: true,
        message: 'Successfully deleted document',
        deletedDocument: { id: 'getIt', type: 'visa' },
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('verifies travel readiness document', () => {
      return expectSaga(watchDeleteTravelReadinessDocument)
        .provide([
          [call(TravelReadinessDocumentsAPI.deleteTravelReadinessDocument, documentId), response]
        ])
        .put({
          type: types.DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
          deletedDocument: response.data.deletedDocument
        })
        .dispatch({
          type: types.DELETE_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchDeleteTravelReadinessDocument)
        .provide([
          [call(TravelReadinessDocumentsAPI.deleteTravelReadinessDocument, documentId), throwError(error)]
        ])
        .put({
          type: types.DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.DELETE_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });
  });
});
