import documentMock from '../../../mockData/travelReadinesMockData';
import ImageMock from '../../../mockData/imageLinkMockData';
import {
  fetchReadiness,
  fetchReadinessSuccess,
  fetchReadinessFailure,
  createTravelReadinessDocument,
  createTravelReadinessDocumentSuccess,
  createTravelReadinessDocumentFailure, 
  scanPassport, 
  scanPassportSuccess, 
  scanPassportFailure
} from '../travelReadinessActions';
import { fetchReadinessResponse } from '../../__mocks__/reduxMocks';
import {CREATE_TRAVEL_READINESS_DOCUMENT, PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN } from '../../constants/actionTypes';
import imageLinkMockData from '../../../mockData/imageLinkMockData';

describe('Travel Readiness Action', () => {
  it('should return action type of FETCH_TRAVEL_READINESS and payload', () => {
    const query = {
      page: '1',
      limit: '6',
      type: 'json'
    };
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS',
      query
    };
    const createdAction = fetchReadiness(query);
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type of FETCH_TRAVEL_READINESS_SUCCESS and payload', () => {
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS_SUCCESS',
      response: fetchReadinessResponse.readiness
    };
    const createdAction = fetchReadinessSuccess(fetchReadinessResponse.readiness);
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type of FETCH_TRAVEL_READINESS_FAILURE and payload', () => {
    const error = 'type must be \'json\' or \'file\'';
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS_FAILURE',
      error
    };
    const createdAction = fetchReadinessFailure(error);
    expect(createdAction).toEqual(expectedAction);
  });

  describe('should return action of type create travel readiness document', () =>  {
    const expectedAction = {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT',
      payload: {...documentMock.passport},
      documentType: 'passport'
    };
    const createdAction = createTravelReadinessDocument('passport', documentMock.passport);
    expect(createdAction).toEqual(expectedAction);
  });

  describe('should return action of type create travel readiness document success', () =>  {
    const expectedAction = {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS',
    };
    const createdAction = createTravelReadinessDocumentSuccess();
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type of CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const expectedAction ={
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS',
      response: {}
    };
    expect(createTravelReadinessDocumentSuccess({})).toEqual(expectedAction);
  });

  it('should return action type of CREATE_TRAVEL_READINESS_DOCUMENT', () => {
    expect(createTravelReadinessDocument('visa', {})).toEqual({
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT',
      payload: {},
      documentType: 'visa'
    });
  });

  it('should return action type of CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE with right payload', () => {
    expect(createTravelReadinessDocumentFailure({ errors: {}})).toEqual({
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error: { errors: {}}
    });
  });

  it('should return action type of PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN ', () => {
    const expectedAction = {
      type: 'PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN',
      payload: {...imageLinkMockData.passportInfo},
    };
    const scanningAction = scanPassport(imageLinkMockData.passportInfo);
    expect(scanningAction).toEqual(expectedAction);
  });

  describe('should return action of type passport travel readiness document scan success', () =>  {
    const expectedAction = {
      type: 'PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS',
    };
    const createdAction = scanPassportSuccess();
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type of PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS', () => {
    const expectedAction ={
      type: 'PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS',
      response: {}
    };
    expect(scanPassportSuccess({})).toEqual(expectedAction);
  });

  it('should return action type of PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FAILURE with right payload', () => {
    expect(scanPassportFailure({ errors: {}})).toEqual({
      type: 'PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE',
      error: { errors: {}}
    });
  });

});
