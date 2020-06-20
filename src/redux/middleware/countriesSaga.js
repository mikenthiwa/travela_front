import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import CountriesAPI from '../../services/CountriesAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { closeModal } from '../actionCreator/modalActions';
import {
  createCountry,
  createCountrySuccess,
  createCountryFailure,
  getCountries,
  getCountriesSuccess,
  getCountriesFailure
} from '../actionCreator/countryActions';

export function* watchCreateCountrySagaAsync() {
  yield takeLatest(createCountry().type, createCountrySagaAsync);
}

export function* createCountrySagaAsync(action) {
  try{
    const response = yield call(CountriesAPI.addCountries, action.regionId, action.countryData);
    yield put(createCountrySuccess(response.data));
    yield put(closeModal());
    toast.success('Countries added successfully');
  }catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createCountryFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchGetCountriesSagaAsync() {
  yield takeLatest(getCountries().type, getCountriesSaga);
}

export function* getCountriesSaga(action) {
  try {
    const response = yield call(CountriesAPI.getCountries, action.regionId, action.query);
    yield put(getCountriesSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getCountriesFailure(errorMessage));
  }
}
