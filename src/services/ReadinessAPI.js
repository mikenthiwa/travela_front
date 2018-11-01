import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
const query = {
};

class ReadinessAPI {
  static getTravelReadiness(query) {
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(`${baseUrl}/analytics/readiness?page=${query.page}&limit=${query.limit}&type=${query.type}`,
      {
        responseType,
      });
  }
}
export default ReadinessAPI;