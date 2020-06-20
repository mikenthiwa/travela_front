import country from '../countries';
import * as actionTypes from '../../constants/actionTypes';
import { newCountry, createCountryResponse, fetchCountriesResponse, regionId} from '../../../mockData/countriesMock'; 

describe('COUNTRIES REDUCER', () => {
  const initialState = {
    isLoading: false,
    fetchCountries: {},
    countryErrors: '',
    countries: [],
    meta: {pageCount: 1, currentPage: 1}
  };
  it('should return proper initial state', done => {
    expect(country(undefined, {})).toEqual(initialState);
    done();
  });
  describe('fetch countries', () => {
    it('dispatches action GET_COUNTRIES', done => {
      const action = {
        type: actionTypes.GET_COUNTRIES
      };
      const newState = country(initialState, action);
      expect(newState.isLoading).toEqual(true);
      done();
    });

    it('dispatches action GET_COUNTRIES_SUCCESS:', done => {
      const action = {
        type: actionTypes.GET_COUNTRIES_SUCCESS,
        countries: fetchCountriesResponse.data.countries,
        meta: fetchCountriesResponse.data.meta
      };
      const newState = country(initialState, action);
      expect(newState.countries).toEqual(fetchCountriesResponse.data.countries);
      done();
    });

    it('dispatches action GET_COUNTRIES_FAILURE', done => {
      const action = {
        type: actionTypes.GET_COUNTRIES_FAILURE,
        error: 'Possible network error, please reload the page'
      };
      const newState = country(initialState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.countryErrors).toEqual(
        'Possible network error, please reload the page'
      );
      done();
    });
  });
  describe('Add countries', () => {
    const initialState = {
      countries: []
    };

    it('returns the correct state for CREATE_COUNTRY action', () => {
      const action = {
        type: actionTypes.CREATE_COUNTRY,
        regionId,
        newCountry
      };
      expect(country(initialState, action)).toEqual({
        isAddingCountry: true,
        countries: []
      });
    });

    it('returns the correct state for CREATE_COUNTRY_SUCCESS action', () => {
      const action = {
        type: actionTypes.CREATE_COUNTRY_SUCCESS,
        response: createCountryResponse.data
      };
      expect(country(initialState, action)).toEqual({
        isAddingCountry: false,
        countries: action.response.countries
      });
    });

    it('returns the correct state for CREATE_COUNTRY_FAILURE action', () => {
      const action = {
        type: actionTypes.CREATE_COUNTRY_FAILURE,
        error: 'An error occurred'
      };
      expect(country(initialState, action)).toEqual({
        isAddingCountry: false,
        error: 'An error occurred',
        countries: []
      });
    });
  });
});
