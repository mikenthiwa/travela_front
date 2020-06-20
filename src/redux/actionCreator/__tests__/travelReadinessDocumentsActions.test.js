import * as types from '../../constants/actionTypes';
import * as actions from '../travelReadinessDocumentsActions';
import documentMock from '../../../mockData/travelReadinesMockData';

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
      const mockData = {
        users: [
          {
            id: 1,
            fullName: 'Andela man',
            userId: 'JFENDGVHVHBVNDK',
            email: 'andela.man@andela.com',
          }, 
          {
            id: 2,
            fullName: 'John Man',
            userId: '_JFENHGFFGGGDVNDK',
            email: 'john.man@andela.com',
          }
        ],
        meta: {
          currentPage: 1,
          pageCount: 1,
        }
      };
      const expectedAction = {
        type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
        users: mockData.users,
        meta: mockData.meta
      };

      const action = actions.fetchAllUsersReadinessDocumentsSuccess(mockData);
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

  describe('verify a travel readiness document', () => {
    it('should return action type VERIFY_TRAVEL_READINESS_DOCUMENT', () => {
      const expectedAction = {
        type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
        documentId: 'docIDD',
      };

      const action = actions.verifyTravelReadinessDocument('docIDD');
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
      const mockDocumentData = { id: 'docIDD' };
      const expectedAction = {
        type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
        document: mockDocumentData,
      };

      const action = actions.verifyTravelReadinessDocumentSuccess(mockDocumentData);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
      const error = 'Error fetching document data';
      const expectedAction = {
        type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
        error,
      };

      const action = actions.verifyTravelReadinessDocumentFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('update a travel readiness document', () => {
    it('should return action type EDIT_TRAVEL_READINESS_DOCUMENT', () => {
      const expectedAction = {
        type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
        documentType: 'passport',
        payload: {...documentMock.passport},
        documentId: 'docIDD'
      };

      const action = actions.editTravelReadinessDocument('passport', documentMock.passport, 'docIDD');
      expect(action).toEqual(expectedAction);
    });

    it('should return action type EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
      const mockDocumentData = { id: 'docIDD' };
      const expectedAction = {
        type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
        document: mockDocumentData,
      };

      const action = actions.editTravelReadinessDocumentSuccess(mockDocumentData);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
      const error = 'Error updating document';
      const expectedAction = {
        type: types.EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
        error,
      };

      const action = actions.editTravelReadinessDocumentFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('DELETE a travel readiness document', () => {
    it('should return action type DELETE_TRAVEL_READINESS_DOCUMENT', () => {
      const expectedAction = {
        type: types.DELETE_TRAVEL_READINESS_DOCUMENT,
        documentId: 'docIDD',
      };

      const action = actions.deleteTravelReadinessDocument('docIDD');
      expect(action).toEqual(expectedAction);
    });

    it('should return action type DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
      const mockDocumentData = { id: 'docIDD' };
      const expectedAction = {
        type: types.DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
        deletedDocument: mockDocumentData,
      };

      const action = actions.deleteTravelReadinessDocumentSuccess(mockDocumentData);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
      const error = 'Error fetching document data';
      const expectedAction = {
        type: types.DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
        error,
      };

      const action = actions.deleteTravelReadinessDocumentFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
