import travelReadinessDocuments, { initialState } from '../travelReadinessDocuments';
import {
  createTravelReadinessDocument,
  createTravelReadinessDocumentFailure,
  createTravelReadinessDocumentSuccess,
  scanPassport, scanPassportFailure, scanPassportSuccess
} from '../../actionCreator/travelReadinessActions';
import * as types from '../../constants/actionTypes';
import {passportDetails, passportInfo, passportError} from "../../__mocks__/reduxMocks";
import readiness from "../readiness";

describe('travel readiness reducer', () => {
  it('returns initial state', () => {
    expect(travelReadinessDocuments(initialState, {})).toEqual(initialState);
  });

  it('handles create documents action appropriately', () => {
    const expectedOutput = {
      ...initialState,
      isLoading: true,
      document: { comments: [] },
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT',
      response: {},
    })).toEqual(expectedOutput);
  });

  it('handles CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const expectedOutput = {
      ...initialState,
      isLoading: false,
      document: { message: 'successfully loaded' },
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS',
      response: { message: 'successfully loaded' }
    })).toEqual(expectedOutput);
  });

  it('handles errors appropriately', () => {
    const error = {
      success: false,
      message: 'Validation failed',
      errors: [
        {
          message: 'country should be provided',
          name: 'visa.country',
        },
        {
          message: 'expiry date date must be provided in the form mm/dd/yyyy',
          name: 'visa.expiryDate',
        },
        {
          message: 'expiry date should be greater than date of issue',
          name: 'visa.expiryDate',
        }
      ],
    };

    const expectedOutput = {
      ...initialState,
      document: { comments: [] },
      errors: {
        'country': 'country should be provided',
        'expiryDate': 'expiry date should be greater than date of issue'
      },
      isLoading: false
    };

    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error
    })).toEqual(expectedOutput);

    expect(travelReadinessDocuments({}, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error: {}
    })).toEqual({ 'errors': {}, 'isLoading': false });
  });

  it('should return the initial state', () => {
    expect(travelReadinessDocuments(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
      users: [{ id: 1 }],
      meta: {
        pageCount: 1,
        currentPage: 1,
      }
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { 
      ...initialState,
      isLoading: false,
      users: action.users, 
      meta: action.meta,
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
      error: 'Error fetching users'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS,
      userId: 1,
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
      user: { id: 1 },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, userReadiness: action.user };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS_FAILURE', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
      error: 'Error fetching user readiness'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
      documentId: 'MaLosUn',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'MaLosUn' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: false, document: action.document };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error fetching travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
      documentId: 'JiSe',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, updatingDocument: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'JiSe', type: 'visa' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, document: action.document, updatingDocument: false };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error fetching travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error, document: { comments: [] }, updatingDocument: false};

    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
      documentType: 'visa',
      payload: {
        'visa': {
          'entryType':'Multiple',
          'country': 'Estoni and Herzegovina',
          'dateOfIssue': '02/01/2018',
          'expiryDate': '06/01/2019',
          'cloudinaryUrl': '/usr/desktop/ken.jpg'
        }
      },
      documentId: 'JiSe',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, updatingDocument: true, document: {} };

    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.DELETE_TRAVEL_READINESS_DOCUMENT,
      documentId: 'JiSe',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, deletingDocument: true, document: {}};

    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'JiSe', type: 'visa' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, document: action.document, updatingDocument: false };
    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS II', () => {
    const currentState = {
      ...initialState,
      isLoading: false,
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [
            {
              id: '78687788',
              country: 'USA',
              type:'visa',
            },
            {
              id: '879080',
              country: 'KENYA',
              type:'visa',
            }
          ],
        },
      },
      document: { comments: [] },
      errors: {}
    };
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: {
        id: '78687788',
        type:'visa',
        country: 'USA'
      },
    };

    const newState = travelReadinessDocuments(currentState, action);
    const expectedState = {
      ...initialState,
      isLoading: false,
      document: action.document,
      updatingDocument: false,
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [
            {
              id: '78687788',
              country: 'USA',
              type:'visa',
            },
            {
              id: '879080',
              country: 'KENYA',
              type:'visa',
            }
          ],
        },
      },
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const currentState = {
      ...initialState,
      isLoading: false,
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [
            {
              id: '78687788',
              country: 'USA',
              type:'visa',
            },
            {
              id: '879080',
              country: 'KENYA',
              type:'visa',
            }
          ],
        },
      },
      document: { comments: [] },
      errors: {}
    };
    const action = {
      type: types.DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      deletedDocument: { 
        id: '78687788',
        type:'visa',
        country: 'USA'
      },
    };

    const newState = travelReadinessDocuments(currentState, action);
    const expectedState = {
      ...initialState,
      isLoading: false,
      document: action.deletedDocument,
      deletingDocument: false,
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [
            {
              id: '879080',
              country: 'KENYA',
              type:'visa',
            }
          ],
        },
      },
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      deletedDocument: { id: 'JiSe', type: 'visa' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, document: action.deletedDocument, deletingDocument: false };

    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    expect(travelReadinessDocuments(initialState, {})).toEqual(initialState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error updating travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, error: action.error, document: {}, updatingDocument: false};
    expect(newState).toEqual(expectedState);
  });

  it('should handle DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error fetching travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error, document: {}, deletingDocument: false };

    expect(newState).toEqual(expectedState);
  });

  it('returns the correct state for CREATE_COMMENT_SUCCESS action', () => {
    const action = {
      type: 'CREATE_COMMENT_SUCCESS',
      comment: {
        id: 'ls92T30EF',
        comment: 'Now ready'
      },
    };
    expect(travelReadinessDocuments(initialState, action)).toEqual({
      ...initialState,
      document: {
        ...initialState.document,
        comments: [
          action.comment.comment,
          ...initialState.document.comments
        ],
      },
      comments: [
        action.comment.comment,
        ...initialState.document.comments
      ],
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
    const initialStateCustom = {
      users: [],
      isLoading: false,
      error: '',
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [],
        },
      },
      errors: {},
      document: {
        comments: [
          {
            id: 'ls92T30EF',
            comment: 'Now ready',
            isEdited: true
          },
        ],
      },
      comments: [
        {
          id: 'ls92T30EF',
          comment: 'Now ready',
          isEdited: true
        },
      ],
      fetchingDocument: false,
    };
    expect(travelReadinessDocuments(initialStateCustom, action)).toEqual({
      ...initialStateCustom,
      document: {
        ...initialStateCustom.document,
        comments: [
          ...initialStateCustom.document.comments
        ],
      },
      comments: [
        ...initialStateCustom.document.comments
      ],
    });
  });

  it('returns the correct state for DELETE_COMMENT_SUCCESS action', () => {
    const action = {
      type: 'DELETE_COMMENT_SUCCESS',
      commentId: 'ls92T30EF',
    };
    const initialStateCustom = {
      users: [],
      isLoading: false,
      error: '',
      userReadiness: {
        fullName: '',
        travelDocuments: {
          passport: [],
          visa: [],
        },
      },
      errors: {},
      document: {
        comments: [
          {
            id: 'ls92T30EF',
            comment: 'Now ready',
            isEdited: true
          },
        ],
      },
      comments: [
        {
          id: 'ls92T30EF',
          comment: 'Now ready',
          isEdited: true
        },
      ],
      fetchingDocument: false,
    };
    expect(travelReadinessDocuments(initialStateCustom, action)).toEqual({
      ...initialStateCustom,
      document: {
        ...initialStateCustom.document,
        comments: [],
      },
      comments: [],
    });
  });

  it('should handle PASSPORT_SCAN', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {},
      passportInfo: {},
      showForm: false
    };

    const response = {...passportInfo};
    const action = scanPassport(response);
    const newState = travelReadinessDocuments(currentState, action);
    expect(newState.error, {});
    expect(newState.passportInfo, response);
    done();
  });

  it('should handle PASSPORT_SCAN_SUCCESS', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {},
      passportInfo: {},
      showForm: false
    };

    const response = {...passportInfo};
    const action = scanPassportSuccess(response);
    const newState = travelReadinessDocuments(currentState, action);
    expect(newState.error, {});
    expect(newState.showForm, response);
    done();
  });
  it('should handle PASSPORT_SCAN_FAILURE', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {},
      passportInfo: {},
      showForm: false
    };

    const response = {'passport': {...passportDetails}};
    const action = scanPassportFailure(response);
    const newState = travelReadinessDocuments(currentState, action);
    expect(newState.error, {});
    expect(newState.passportInfo, response);
    done();
  });

  it('should handle PASSPORT_SCAN_FAILURE on message ', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {},
      passportInfo: {},
      showForm: false
    };

    const receivedState = {
      ...currentState,
      scanning: false,
      showForm:false,
      error: 'Please upload a valid passport image and ensure the image is in landscape'
    };
    const response = {'error': {...passportError}};
    const action = scanPassportFailure(response);
    const newState = travelReadinessDocuments(receivedState, action);
    expect(newState.error, 'Please upload a valid passport image and ensure the image is in landscape');
    expect(newState.passportInfo, response);
    done();
  });
});
