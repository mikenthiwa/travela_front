import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import DocumentTypesAPI from '../../../services/DocumentTypesAPI';
import DocumentTypesSaga from '../DocumentTypesSaga';
import * as actions from '../../actionCreator/documentTypesActions';

const response = {
  data: {
    'success': true,
    'documentTypes': [
      {
        'id': 14,
        'name': 'passport',
        'createdAt': '2019-08-12T00:29:09.381Z',
        'updatedAt': '2019-08-12T00:29:09.381Z'
      },
      {
        'id': 12,
        'name': 'doc 2',
        'createdAt': '2019-08-11T22:57:58.939Z',
        'updatedAt': '2019-08-11T22:57:58.939Z'
      },
      {
        'id': 11,
        'name': 'doc 1',
        'createdAt': '2019-08-11T22:57:52.291Z',
        'updatedAt': '2019-08-12T00:04:39.690Z'
      },
    ]
  },
};

const error = {
  response: {
    status: 404,
    data: {
      success: false,
      message: 'something bad happened',
    }
  }
};

describe('Document types saga', () => {
  it('gets all document types', () => {
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.fetchDocumentTypes), response]])
      .dispatch(actions.fetchDocumentTypes())
      .put(actions.fetchDocumentTypesSuccess(response.data.documentTypes))
      .silentRun();
  });

  it('throws error if there is an error fetching document types', () => {
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.fetchDocumentTypes), throwError(error)]])
      .dispatch(actions.fetchDocumentTypes())
      .put(actions.fetchDocuemtTypesFailure('something bad happened'))
      .silentRun();
  });

  it('edits a document type', () => {
    const editData = {
      data: {
        documentType: {
          id: 'id',
          name: 'name',
        }
      }
    };
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.editDocumentType), editData]])
      .dispatch(actions.editDocumentTypes({ name: 'name', newName: 'newname'}))
      .put(actions.editDocumentTypesSuccess(editData.data.documentType))
      .silentRun();
  });

  it('throws an error when edit fails', () => {
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.editDocumentType), throwError(error)]])
      .dispatch(actions.editDocumentTypes({ name: 'name', newName: 'newname'}))
      .put(actions.editDocuemtTypesFailure('something bad happened'))
      .silentRun();
  });

  it('creates a document type', () => {
    const createData = {
      data: {
        documentType: {
          id: 'id',
          name: 'name',
        }
      }
    };
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.postDocumentType), createData]])
      .dispatch(actions.createDocumentTypes({ name: 'name'}))
      .put(actions.createDocumentTypesSuccess(createData.data.documentType))
      .silentRun();
  });

  it('throws an error when create document type fails', () => {
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.postDocumentType), throwError(error)]])
      .dispatch(actions.createDocumentTypes({ name: 'name' }))
      .put(actions.createDocuemtTypesFailure('something bad happened'))
      .silentRun();
  });

  it('deletes a document type', () => {
    const deleteData = {
      data: {
        message: 'successful'
      }
    };
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.deleteDocumentType), deleteData]])
      .dispatch(actions.deleteDocumentTypes('name'))
      .put(actions.deleteDocumentTypesSuccess('name'))
      .silentRun();
  });

  it('throws an error when delete document type fails', () => {
    return expectSaga(DocumentTypesSaga)
      .provide([[matchers.call.fn(DocumentTypesAPI.deleteDocumentType), throwError(error)]])
      .dispatch(actions.deleteDocumentTypes('name'))
      .put(actions.deleteDocuemtTypesFailure('something bad happened'))
      .silentRun();
  });
});
