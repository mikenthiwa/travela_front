import readiness from '../readiness';
import {
  FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_FAILURE, FETCH_TRAVEL_READINESS_SUCCESS

} from '../../constants/actionTypes';
import {
  fetchReadinessResponse, passportDetails, passportInfo

} from '../../__mocks__/reduxMocks';
import {
  fetchReadinessFailure,
  fetchReadinessSuccess,
  fetchReadiness,
  exportReadiness,
  exportReadinessFailure,
  exportReadinessSuccess,
  createTravelReadinessDocumentSuccess,
  createTravelReadinessDocument,
  createTravelReadinessDocumentFailure, 

  scanPassportFailure
} from '../../actionCreator/travelReadinessActions';

describe('Test suite for readiness reducer', () => {
  const initialState = {
    readiness: [],
    isLoading: false,
    error: '',
    pagination: {},
  };
  it('should return initial state', () => {
    expect(readiness(undefined, {})).toEqual({
      ...initialState
    });
  });
  it('`should update isLoading state to true for FETCH_TRAVEL_READINESS', (done) => {
    const action = fetchReadiness();
    const newState = readiness(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });
  it('`should update isExporting state to true for EXPORT_TRAVEL_READINESS', (done) => {
    const action = exportReadiness();
    const newState = readiness(initialState, action);
    expect(newState.isExporting).toBe(true);
    done();
  });
  it('should update isExporting state to false for EXPORT_TRAVEL_READINESS_SUCCESS', (done) => {
    const action = exportReadinessSuccess();
    const newState = readiness(initialState, action);
    expect(newState.isExporting).toBe(false);
    done();
  });
  it('should update isExporting state to false for EXPORT_TRAVEL_READINESS_FAILURE', (done) => {
    const action = exportReadinessFailure();
    const newState = readiness(initialState, action);
    expect(newState.isExporting).toBe(false);
    done();
  });


  it('should handle FETCH_READINESS_SUCCESS',
      (done) => {
        const currentState = {
          ...initialState,
          readiness: {
            isLoading: true,
            readiness: {},
            pagination: {}
          }
        };

        const action = fetchReadinessSuccess(fetchReadinessResponse);
        const newState = readiness(currentState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState).toMatchObject(fetchReadinessResponse);
        done();
      });

  it('should handle FETCH_READINESS_FAILURE',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          error: null
        };
        const error = 'Error';
        const action = fetchReadinessFailure(error);
        const newState = readiness(currentState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toEqual(error);
        done();
      });
  it('should handle CREATE_READINESS_DOCUMENT_SUCCESS', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {}
    };

    const response = {'passport': {...passportDetails}};
    const action = createTravelReadinessDocumentSuccess(response);
    const newState = readiness(currentState, action);
    expect(newState.error, {});
    expect(newState.document, response);
    done();
  });

  it('should handle CREATE_READINESS_DOCUMENT', (done) => {
    const currentState = {
      isLoading: true,
      document: {},
      errors: {}
    };

    const response = {'passport': {...passportDetails}};
    const action = createTravelReadinessDocument(response);
    const newState = readiness(currentState, action);
    expect(newState.error, {});
    expect(newState.document, response);
    done();
  });

  it('should handle CREATE_READINESS_DOCUMENT', (done) => {
    const currentState = {
      isLoading: false,
      document: {},
      errors: {}
    };

    const response = {'passport': {...passportDetails}};
    const action = createTravelReadinessDocumentFailure(response);
    const newState = readiness(currentState, action);
    expect(newState.error, {});
    expect(newState.document, response);
    done();
  });
});
