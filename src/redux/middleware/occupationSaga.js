import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_OCCUPATIONS } from '../constants/actionTypes';
import {
  fetchOccupationsSuccess, fetchOccupationsFailure } from '../actionCreator/occupationActions';
import OccupationAPI from '../../services/OccupationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

// get occupations from API and dispatch action to get this data to store through reducer
export function* fetchOccupationsSaga(){
  try{
    const service = OccupationAPI.getOccupationData;
    const response = yield call(service);
    yield put(fetchOccupationsSuccess(response.data.occupations));
  }catch(error){
    let errorMessage = apiErrorHandler(error);
    yield put(fetchOccupationsFailure(errorMessage));
  }
}

export function* watchFetchOccupations(){
  yield takeLatest(FETCH_OCCUPATIONS, fetchOccupationsSaga);
}
