import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelReasonsAPI {
  static getAllTravelReasons(query){
    return axios.get(`${baseUrl}/request/reasons${query}`);
  }
}

export default TravelReasonsAPI;
