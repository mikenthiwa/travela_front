import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CentersAPI {
  static fetchCenters() {
    return axios.get(`${baseUrl}/centers`);
  }

  static updateUserCenters(data) {
    return axios.patch(`${baseUrl}/center/user`, data);
  }
}

export default CentersAPI;
