import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import ResourcesApi from '../../services/HelpResourceAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { closeModal } from '../actionCreator/modalActions';
import { 
  addResource, 
  addResourceSuccess, 
  addResourceFailure, 
  fetchResources, 
  fetchResourceSuccess, 
  fetchResourceFailure 
} from '../actionCreator/helpResourceActions';

export function* watchAddResourcesSagaAsync() {
  yield takeLatest(addResource().type, addResourcesSaga);
}
export function* addResourcesSaga(action){
  try {
    const { linkData } = action;
    const response = yield call(ResourcesApi.addResource, linkData);
    //check what is returned from backed and replace it here.
    yield put(addResourceSuccess(response.data.helpResources));
    toast.success('Resource created successfully');
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(addResourceFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchLinkDataSagaAsync() {
  yield takeLatest(fetchResources().type, fetchResourcesSaga);
}

export function* fetchResourcesSaga() {
  try {
    const response = yield call(ResourcesApi.fetchResource);
    yield put(fetchResourceSuccess(response.data.helpResources));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchResourceFailure(errorMessage));
  }
}
