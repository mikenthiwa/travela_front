import {  takeEvery, call, put } from 'redux-saga/effects';
import ErrorBoundaryAPI from '../../services/ErrorBoundaryAPI';
import {REPORT_CRASH} from '../constants/actionTypes';
import {reportCrashFailure, reportCrashSuccess} from '../actionCreator/errorBoundaryActions';


export function* reportCrash(action){
  try{
    const { data } = action;
    const response = yield call(ErrorBoundaryAPI.postCrash, data);
    yield put(reportCrashSuccess(response.data));
  }catch(error){
    yield put(reportCrashFailure(error));
  }
}

export default function* watchCrashReport(){
  yield takeEvery(REPORT_CRASH, reportCrash);
}
