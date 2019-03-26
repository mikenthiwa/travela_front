import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CentersAPI {
  static fetchCenters() {
    return axios.get(`${baseUrl}/centers`);
  }
}

export default CentersAPI;
