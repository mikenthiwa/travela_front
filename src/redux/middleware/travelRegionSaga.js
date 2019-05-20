import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import RegionsAPI from '../../services/RegionsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { closeModal } from '../actionCreator/modalActions';
import { 
  addRegion, 
  addRegionSuccess, 
  addRegionFailure, 
  fetchRegions, 
  fetchRegionSuccess, 
  fetchRegionFailure 
} from '../actionCreator/travelRegionActions';

export function* watchAddRegionSagaAsync() {
  yield takeLatest(addRegion().type, addRegionSaga);
}
export function* addRegionSaga(action){
  try {
    const { regionData } = action;
    const response = yield call(RegionsAPI.addRegion, regionData);
    yield put(addRegionSuccess(response.data.TravelRegions));
    toast.success('Region created successfully');
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(addRegionFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchRegionDataSagaAsync() {
  yield takeLatest(fetchRegions().type, fetchRegionsSaga);
}

export function* fetchRegionsSaga() {
  try {
    const response = yield call(RegionsAPI.fetchRegions);
    yield put(fetchRegionSuccess(response.data.fetchRegions));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchRegionFailure(errorMessage));
  }
}
