import documentTypesReducer from '../documentTypes';
import * as actions from '../../actionCreator/documentTypesActions';

describe('document types reducer', () => {
  const initialState = {
    documentTypes: [],
    isLoading: false,
    deleteLoading: false,
    createLoading: false,
    editLoading: false,
    error: null,
  };

  it('return initial state', () => {
    expect(documentTypesReducer(undefined, { type: 'INVALID_ACTION'})).toEqual(initialState);
  });

  it('fetch document types reducer', () => {
    expect(documentTypesReducer(initialState, actions.fetchDocumentTypes()))
      .toEqual({ ...initialState, isLoading: true });
  });

  it('fetch document types success reducer', () => {
    const documentTypes = [{ name: 'type'}, { name: 'type 2'}];
    expect(documentTypesReducer(initialState, actions.fetchDocumentTypesSuccess(documentTypes)))
      .toEqual({ ...initialState, isLoading: false, documentTypes });
  });

  it('fetch document types failed reducer', () => {
    expect(documentTypesReducer(initialState, actions.fetchDocuemtTypesFailure('error')))
      .toEqual({ ...initialState, isLoading: false, error: 'error' });
  });

  it('edit document type reducer', () => {
    expect(documentTypesReducer(initialState, actions.editDocumentTypes({})))
      .toEqual({ ...initialState, editLoading: true });
  });

  it('edit document type success reducer', () => {
    const editState = {
      ...initialState,
      documentTypes: [{ id: 'id', name: 'type' }, { id: 'id2', name: 'type 0'}]
    };
    const newDocumentType = { id: 'id', name: 'new type' };
    expect(documentTypesReducer(editState, actions.editDocumentTypesSuccess(newDocumentType)))
      .toEqual({ ...initialState, editLoading: false, documentTypes: [newDocumentType, editState.documentTypes[1]] });
  });

  it('edit document type failure reducer', () => {
    expect(documentTypesReducer(initialState, actions.editDocuemtTypesFailure('error')))
      .toEqual({ ...initialState, editLoading: false, error: 'error' });
  });

  it('create document type reducer', () => {
    expect(documentTypesReducer(initialState, actions.createDocumentTypes({})))
      .toEqual({ ...initialState, createLoading: true });
  });

  it('create document type success reducer', () => {
    const newDocumentType = { id: 'id', name: 'new type' };
    expect(documentTypesReducer(initialState, actions.createDocumentTypesSuccess(newDocumentType)))
      .toEqual({ ...initialState, createLoading: false, documentTypes: [newDocumentType] });
  });

  it('create document type failure reducer', () => {
    expect(documentTypesReducer(initialState, actions.createDocuemtTypesFailure('error')))
      .toEqual({ ...initialState, createLoading: false, error: 'error' });
  });

  it('delete document types', () => {
    expect(documentTypesReducer(initialState, actions.deleteDocumentTypes({})))
      .toEqual({ ...initialState, deleteLoading: true });
  });

  it('delete document type success reducer', () => {
    const state = {
      ...initialState,
      documentTypes: [{ id: 'id', name: 'type' }, { id: 'id2', name: 'type 0'}]
    };
    expect(documentTypesReducer(state, actions.deleteDocumentTypesSuccess('type')))
      .toEqual({ ...initialState, deleteLoading: false, documentTypes: [state.documentTypes[1]] });
  });

  it('delete document type failure reducer', () => {
    expect(documentTypesReducer(initialState, actions.deleteDocuemtTypesFailure('error')))
      .toEqual({ ...initialState, deleteLoading: false, error: 'error' });
  });
});
