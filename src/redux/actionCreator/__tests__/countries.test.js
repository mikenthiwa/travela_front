import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_SUCCESS,
  CREATE_COUNTRY_FAILURE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE
} from '../../constants/actionTypes';
import {
  createCountry,
  createCountrySuccess,
  createCountryFailure,
  getCountries,
  getCountriesSuccess,
  getCountriesFailure
} from '../countryActions';
import { newCountry, regionId, createCountryResponse, query, fetchCountriesResponse } from '../../../mockData/countriesMock'; 
 
 describe('Countries Actions', () => {
  it('should return action type CREATE_COUNTRY', () => {
    const expectedAction = {
      type: CREATE_COUNTRY,
      regionId,
      countryData: newCountry
    };
    const createdAction = createCountry(regionId, newCountry);
    expect(createdAction).toEqual(expectedAction);
  });

   it('should return action type CREATE_COUNTRY_SUCCESS', () => {
    const expectedAction = {
      type: CREATE_COUNTRY_SUCCESS,
      response: createCountryResponse.data
    };
    const createdAction = createCountrySuccess(createCountryResponse.data);
    expect(createdAction).toEqual(expectedAction);
  });

   it('should return action type CREATE_COUNTRY_FAILURE', () => {
    const expectedAction = {
      type: CREATE_COUNTRY_FAILURE,
      error: 'Server Error'
    };
    const createdAction = createCountryFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type GET_COUNTRIES', () => {
    const expectedAction = {
      type: GET_COUNTRIES,
      regionId,
      query
    };
    const createdAction = getCountries(regionId, query);
    expect(createdAction).toEqual(expectedAction);
  });

   it('should return action type GET_COUNTRIES_SUCCESS', () => {
    const expectedAction = {
      type: GET_COUNTRIES_SUCCESS,
      countries: fetchCountriesResponse.data.countries,
      meta: fetchCountriesResponse.data.meta
    };
    const createdAction = getCountriesSuccess(fetchCountriesResponse.data);
    expect(createdAction).toEqual(expectedAction);
  });

   it('should return action type GET_COUNTRIES_FAILURE', () => {
    const expectedAction = {
      type: GET_COUNTRIES_FAILURE,
      error: 'Server Error'
    };
    const createdAction = getCountriesFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
});
