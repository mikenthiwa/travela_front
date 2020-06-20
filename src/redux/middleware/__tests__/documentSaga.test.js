
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';
import FileSaver from 'file-saver';
import toast from 'toastr';
import DocumentAPI from '../../../services/DocumentAPI';
import { watchFetchDocuments,
  watchUpdateDocument,
  watchDeleteDocument,
  watchCreateDocument,
  watchDownloadDocuments,

} from '../DocumentSaga';
import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT, 
  CREATE_DOCUMENT_SUCCESS, 
  CREATE_DOCUMENT_FAILURE,
  DOWNLOAD_DOCUMENTS,
  DOWNLOAD_DOCUMENTS_FAILURE
} from '../../constants/actionTypes';
import { documentData, response } from '../../__mocks__/documentMockData';

describe('Document saga', () => {
  describe('Fetch document saga', () => {
    const response = {
      data: {
        success: true,
        message:'Successfully fetched your documents',
        documents: [{ document: 'user documents' }]
      }
    };

    const error = {
      response: {
        status: 404,
        data: {
          success: false,
          message: 'No documents found',
        }
      }
    };

    it('fetches user documents successfully', () => {
      return expectSaga(watchFetchDocuments)
        .provide([
          [call(DocumentAPI.fetchDocuments), response]
        ])
        .put({
          type: 'FETCH_DOCUMENTS_SUCCESS',
          documents: [{ document: 'user documents' }]
        })
        .dispatch({
          type: 'FETCH_DOCUMENTS',
        })
        .silentRun();
    });

    it('throws an error while fetchiing documents', () => {
      return expectSaga(watchFetchDocuments)
        .provide([
          [call(DocumentAPI.fetchDocuments), throwError(error)]
        ])
        .put({
          type: 'FETCH_DOCUMENTS_FAILURE',
          error: 'No documents found'
        })
        .dispatch({
          type: 'FETCH_DOCUMENTS',
        })
        .silentRun();
    });
  });

  describe('Delete document', () => {
    const documentId = '23ErGDS6';
    const response = {
      data: {
        deletedDocument: {
          id: '32ejr28e',
          name: 'visa'
        }
      }
    };
    it('deletes a document successfully', () => {
      return expectSaga(watchDeleteDocument)
        .provide([[
          call(DocumentAPI.deleteDocument, documentId),
          response
        ]])
        .put({
          type: 'DELETE_DOCUMENT_SUCCESS',
          documentId,
          deletedDocument: response.data.deletedDocument
        })
        .dispatch({
          type: 'DELETE_DOCUMENT',
          documentId,
          deletingDocument: true
        })
        .silentRun();
    });
    it('handles failed document deletion', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };
      return expectSaga(watchDeleteDocument)
        .provide([[
          call(DocumentAPI.deleteDocument, documentId),
          throwError(error)
        ]])
        .put({
          type: 'DELETE_DOCUMENT_FAILURE',
          error: error.message
        })
        .dispatch({
          type: 'DELETE_DOCUMENT',
          documentId,
          deletingDocument: true
        })
        .silentRun();
    });
  });
  describe('Update document saga', () => {
    toast.success = jest.fn();
    toast.error = jest.fn();
    const newDocumentName = { id: '1', name: 'travel stipends' };
    const response = {
      data: {
        success: true,
        message: 'Document name updated successfully!',
        document: 'user document'
      }
    };

    it('Updates documents name successfully', () => {
      const { id, name } = newDocumentName;
      return expectSaga(watchUpdateDocument)
        .provide([[
          matchers.call.fn(DocumentAPI.updateDocument, id, { name }),
          response
        ]])
        .put({
          type: UPDATE_DOCUMENT_SUCCESS,
          message: response.data.message,
          document: response.data.document
        })
        .dispatch({
          type: UPDATE_DOCUMENT,
          document: newDocumentName
        })
        .silentRun();
    });

    it('throws an error when updating documents fails', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };
      const { id, name } = newDocumentName;
      return expectSaga(watchUpdateDocument)
        .provide([[
          matchers.call.fn(DocumentAPI.updateDocument, id, { name }),
          throwError(error)
        ]])
        .put({
          type: UPDATE_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: UPDATE_DOCUMENT,
          document: newDocumentName
        })
        .silentRun();
    });
  });

  describe('download document saga', () => {
    toast.success = jest.fn();
    toast.error = jest.fn();
    jest.mock('file-saver', ()=>({saveAs: jest.fn()}));
    const { cloudinary_url, name } = documentData;
    const download = {
      url: cloudinary_url,
      name: name
    };

    it('dowloads document successfully', () => {
     
      return expectSaga(watchDownloadDocuments)
        .provide([[call(FileSaver.saveAs, {...download}),
        ]])
        .put({
          type: 'CLOSE_MODAL',
        })
        .dispatch({
          type: DOWNLOAD_DOCUMENTS,
          url: cloudinary_url,
          name: name
        })
        .silentRun();
    });
  });

  describe('Create Documents Saga test', () => {
    it('creates a document successfully', () => {
      return expectSaga(watchCreateDocument, DocumentAPI)
        .provide([[
          call(DocumentAPI.postDocument, documentData), 
          { data: response }
        ]])
        .put({
          type: CREATE_DOCUMENT_SUCCESS,
          documentItem: response
        })
        .dispatch({
          type: CREATE_DOCUMENT,
          documentData
        })
        .silentRun();
    });

    it('handles failed document creation', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: ['Document saga error']
          }
        }
      };
    
      return expectSaga(watchCreateDocument, DocumentAPI)
        .provide([[
          call(DocumentAPI.postDocument, documentData),
          throwError(error)
        ]])
        .put({
          type: CREATE_DOCUMENT_FAILURE,
          error: ''
        })
        .dispatch({
          type: CREATE_DOCUMENT,
          documentData
        })
        .silentRun();
    });
  });
});
