import {takeLatest, call, put} from 'redux-saga/effects';
import toast from 'toastr';
import {FETCH_ALL_TRAVEL_REASONS} from '../constants/actionTypes';
import {fetchAllTravelReasonsFailure, fetchAllTravelReasonsSuccess} from '../actionCreator/listTravelReasonsActions';
import TravelReasonsAPI from '../../services/TravelReasonsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchAllTravelReasonsSaga(action){
  const { query } = action;
  try {
    const response = yield call(TravelReasonsAPI.getAllTravelReasons, query);
    const { data: {metaData}} = response;
    yield put(fetchAllTravelReasonsSuccess(metaData));
  } catch (error){
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAllTravelReasonsFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchAllTravelReasons() {
  yield takeLatest(FETCH_ALL_TRAVEL_REASONS, fetchAllTravelReasonsSaga);
}
