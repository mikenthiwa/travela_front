import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import FileSaver from 'file-saver';
import ReadinessAPI from '../../../services/ReadinessAPI';
import {
  watchFetchReadiness, watchExportReadiness, watchCreateTravelReadinessDocument, watchpassportScanSaga,
} from '../travelReadinessSaga';
import {
  fetchReadinessResponse, fetchTravelReadinessResponse, passportDetails, imageLink
} from '../../__mocks__/reduxMocks';
import {
  FETCH_TRAVEL_READINESS,
  FETCH_TRAVEL_READINESS_SUCCESS,
  FETCH_TRAVEL_READINESS_FAILURE,
  EXPORT_TRAVEL_READINESS,
  EXPORT_TRAVEL_READINESS_SUCCESS,
  EXPORT_TRAVEL_READINESS_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT, 
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN, 
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS,
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE
} from '../../constants/actionTypes';

FileSaver.saveAs = jest.fn();
describe('Test suite for Travel Readiness Analytics Saga', () => {
  const query = {
    page: '1',
    limit: '5',
    type: 'json'
  };
  const queryFile = {
    page: '1',
    limit: '5',
    type: 'file'
  };

  it('should return travel readiness analytics if request was succesful', () => {
    const response = {
      data: fetchReadinessResponse
    };
    return expectSaga(watchFetchReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.getTravelReadiness, query), response.data]
      ])
      .put({
        type: FETCH_TRAVEL_READINESS_SUCCESS,
        response: fetchReadinessResponse.data
      })
      .dispatch({
        type: FETCH_TRAVEL_READINESS,
        query
      })
      .silentRun();
  });

  it('should throw an error if get readiness request failed', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: [{message: 'Type must be "json" or "file"'}]
        }
      }
    };
    return expectSaga(watchFetchReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.getTravelReadiness, query), throwError(error)]
      ])
      .put({
        type: FETCH_TRAVEL_READINESS_FAILURE,
        error: 'Type must be "json" or "file"'
      })
      .dispatch({
        type: FETCH_TRAVEL_READINESS,
        query
      })
      .silentRun();
  });
  it('should throw an error if export readiness request failed', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: [{message: 'Type must be "json" or "file"'}]
        }
      }
    };
    return expectSaga(watchExportReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.exportTravelReadiness, query), throwError(error)]
      ])
      .put({
        type: EXPORT_TRAVEL_READINESS_FAILURE,
        error: 'Type must be "json" or "file"'
      })
      .dispatch({
        type: EXPORT_TRAVEL_READINESS,
        query
      })
      .silentRun();
  });

  it('should call FileSaver.saveAs function if the action type is file', () => {
    const response = {
      data: fetchReadinessResponse
    };
    query.type = 'file';
    return expectSaga(watchExportReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.exportTravelReadiness, query), response]
      ])
      .dispatch({
        type: EXPORT_TRAVEL_READINESS,
        query
      })
      .silentRun()
      .then(() => {
        expect(FileSaver.saveAs).toHaveBeenCalled();
      });
  });
});

describe('Travel readiness documents test suite', () => {
  const visa = {'visa': {
    'entryType':'Multiple',
    'country': 'Estoni and Herzegovina',
    'dateOfIssue': '02/01/2018',
    'expiryDate': '06/01/2019',
    'cloudinaryUrl': 'http://n.com'
  }} ;

  const response = {
    'success': true,
    'message': 'document successfully added',
    'addedDocument': {
      'isVerified': false,
      'id': '0GlBp87ee',
      'type': 'visa',
      'data': {
        'country': 'Estoni and Herzegovina',
        'entryType': 'Multiple',
        'expiryDate': '06/01/2020',
        'dateOfIssue': '02/01/2018',
        'cloudinaryUrl': 'http://n.com'
      },
      'userId': '-LTLuRS8MeBH0B3Qg_jC',
      'updatedAt': '2019-01-09T15:52:10.171Z',
      'createdAt': '2019-01-09T15:52:10.171Z',
      'deletedAt': null
    }
  };

  it('should throw an error if create request document failed', () =>{
    const error = {response : {
      status: 409,
      data: {'success': false,
        'message': 'validation error',
        errors: [{
          message: 'n',
        }]
      }}};
    return expectSaga(watchCreateTravelReadinessDocument, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.createDocument, 'visa', visa), throwError(error)]
      ]).put({
        type: CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
        error: error.response.data,
      }).
      dispatch({
        type: CREATE_TRAVEL_READINESS_DOCUMENT,
        payload: visa,
        documentType: 'visa'
      })
      .silentRun();
  });

  it('returns success', () =>{
    return expectSaga(watchCreateTravelReadinessDocument, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.createDocument, 'visa', visa), response]
      ]).dispatch({
        type: CREATE_TRAVEL_READINESS_DOCUMENT,
        payload: visa,
        documentType: 'visa',
      }).silentRun();
  });

  it('gets a response with travel reasons and dispatches PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS', () => {
    return expectSaga(watchpassportScanSaga)
      .provide([[call(ReadinessAPI.pasportImageScan, imageLink), response]])
      .dispatch({
        type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN,
        ...imageLink
      })
      .silentRun();
  });

  it('gets a response with travel reasons and dispatches PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS', () => {
    return expectSaga(watchpassportScanSaga)
      .provide([[call(ReadinessAPI.pasportImageScan, imageLink), response]])
      .dispatch({
        type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS,
        ...imageLink
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = {response : {
      status: 409,
      data: {'success': false,
        'message': 'validation error',
        errors: [{
          message: 'n',
        }]
      }}};
    return expectSaga(watchpassportScanSaga)
      .provide([[call(ReadinessAPI.pasportImageScan, imageLink), throwError(error)]])
      .dispatch({
        type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE,
        ...imageLink,
        history
      })
      .silentRun();
  });

  it('gets a response with travel reason details and dispatches ', () => {
    const passportInfo = {
        "success": true,
        "message": "passport succesfully scanned",
        "passportData": {
            "country": "Portugal",
            "names": "INES         C  C",
            "number": "1700044",
            "birthDay": "04/07/1974",
            "expirationDate": "06/16/2022",
            "dataOfIssue": "06/16/2012",
            "nationality": "Portugees",
            "validScore": 62,
            "sex": "F",
            "surname": "GARCAO DE MAGALHAES",
            "imageLink": "/Users/nesh/Desktop/passport.jpg"
        }
    };
    return expectSaga(watchpassportScanSaga)
      .provide([[call(ReadinessAPI.pasportImageScan, imageLink), passportInfo]])
      .dispatch({
        type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS,
      })
      .silentRun();
  });  
});
