import * as types from '../../constants/actionTypes';
import * as actions from '../travelReadinessDocumentsActions';

describe('Travel Readiness Documents actions', () => {
  describe('fetch all users readiness documents', () => {
    it('should return action type FETCH_ALL_USERS_READINESS_DOCUMENTS', () => {
      const expectedAction = {
        type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS,
      };

      const action = actions.fetchAllUsersReadinessDocuments();
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS', () => {
      const mockUsers = [{id: 1}, {id: 2}];
      const expectedAction = {
        type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
        users: mockUsers,
      };

      const action = actions.fetchAllUsersReadinessDocumentsSuccess(mockUsers);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE', () => {
      const error = 'Error fetching users';
      const expectedAction = {
        type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
        error,
      };

      const action = actions.fetchAllUsersReadinessDocumentsFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetch a users readiness documents', () => {
    it('should return action type FETCH_USER_READINESS_DOCUMENTS', () => {
      const expectedAction = {
        type: types.FETCH_USER_READINESS_DOCUMENTS,
        userId: 1,
      };

      const action = actions.fetchUserReadinessDocuments(1);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_READINESS_DOCUMENTS_SUCCESS', () => {
      const mockUserData = {id: 1};
      const expectedAction = {
        type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
        user: mockUserData,
      };

      const action = actions.fetchUserReadinessDocumentsSuccess(mockUserData);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_READINESS_DOCUMENTS_FAILURE', () => {
      const error = 'Error fetching user data';
      const expectedAction = {
        type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
        error,
      };

      const action = actions.fetchUserReadinessDocumentsFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetch a travel readiness document', () => {
    it('should return action type FETCH_TRAVEL_READINESS_DOCUMENT', () => {
      const expectedAction = {
        type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
        documentId: 'sieSicn',
      };

      const action = actions.fetchTravelReadinessDocument('sieSicn');
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
      const mockDocumentData = {id: 'sieSicn'};
      const expectedAction = {
        type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
        document: mockDocumentData,
      };

      const action = actions.fetchTravelReadinessDocumentSuccess(mockDocumentData);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
      const error = 'Error fetching document data';
      const expectedAction = {
        type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
        error,
      };

      const action = actions.fetchTravelReadinessDocumentFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});