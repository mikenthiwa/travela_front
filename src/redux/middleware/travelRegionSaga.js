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
  fetchRegionFailure,
  editRegion,
  editRegionSuccess,
  editRegionFailure,
  deleteRegion,
  deleteRegionSuccess,
  deleteRegionFailure, 
} from '../actionCreator/travelRegionActions';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';

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

export function* editRegionSaga(action) {
  const {body} = action;
  try {
    const response = yield call(
      RegionsAPI.editRegion,
      body.id,
      body.region,
      body.description,
    );
    yield put(editRegionSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
  }catch(error){
    let errors;
    if(error.response.status === 409){
      errors = apiValidationErrorHandler(error);
    } else {
      let errorMessage = apiErrorHandler(error);
      toast.error(errorMessage);
    }
    yield put(editRegionFailure(errors));
    toast.error(apiErrorHandler(error));
  }
}

export function* watchEditRegionDataSagaAsync() {
  yield takeLatest(editRegion().type, editRegionSaga);
}

export function* deleteRegionSaga(action) {
  try {
    const {regionId} = action;
    const response = yield call(RegionsAPI.deleteRegion, regionId);
    yield put(deleteRegionSuccess(regionId, response.data.deletedTravelRegion));
    toast.success(response.data.mesage);
    yield put(closeModal());
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteRegionFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteRegionDataSagaAsync() {
  yield takeLatest(deleteRegion().type, deleteRegionSaga);
}
