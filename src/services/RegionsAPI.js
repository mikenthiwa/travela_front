import axios from 'axios';
import {
  resolveBaseUrl
} from '.';

const baseUrl = resolveBaseUrl();

class RegionsAPI {
  static addRegion(regionData) {
    return axios.post(`${baseUrl}/regions`, regionData);
  }
  static fetchRegions() {
    return axios.get(`${baseUrl}/regions`);
  }
  static editRegion(id, region, description) {
    return axios.put(`${baseUrl}/regions/travelregion/${id}`, {
      region,
      description
    });
  }
  static deleteRegion(regionId) {
    return axios.delete(`${baseUrl}/regions/${regionId}`);
  }
}
export default RegionsAPI;
