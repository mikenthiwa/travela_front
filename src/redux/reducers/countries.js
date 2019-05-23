import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_SUCCESS,
  CREATE_COUNTRY_FAILURE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  fetchCountries: {},
  countryErrors: '',
  countries: [],
  meta: {pageCount: 1, currentPage: 1}
};

const country = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_COUNTRY:
    return {
      ...state,
      isAddingCountry: true
    };
  case CREATE_COUNTRY_SUCCESS:
    return {
      ...state,
      isAddingCountry: false,
      countries: [...state.countries, ...action.response.countries]
    };
  case CREATE_COUNTRY_FAILURE:
    return {
      ...state,
      isAddingCountry: false,
      error: action.error
    };
  case GET_COUNTRIES:
    return { ...state, isLoading: true };
  case GET_COUNTRIES_SUCCESS:
    return { ...state, countries: action.countries, meta: action.meta, isLoading: false };
  case GET_COUNTRIES_FAILURE:
    return { ...state, isLoading: false, countryErrors: action.error };
  default:
    return state;
  }
};
export default country;
