import {
  EDIT_DOCUMENT,
  UPDATE_DOCUMENT_ON_EDIT,
  REMOVE_DOCUMENT_FROM_EDIT,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENTS,
  DOWNLOAD_DOCUMENTS_SUCCESS,
  DOWNLOAD_DOCUMENTS_FAILURE, CREATE_TRAVEL_READINESS_DOCUMENT
} from '../../constants/actionTypes';
import {
  fetchDocuments,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  deleteDocumentFailure,
  deleteDocumentSuccess,
  deleteDocument,
  editDocument,
  updateDocumentOnEdit,
  removeDocumentFromEdit,
  updateDocument,
  updateDocumentFailure,
  updateDocumentSuccess,
  downloadDocuments,
  downloadDocumentsSuccess,
  downloadDocumentsFailure
} from '../documentActions';
import documentsMockData from '../../../mockData/documentsMockData';

describe('Documents Actions', () => {
  it('should return action of type FETCH_DOCUMENTS', () => {
    const expectedAction = {
      type: 'FETCH_DOCUMENTS',
    };
    const newAction = fetchDocuments();
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type FETCH_DOCUMENTS_SUCCESS', () => {
    const data = {
      success: true,
      message:'Successfully fetched your documents',
      documents: [{ document: 'user documents' }]
    };
    const expectedAction = {
      type: 'FETCH_DOCUMENTS_SUCCESS',
      documents: [{ document: 'user documents' }]
    };
    const newAction = fetchDocumentsSuccess(data);
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type FETCH_DOCUMENTS_FAILURE', () => {
    const errorMessage = 'No documents found';
    const expectedAction = {
      type: 'FETCH_DOCUMENTS_FAILURE',
      error: 'No documents found'
    };
    const newAction = fetchDocumentsFailure('No documents found');
    expect(newAction).toEqual(expectedAction);
  });
  describe('Download Documents Actions', () => {
    const url = documentsMockData[0].cloudinary_url;
    const name = documentsMockData[0].name;
    it('should return action type DOWNLOAD_DOCUMENTS', (done) => {
      const expectedAction = {
        type: DOWNLOAD_DOCUMENTS,
        url,
        name
      };
      const newAction = downloadDocuments(url, name);

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type DOWNLOAD_DOCUMENTS_FAILURE', (done) => {
      const expectedAction = {
        type: DOWNLOAD_DOCUMENTS_FAILURE,
        error: 'Server Error'
      };
      const newAction = downloadDocumentsFailure('Server Error');

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type DOWNLOAD_DOCUMENTS_SUCCESS', (done) => {
      const response = {
        url,
        name
      };
      const expectedAction = {
        type: DOWNLOAD_DOCUMENTS_SUCCESS,
        response: { ...response }
      };
      const newAction = downloadDocumentsSuccess(response);
      expect(newAction).toMatchObject(expectedAction);
      done();
    });
  });

  describe('Delete document Actions', () => {
    it('should return action of type DELETE_DOCUMENT', () => {
      const expectedAction = {
        type: 'DELETE_DOCUMENT',
        documentId: 'zdy6fs77sq',
        deletingDocument: true,
      };
      const newAction = deleteDocument('zdy6fs77sq');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_DOCUMENT_SUCCESS', () => {
      const expectedAction = {
        type: 'DELETE_DOCUMENT_SUCCESS',
        documentId: 'zdy6fs77sq',
      };
      const newAction = deleteDocumentSuccess('zdy6fs77sq');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_DOCUMENT_FAILURE', () => {
      const expectedAction = {
        type: 'DELETE_DOCUMENT_FAILURE',
        error: 'Document not found'
      };
      const newAction = deleteDocumentFailure('Document not found');
      expect(newAction).toEqual(expectedAction);
    });
  });

  describe('Update documents actions', () => {
    it('should return action type EDIT_DOCUMENT', (done) => {
      const expectedAction = {
        type: EDIT_DOCUMENT,
        document: documentsMockData[0]
      };
      const newAction = editDocument(documentsMockData[0]);

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type UPDATE_DOCUMENT_ON_EDIT', (done) => {
      const expectedAction = {
        type: UPDATE_DOCUMENT_ON_EDIT,
        documentName: 'travel Stipend'
      };
      const newAction = updateDocumentOnEdit('travel Stipend');

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type REMOVE_DOCUMENT_FROM_EDIT', (done) => {
      const expectedAction = { type: REMOVE_DOCUMENT_FROM_EDIT };
      const newAction = removeDocumentFromEdit();

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type UPDATE_DOCUMENT', (done) => {
      const expectedAction = {
        type: UPDATE_DOCUMENT,
        document: documentsMockData[0]
      };
      const newAction = updateDocument(documentsMockData[0]);

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type UPDATE_DOCUMENT_FAILURE', (done) => {
      const expectedAction = {
        type: UPDATE_DOCUMENT_FAILURE,
        error: 'Server Error'
      };
      const newAction = updateDocumentFailure('Server Error');

      expect(newAction).toMatchObject(expectedAction);
      done();
    });

    it('should return action type UPDATE_DOCUMENT_SUCCESS', (done) => {
      const response = {
        success: true,
        message: 'Document updated successfully!',
        document: {...documentsMockData[0], name: 'Travel Stipend'}
      };
      const expectedAction = {
        type: UPDATE_DOCUMENT_SUCCESS,
        message: response.message,
        document: response.document
      };
      const newAction = updateDocumentSuccess(response);

      expect(newAction).toMatchObject(expectedAction);
      done();
    });
  });
});
