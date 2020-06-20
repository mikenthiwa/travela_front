import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class OccupationAPI {
  static getOccupationData() {
    return axios.get(`${baseUrl}/occupations`);
  }
}
export default OccupationAPI;
