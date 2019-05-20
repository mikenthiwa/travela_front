import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class RegionsAPI {
  static addRegion(regionData) {
    return axios.post(`${baseUrl}/regions`, regionData);
  }
  static fetchRegions() {
    return axios.get(`${baseUrl}/regions`);
  }
}
export default RegionsAPI;
