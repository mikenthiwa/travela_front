import requests from '../requests';
import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE
} from '../../constants/actionTypes';
import { fetchRequestsResponse,
  createRequestMock,
  fetchRequestsDetailsResponse
} from '../../__mocks__/mocks';

describe('Requests Reducer', () => {
  describe('Fetch Requests Reducer', () => {
    const initialState = {
      requestData: {
        trips: [],
        comments: []
      },
      requestOnEdit: {},
      comments: []
    };
    const error = 'Error fetching requests, network error';
    it('returns the correct initial state', () => {
      expect(requests(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('returns the correct state for FETCH_USER_REQUESTS action', () => {
      const action = {
        type: FETCH_USER_REQUESTS
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it('returns the correct state for FETCH_USER_REQUESTS_SUCCESS action', () => {
      const action = {
        type: FETCH_USER_REQUESTS_SUCCESS,
        requests: fetchRequestsResponse.requests,
        meta: fetchRequestsResponse.meta,
        message: fetchRequestsResponse.message,
        comments:fetchRequestsResponse.requests
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        requests: fetchRequestsResponse.requests,
        openRequestsCount: fetchRequestsResponse.meta.count.open,
        pastRequestsCount: fetchRequestsResponse.meta.count.past,
        pagination: fetchRequestsResponse.meta.pagination,
        message: fetchRequestsResponse.message,
      });
    });

    it('returns the correct state for FETCH_USER_REQUESTS_FAILURE action', () => {
      const action = {
        type: FETCH_USER_REQUESTS_FAILURE,
        error: 'Possible network error, please reload the page',
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        fetchRequestsError: 'Possible network error, please reload the page',
      });
    });
  });

  describe('Create Requests reducer', () => {
    let initialState = {
      requestData: {}
    };

    let action, newState, receivedState, error;

    const requestObj = { ...createRequestMock.requestObj };

    it('should return initial state', () => {
      expect(requests(initialState, {})).toEqual({
        ...initialState
      });
    });

    it('should handle CREATE_NEW_REQUEST', () => {
      action = {
        type: 'CREATE_NEW_REQUEST',
        requestData: { ...requestObj }
      };

      newState = requests(initialState, action);
      receivedState = {
        ...initialState,
        creatingRequest: true,
      };

      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_NEW_REQUEST_FAILURE', () => {
      error = ['failed to add new request'];
      action = {
        type: 'CREATE_NEW_REQUEST_FAILURE',
        error
      };

      newState = requests(initialState, action);
      receivedState = {
        ...initialState,
        creatingRequest: false,
        errors: ['failed to add new request']
      };
      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_NEW_REQUEST_SUCCESS', () => {
      initialState = {
        requests: [],
        openRequestsCount: 0,
      };
      action = {
        type: 'CREATE_NEW_REQUEST_SUCCESS',
        newRequest: { ...requestObj }
      };

      newState = requests(initialState, action);
      receivedState = {
        creatingRequest: false,
        request: {
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'New York',
          manager: 'Samuel Kubai'
        },
        requests: [{
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'New York',
          manager: 'Samuel Kubai'
        }],
        openRequestsCount: 1,
        errors: []
      };

      expect(newState).toEqual(receivedState);
      expect(requests(newState, action).requests).toHaveLength(2);
    });
  });

  describe('Fetch Requests Details Reducer', () => {
    const initialState = {};
    it('returns the correct state for FETCH_USER_REQUEST_DETAILS', () => {
      const action = {
        type: FETCH_USER_REQUEST_DETAILS
      };
      expect(requests(initialState, action)).toEqual({
        fetchingRequest: true,
      });
    });
    it('returns the correct state for FETCH_USER_REQUEST_DETAILS_SUCCESS action', () => {
      const initialState = {
        requestData: {}
      };
      const action = {
        type: FETCH_USER_REQUEST_DETAILS_SUCCESS,
        requestData: fetchRequestsDetailsResponse.requestData,
        comments: fetchRequestsDetailsResponse.requestData.comments
      };
      expect(requests(initialState, action)).toEqual({
        fetchingRequest: false,
        requestData: fetchRequestsDetailsResponse.requestData,
        comments: fetchRequestsDetailsResponse.requestData.comments
      });
    });
    it('returns the correct state for FETCH_USER_REQUEST_DETAILS_FAILURE action', () => {
      const action = {
        type: FETCH_USER_REQUEST_DETAILS_FAILURE,
        error: 'Possible network error, please reload the page',
      };
      expect(requests(initialState, action)).toEqual({
        fetchingRequest: false,
        errors: 'Possible network error, please reload the page',
      });
    });
  });

  describe('Update Request Details Reducer', () => {
    const initialState = {};
    it('returns the correct state for EDIT_REQUEST', () => {
      const action = {
        type: 'EDIT_REQUEST'
      };
      expect(requests(initialState, action)).toEqual({
        editingRequest: true,
      });
    });
    it('returns the correct state for FETCH_USER_REQUEST_DETAILS_SUCCESS action', () => {
      const initialState = {
        requests: [fetchRequestsDetailsResponse.requestData],
        requestData: {
          trips: []
        },
        requestOnEdit: {}
      };
      const action = {
        type: 'EDIT_REQUEST_SUCCESS',
        updatedRequest: fetchRequestsDetailsResponse.requestData,
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        editingRequest: false,
        requests: [
          fetchRequestsDetailsResponse.requestData,
          fetchRequestsDetailsResponse.requestData,
        ],
        editRequestError: null
      });
    });
    it('returns the correct state for FETCH_EDIT_REQUEST action', () => {
      const initialState = {
        requests: [fetchRequestsDetailsResponse.requestData],
        requestData: {
          trips: [],
          comments: []
        },
        requestOnEdit: {},
        comments: []
      };
      const action = {
        type: 'FETCH_EDIT_REQUEST',
        requestId: 'xDh20cuGx',
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        requestOnEdit: {
          ...fetchRequestsDetailsResponse.requestData,
        },
      });
    });
    it('returns the correct state for EDIT_REQUEST_FAILURE action', () => {
      const action = {
        type: 'EDIT_REQUEST_FAILURE',
        error: 'Possible network error, please reload the page',
      };
      expect(requests(initialState, action)).toEqual({
        editingRequest: false,
        editRequestError: 'Possible network error, please reload the page',
      });
    });
  });
  describe('Comment Reducer', () => {
    let initialState = {
      requestData: {
        trips: []
      },
      comments: [],
      requestOnEdit: {}
    };
    it('returns the correct state for CREATE_COMMENT_SUCCESS action', () => {
      const action = {
        type: 'CREATE_COMMENT_SUCCESS',
        comment: {
          id: 'ls92T30EF',
          comment: 'Now ready'
        },
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        requestData: {
          ...initialState.requestData,
          comments: [
            action.comment.comment,
            ...initialState.comments
          ]
        },
        comments: [
          action.comment.comment,
          ...initialState.comments
        ]
      });
    });
    it('returns the correct state for EDIT_COMMENT_SUCCESS action', () => {
      const action = {
        type: 'EDIT_COMMENT_SUCCESS',
        comment: {
          id: 'ls92T30EF',
          comment: 'No longer ready',
          isEdited: false
        },
      };
      initialState = {
        requestData: {
          trips: []
        },
        comments: [
          {
            id: 'ls92T30EF',
            comment: 'Now ready',
            isEdited: true
          },
        ],
        requestOnEdit: {}
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        requestData: {
          ...initialState.requestData,
          comments: [
            action.comment,
          ]
        },
        comments: [
          action.comment,
        ]
      });
    });
    it('returns the correct state for DELETE_COMMENT_SUCCESS action', () => {
      const action = {
        type: 'DELETE_COMMENT_SUCCESS',
        commentId: 'ls92T30EF',
      };
      initialState = {
        requestData: {
          trips: []
        },
        comments: [
          {
            id: 'ls92T30EF',
            comment: 'Now ready',
            isEdited: true
          },
        ],
        requestOnEdit: {}
      };
      expect(requests(initialState, action)).toEqual({
        ...initialState,
        requestData: {
          ...initialState.requestData,
          comments: []
        },
        comments: []
      });
    });
  });
});
