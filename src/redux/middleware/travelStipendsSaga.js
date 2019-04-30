import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import {
  CREATE_TRAVEL_STIPEND,
  FETCH_ALL_TRAVEL_STIPENDS,
  DELETE_TRAVEL_STIPEND,
  EDIT_TRAVEL_STIPEND
} from '../constants/actionTypes';
import {
  deleteTravelStipendSuccess,
  createTravelStipendSuccess,
  createTravelStipendFailure,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess,
  deleteTravelStipendFailure,
  updateTravelStipendSuccess,
  updateTravelStipendFailure
} from '../actionCreator/travelStipendsActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import TravelStipendsAPI from '../../services/TravelStipendsAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';

export function* createTravelStipendSagaAsync(action) {
  const { history } = action;
  try {
    const response = yield call(
      TravelStipendsAPI.postTravelStipend, action.requestData
    );
    yield put(createTravelStipendSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/travel-cost/travel-stipends');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createTravelStipendFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateTravelStipendAsync() {
  yield takeLatest(CREATE_TRAVEL_STIPEND, createTravelStipendSagaAsync);
}

export function* getAllTravelStipendsSaga(){
  try{
    const result = yield call(TravelStipendsAPI.getAllTravelStipends);
    yield put(fetchAllTravelStipendsSuccess(result.data));
  }catch(errors){  
    let errorMessage = apiErrorHandler(errors);
    yield put(fetchAllTravelStipendsFailure(errorMessage));
  }
}

export function* watchgetAllTravelStipends(){
  yield takeLatest(FETCH_ALL_TRAVEL_STIPENDS, getAllTravelStipendsSaga);
}

export function* deleteTravelStipendSaga(action) {
  const { stipendId } = action;
  try {
    const response = yield call(TravelStipendsAPI.deleteTravelStipend, stipendId);
    yield put(deleteTravelStipendSuccess(response.data.message, stipendId));
    yield put(closeModal());
    toast.success(response.data.message);


  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteTravelStipendFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteTravelStipend(){
  yield takeLatest(DELETE_TRAVEL_STIPEND, deleteTravelStipendSaga);
}

export function* watchUpdateTravelStipend(){
  yield takeLatest(EDIT_TRAVEL_STIPEND, updateTravelStipendSaga);
}

export function* updateTravelStipendSaga(action){
  const { payload, stipendId, history } = action;
  try {
    const response = yield call(TravelStipendsAPI.updateTravelStipend, stipendId, payload);

    yield put(updateTravelStipendSuccess(response.data));

    toast.success('Travel stipend successfully updated');
    yield put(closeModal());
    history.push('/travel-cost/travel-stipends');
  } catch (error){

    let errors = {};

    if(error.response.status === 422){
      errors = apiValidationErrorHandler(error);
    } else {
      let errorMessage = apiErrorHandler(error);
      toast.error(errorMessage);
    }
    yield put(updateTravelStipendFailure(errors));
  }
}




