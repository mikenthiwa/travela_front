import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CountriesAPI {
  static addCountries(regionId, countriesData) {
    return axios.post(`${baseUrl}/regions/${regionId}/countries`, countriesData);
  }

  static getCountries(regionId, query) {
    return axios.get(`${baseUrl}/regions/${regionId}/countries?searchQuery=${query}`);
  }
}
export default CountriesAPI;
