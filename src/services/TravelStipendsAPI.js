import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelStipendsAPI {
  
  static postTravelStipend(requestData) {
    return axios.post(`${baseUrl}/travelStipend`, requestData);
  }
  static getAllTravelStipends = () =>
    axios.get(`${baseUrl}/travelStipend`);

  static deleteTravelStipend = (stipendId) => {
    return axios.delete(`${baseUrl}/travelStipend/${stipendId}`);
  }
  static updateTravelStipend = (stipendId, payload) => {
    return axios.put(`${baseUrl}/travelStipend/${stipendId}`, payload);
  }
  static async getTravelStipendsByLocation({locations}){
    const test = await axios.get(`${baseUrl}/travelStipends/location`, { params: {
      locations
    }});
    return test;
  }
}

export default TravelStipendsAPI;

