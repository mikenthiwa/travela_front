import {
  fetchUserRequests,
  fetchUserRequestsFailure,
  fetchUserRequestsSuccess,
  createNewRequest,
  createNewRequestSuccess,
  createNewRequestFailure,
  deleteRequest,
  deleteRequestSuccess,
  deleteRequestFailure,
  fetchEditRequest,
  fetchEditRequestSuccess,
  fetchEditRequestFailure
} from '../requestActions';
import { fetchRequestsResponse } from '../../__mocks__/reduxMocks';

describe('Requests Actions', () => {
  describe('Fetch Requests Actions', () => {
    it('should return action type FETCH_USER_REQUESTS', () => {
      const url = '/requests?page=1';
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS',
        url
      };
      const createdAction = fetchUserRequests(url);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_REQUESTS_SUCCESS', () => {
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS_SUCCESS',
        requests: fetchRequestsResponse.requests,
        meta: fetchRequestsResponse.meta,
        message: fetchRequestsResponse.message,
      };
      const createdAction = fetchUserRequestsSuccess(fetchRequestsResponse);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_REQUESTS_ERROR', () => {
      const error = 'Error fetching requests, network error';
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS_FAILURE',
        error
      };
      const createdAction = fetchUserRequestsFailure(error);
      expect(createdAction).toEqual(expectedAction);
    });
  });

  describe('Create Request Actions', () => {
    it('should return action of type CREATE_NEW_REQUEST', () => {
      const requestData = {
        name: 'Ademola Ariya',
        origin: 'Lagos',
        destination: 'Nairobi',
        manager: 'Samuel Kubai',
      };

      const receivedAction = {
        type: 'CREATE_NEW_REQUEST',
        requestData: {
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'Nairobi',
          manager: 'Samuel Kubai',
        },
        closeRequestModal: undefined
      };
      const newAction = createNewRequest(requestData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_NEW_REQUEST_SUCCESS', () => {
      const newRequest = {
        name: 'Ademola Ariya',
        origin: 'Lagos',
        destination: 'Nairobi',
        manager: 'Samuel Kubai',
      };

      const receivedAction = {
        type: 'CREATE_NEW_REQUEST_SUCCESS',
        newRequest: {
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'Nairobi',
          manager: 'Samuel Kubai',
        }
      };
      const newAction = createNewRequestSuccess(newRequest);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_NEW_REQUEST_FAILURE', () => {
      const error = 'Could not create a new request';
      const receivedAction = {
        type: 'CREATE_NEW_REQUEST_FAILURE',
        error: 'Could not create a new request'
      };
      const newAction = createNewRequestFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });

  describe('Delete Request Actions', () => {
    it('should return action of type DELETE_REQUEST', () => {
      const requestId = '34hTHY';

      const receivedAction = {
        type: 'DELETE_REQUEST',
        requestId: '34hTHY'
      };
      const newAction = deleteRequest(requestId);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type DELETE_REQUEST_SUCCESS', () => {
      const message = 'Request 34hTHY was successfully deleted';

      const receivedAction = {
        type: 'DELETE_REQUEST_SUCCESS',
        deleteMessage: 'Request 34hTHY was successfully deleted'
      };
      const newAction = deleteRequestSuccess(message);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type DELETE_REQUEST_FAILURE', () => {
      const error = 'Request is not found';
      const receivedAction = {
        type: 'DELETE_REQUEST_FAILURE',
        error: 'Request is not found'
      };
      const newAction = deleteRequestFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });

  describe('UPDATE REQUEST actions', () => {
    it('should return action of type FETCH_EDIT_REQUEST', () => {
      const requestId = 'yl61obdLF';
      const expectedAction = {
        type: 'FETCH_EDIT_REQUEST',
        requestId
      };
      const createdAction = fetchEditRequest(requestId);

      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action of type FETCH_EDIT_REQUEST_SUCCESS', () => {
      const { requests } = fetchRequestsResponse;
      const response = {
        ...requests[0]
      };
      const expectedAction = {
        type: 'FETCH_EDIT_REQUEST_SUCCESS',
        response
      };
      const createdAction = fetchEditRequestSuccess(response);

      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action of type FETCH_EDIT_REQUEST_FAILURE', () => {
      const errors = 'SOmething went wrong';
      const expectedAction = {
        type: 'FETCH_EDIT_REQUEST_FAILURE',
        errors
      };
      const createdAction = fetchEditRequestFailure(errors);

      expect(createdAction).toEqual(expectedAction);
    });
  });
});
