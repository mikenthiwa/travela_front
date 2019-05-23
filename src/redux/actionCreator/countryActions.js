import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_SUCCESS,
  CREATE_COUNTRY_FAILURE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE
} from '../constants/actionTypes';

export const createCountry = (regionId, countryData) => ({
  type: CREATE_COUNTRY,
  regionId,
  countryData
});

export const createCountrySuccess = response => ({
  type: CREATE_COUNTRY_SUCCESS,
  response
});

export const createCountryFailure = error => ({
  type: CREATE_COUNTRY_FAILURE,
  error
});
export const getCountries = (regionId, query) => ({
  type: GET_COUNTRIES,
  regionId,
  query
});

export const getCountriesSuccess = response => ({
  type: GET_COUNTRIES_SUCCESS,
  countries: response.countries,
  meta: response.meta
});

export const getCountriesFailure = error => ({
  type: GET_COUNTRIES_FAILURE,
  error
});
