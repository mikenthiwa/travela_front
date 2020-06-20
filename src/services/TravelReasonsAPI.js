import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelReasonsAPI {
  static getAllTravelReasons(query){
    return axios.get(`${baseUrl}/request/reasons${query}`);
  }

  static createTravelReasons(query) {
    return axios.post(`${baseUrl}/request/reasons`, query);
  }

  static editTravelReason(id, title, description) {
    return axios.put(`${baseUrl}/request/reasons/${id}`, {title, description});
  }

  static viewTravelReasonDetails(id) {
    return axios.get(`${baseUrl}/request/reasons/${id}`);
  }

  static deleteTravelReason(reasonId) {
    return axios.delete(`${baseUrl}/request/reasons/${reasonId}`);
  }

}
export default TravelReasonsAPI;
