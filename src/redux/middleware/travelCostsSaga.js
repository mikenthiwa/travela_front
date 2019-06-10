import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_TRAVEL_COSTS_BY_LOCATION
} from '../constants/actionTypes';
import {
  fetchTravelCostsByLocationSuccess,
  fetchTravelCostsByLocationFailure,
} from '../actionCreator/travelCostsActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import TravelCostsAPI from '../../services/TravelCostsAPI';

export function* getTravelCostsByLocationSaga(locations){
  try{
    const result = yield call(TravelCostsAPI.getTravelCostsByLocation, locations);
    yield put(fetchTravelCostsByLocationSuccess(result.data));
  }catch(errors){
    let errorMessage = apiErrorHandler(errors);
    yield put(fetchTravelCostsByLocationFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchgetTravelCostsByLocation(){
  yield takeLatest(FETCH_TRAVEL_COSTS_BY_LOCATION, getTravelCostsByLocationSaga);
}
