import documentsReducer from '../documents';
import {
  editDocument,
  updateDocumentOnEdit,
  removeDocumentFromEdit,
  updateDocument,
  updateDocumentFailure,
  updateDocumentSuccess,
  createDocument,
  createDocumentSuccessfully,
  createDocumentFailure
} from '../../actionCreator/documentActions';
import documentsMockData from '../../../mockData/documentsMockData';
import { documentData, response } from '../../__mocks__/documentMockData';

describe('Documents Reducer', () => {
  let action, newState, expectedState, error, mockComments;
  let initialState = {
    isLoading: false,
    document: '',
    updatingDocument: false,
    documents: [],
    documentOnEdit: null,
    error: '',
    documentItem: {},
    isUploading: false
  };
  describe('Fetch documents Reducer', () => {
    it('should return initial state', () => {
      expect(documentsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_DOCUMENTS', () => {
      action = {
        type: 'FETCH_DOCUMENTS',
      };

      newState = documentsReducer(initialState, action);
      expectedState = {
        isLoading: true,
        documentOnEdit: null,
        updatingDocument: false,
        document: '',
        documents: [],
        error: '',
        documentItem: {},
        isUploading: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle FETCH_DOCUMENTS_SUCCESS', () => {
      action = {
        type: 'FETCH_DOCUMENTS_SUCCESS',
        documents: ['user documents']
      };

      newState = documentsReducer(initialState, action);
      expectedState = {
        isLoading: false,
        documentOnEdit: null,
        updatingDocument: false,
        document: '',
        documents: ['user documents'],
        error: '',
        documentItem: {},
        isUploading: false
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle FETCH_DOCUMENTS_FAILURE', () => {
      error = 'failed to fetch documents';
      action = {
        type: 'FETCH_DOCUMENTS_FAILURE',
        error
      };

      newState = documentsReducer(initialState, action);
      expectedState = {
        isLoading: false,
        updatingDocument: false,
        document: '',
        documents: [],
        error: 'failed to fetch documents'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
  describe('Delete documents Reducer', () => {
    const currentState = {
      ...initialState,
      documents: [
        {
          id: '12ewr45s',
          name: 'visa'
        }
      ]
    };
    it('should return initial state', () => {
      expect(documentsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle DELETE_DOCUMENT', () => {
      action = {
        type: 'DELETE_DOCUMENT',
        deletingDocument: true,
        documentId: '12ewr45s',
      };

      newState = documentsReducer(currentState, action);
      expectedState = {
        isLoading: false,
        updatingDocument: false,
        deletingDocument: true,
        documentOnEdit: null,
        document: '',
        documents: [
          {
            id: '12ewr45s',
            name: 'visa'
          }
        ],
        error: '',
        documentItem: {},
        isUploading: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_DOCUMENT_SUCCESS', () => {
      action = {
        type: 'DELETE_DOCUMENT_SUCCESS',
        documentId: '12ewr45s',
        deletedDocument: {
          id: '12ewr45s',
          name: 'visa'
        }
      };

      newState = documentsReducer(currentState, action);
      expectedState = {
        isLoading: false,
        updatingDocument: false,
        documentOnEdit: null,
        deletingDocument: false,
        document: '',
        documents: [],
        error: '',
        documentItem: {},
        isUploading: false
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_DOCUMENT_FAILURE', () => {
      error = 'Document not found';
      action = {
        type: 'DELETE_DOCUMENT_FAILURE',
        error
      };

      newState = documentsReducer(initialState, action);
      expectedState = {
        isLoading: false,
        document: '',
        documents: [],
        error: 'Document not found'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });

  describe('Update Document', () => {
    it('should return default state for unknown action type', (done) => {
      const newState= documentsReducer(initialState, { type: 'UNKNOWN' });
      expect(newState).toMatchObject(initialState);
      done();
    });

    it('should set document for edit', (done) => {
      const action = editDocument(documentsMockData[0]);
      const newState = documentsReducer(initialState, action);

      expect(newState.documentOnEdit).toMatchObject(documentsMockData[0]);
      done();
    });

    it('should update document on edit', (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0],
        message: 'document updated successfully!',
        updatingDocument: true
      };
      const action = updateDocumentOnEdit('Travel Stipend');
      const newState = documentsReducer(currentState, action);

      expect(newState.documentOnEdit.name).toEqual('Travel Stipend');
      done();
    });

    it('should remove document from edit', (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0],
      };
      const action = removeDocumentFromEdit();
      const newState = documentsReducer(currentState, action);

      expect(newState.documentOnEdit).toBe(null);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('');
      expect(newState.message).toEqual('');
      done();
    });

    it(`should update 'updatingDocument' state to true
    while sending a 'update' document server request`,
    (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0]
      };
      const action = updateDocument({ id: '1', name: 'Travel Stipend' });
      const newState = documentsReducer(currentState, action);

      expect(newState.updatingDocument).toBe(true);
      done();
    });

    it('should update document on success', (done) => {
      const currentState = {
        ...initialState,
        documents: documentsMockData,
        documentOnEdit: documentsMockData[0]
      };
      const response = {
        data: {
          success: true,
          message: 'Document updated successfully!',
          document: {...documentsMockData[0], name: 'Travel Stipend'}
        }};
      const action = updateDocumentSuccess(response.data);
      const newState = documentsReducer(currentState, action);

      expect(newState.documents[0].name).toEqual('Travel Stipend');
      expect(newState.documentOnEdit).toBe(null);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('');
      expect(newState.message).toEqual(response.data.message);
      done();
    });

    it('should update error state on update failure', (done) => {
      const currentState = {
        ...initialState,
        documents: documentsMockData,
        documentOnEdit: documentsMockData[0]
      };
      const error = 'Server Error';
      const action = updateDocumentFailure(error);
      const newState = documentsReducer(currentState, action);

      expect(newState.documentOnEdit).toMatchObject(documentsMockData[0]);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('Server Error');
      expect(newState.message).toEqual('');
      done();
    });
  });

  describe('Create Documents Reducer', () => {

    it('should update \'isUploading\' state to true when creating document', (done) => {
      const action = createDocument(documentData);
      const newState = documentsReducer(initialState, action);
      expect(newState.isUploading).toBe(true);
      done();
    });

    it('should add document to state on successful creation', (done) => {
      const currentState = {
        ...initialState,
        isUploading: true,
        documentItem: response
      };
      const action = createDocumentSuccessfully(response);
      const newState = documentsReducer(currentState, action);
      expect(newState.isUploading).toBe(false);
      expect(newState.documentItem).toMatchObject(response);
      done();
    });

    it('should add error to state on unsuccessful document creation', () => {
      const currentState = {
        ...initialState,
        isUploading: true,
        documentItem: response
      };
      const error = 'Server Error';
      const action = createDocumentFailure(error);
      const newState = documentsReducer(currentState, action);

      expect(newState).toEqual({
        ...initialState,
        isUploading: false,
        documentItem: {},
        error: 'Server Error'
      });
    });
  });
});

