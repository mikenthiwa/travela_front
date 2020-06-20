import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class FlightEstimateAPI {
  static postFlightEstimate(requestData) {
    return axios.post(`${baseUrl}/flightEstimate`, requestData);
  }
  static getAllFlightEstimates = () =>
    axios.get( `${baseUrl}/flightEstimate`);
  
  static updateFlightEstimate = (estimateId, payload) => {
    return axios.put( `${baseUrl}/flightEstimate/${estimateId}`, payload);
  }
  static deleteFlightEstimate = (estimateId) => {
    return axios.delete( `${baseUrl}/flightEstimate/${estimateId}`);
  }
}

export default FlightEstimateAPI;
