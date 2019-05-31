import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class HotelEstimateAPI {
  static postHotelEstimate(requestData) {
    return axios.post(`${baseUrl}/hotelEstimate`, requestData);
  }
  static getAllHotelEstimates(url){
    return axios.get(`${baseUrl}/hotelEstimate${url}`);
  }
}

export default HotelEstimateAPI;
