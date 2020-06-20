import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import CountriesAPI from '../../../services/CountriesAPI';
import {
  watchCreateCountrySagaAsync,
  watchGetCountriesSagaAsync
} from '../countriesSaga';
import { newCountry, createCountryResponse, fetchCountriesResponse, regionId, query, error} from '../../../mockData/countriesMock';


describe('countries saga', () => {
  describe('create countries saga', () => {
    it('Adds countries to regions ', () => {
      const response = createCountryResponse;
      return expectSaga(watchCreateCountrySagaAsync, CountriesAPI)
        .provide([[matchers.call.fn(CountriesAPI.addCountries, regionId, newCountry), response]])
        .put({
          type: 'CREATE_COUNTRY_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'CREATE_COUNTRY',
          regionId,
          newCountry
        })
        .silentRun();
    });
    it('throws error if there is an error adding countries', () => {
      return expectSaga(watchCreateCountrySagaAsync, CountriesAPI)
        .provide([[matchers.call.fn(CountriesAPI.addCountries), throwError(error)]])
        .put({
          type: 'CREATE_COUNTRY_FAILURE',
          error
        })
        .dispatch({
          type: 'CREATE_COUNTRY',
          regionId,
          newCountry
        })
        .silentRun();
    });
  });
  describe('Get countries saga', () => {
    it('fetches countries ', () => {
      const response = fetchCountriesResponse;
      return expectSaga(watchGetCountriesSagaAsync, CountriesAPI)
        .provide([[call(CountriesAPI.getCountries, regionId, query), response]])
        .put({
          type: 'GET_COUNTRIES_SUCCESS',
          countries: response.data.countries,
          meta: response.data.meta
        })
        .dispatch({
          type: 'GET_COUNTRIES',
          regionId,
          query
        })
        .silentRun();
    });
    it('throws error if there is an error fetching countries', () => {
      return expectSaga(watchGetCountriesSagaAsync, CountriesAPI)
        .provide([[call(CountriesAPI.getCountries, regionId, query), throwError(error)]])
        .put({
          type: 'GET_COUNTRIES_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_COUNTRIES',
          regionId,
          query
        })
        .silentRun();
    });
  });
});
