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
  static updateHotelEstimate(estimateId, requestData) {
    return axios.put(`${baseUrl}/hotelEstimate/${estimateId}`, requestData);
  }
  static deleteHotelEstimate(estimateId) {
    return axios.delete(`${baseUrl}/hotelEstimate/${estimateId}`);
  } 
}

export default HotelEstimateAPI;
