import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';

import { fetchTeammatesSuccess, fetchTeammatesFailure } from '../actionCreator/homeActions';
import { FETCH_TEAMMATES } from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import HomeAPI from '../../services/HomeAPI';

export function* fetchTeammatesSaga({query}) {
  try {
    const {data} = yield call(HomeAPI.getTeammates, query);
    yield put(fetchTeammatesSuccess(data.teammates));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchTeammatesFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchTeammates() {
  yield takeLatest(FETCH_TEAMMATES, fetchTeammatesSaga);
}
