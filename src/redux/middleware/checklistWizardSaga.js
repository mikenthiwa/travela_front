import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ALL_DYNAMIC_CHECKLISTS } from '../constants/actionTypes';
import { getAllDynamicChecklistsSuccess, getAllDynamicChecklistsFailure } from '../actionCreator/checklistWizardActions';
import travelDynamicChecklistApi from '../../services/travelDynamiChecklistApi';
import apiErrorHandler from '../../services/apiErrorHandler';


export function* watchgetAllDynamicChecklists() {
  yield takeLatest(GET_ALL_DYNAMIC_CHECKLISTS, getAllDynamicChecklistsSaga);
}
export function* getAllDynamicChecklistsSaga() {
  try {
    const { data } = yield call(travelDynamicChecklistApi.getAllDynamicChecklists);
    yield put(getAllDynamicChecklistsSuccess(data.checklists));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAllDynamicChecklistsFailure(errorMessage));
  }
}
