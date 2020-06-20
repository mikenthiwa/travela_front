import { call } from 'redux-saga/effects';
import * as  matchers from 'redux-saga-test-plan/matchers';
import moxios from 'moxios';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import MaintainaceApi from '../../../services/MaintainaceApi';
import { ADD_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD_SUCCESS,
  UPDATE_MAINTENANCE_RECORD_FAILURE,
  DELETE_MAINTENANCE_RECORD_SUCCESS,
  DELETE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD_FAILURE
} from '../../constants/actionTypes';
import maintenanceAction from '../../actionCreator/maintenanceAction';
import {watchAddMainteinanceAsync, watchUpdateMaintenance, watchDeleteMaintenance} from '../maintenanceSaga';


describe('Maintainence record saga', () => {
  const action ={
    data: {
      'reason':'a nigga died',
      'start': '2018-10-28',
      'end': '2018-10-16',
    },
    roomId:'yjhk54yew',
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    moxios.stubRequest(`${baseUrl}/room/${roomId}/maintainance`, {
      status: 201,
      response:
      {
        'success': true,
        'message': 'Room maintainance record created',
        'maintainance': {
          'id': 30,
          'reason': 'a nigga died',
          'start': '2018-10-28',
          'end': '2018-10-16',
          'roomId': 'yjhk54yew',
          'updatedAt': '2018-10-17T15:46:01.851Z',
          'createdAt': '2018-10-17T15:46:01.851Z'
        }
      }
    });
  });

  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  const roomId = 'yjhk54yew';

  it('Adds maintainence record to the database', () => {

    return expectSaga(watchAddMainteinanceAsync, MaintainaceApi)
      .provide([[call(MaintainaceApi.addMaintainanceRecord, action.roomId), action.data]])
      .dispatch({
        type: 'ADD_MAINTENANCE_RECORD',
        response: action.data,
        roomId: action.roomId,
      })
      .silentRun();
  });

  it('Updates maintenance record successfully', () => {
    return expectSaga(watchUpdateMaintenance, MaintainaceApi)
      .provide([[call(MaintainaceApi.updateMaintenanceRecord, action.roomId), action.data]])
      .put({
        type: UPDATE_MAINTENANCE_RECORD_SUCCESS,
        maintenance: action.data
      })
      .dispatch({
        type: UPDATE_MAINTENANCE_RECORD,
        maintenance: action.data,
        roomId: action.roomId
      })
      .silentRun();
  });

  it('Throws error on update maintenance failure', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchUpdateMaintenance)
      .provide([[
        matchers.call.fn(MaintainaceApi.updateMaintenanceRecord, action.roomId), throwError(error)
      ]])
      .put({
        type: UPDATE_MAINTENANCE_RECORD_FAILURE,
        error
      })
      .dispatch({
        type: UPDATE_MAINTENANCE_RECORD,
        maintenance: action.data,
        roomId: action.roomId
      })
      .silentRun();
  });

  it('Delete maintenance record successfully', () => {
    const response = {
      data: {
        message: ''
      }
    };
    return expectSaga(watchDeleteMaintenance, MaintainaceApi)
      .provide([[call(MaintainaceApi.deleteMaintenanceRecord, action.roomId), response]])
      .put({
        type: DELETE_MAINTENANCE_RECORD_SUCCESS,
        roomId: action.roomId
      })
      .dispatch({
        type: DELETE_MAINTENANCE_RECORD,
        roomId: action.roomId
      })
      .silentRun();
  });

  it('Throws error on delelte maintenance failure', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchDeleteMaintenance)
      .provide([[
        matchers.call.fn(MaintainaceApi.deleteMaintenanceRecord, action.roomId), throwError(error)
      ]])
      .put({
        type: DELETE_MAINTENANCE_RECORD_FAILURE,
        error
      })
      .dispatch({
        type: DELETE_MAINTENANCE_RECORD,
        roomId: action.roomId
      })
      .silentRun();
  });
});
