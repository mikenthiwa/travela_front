import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TripModificationsAPI{

  static submitModificationRequest(requestId, type, reason){
    return axios.post(`${baseUrl}/requests/${requestId}/modifications`, {
      type,
      reason
    });
  }

  static getModificationForRequest(requestId){
    return axios.get(`${baseUrl}/requests/${requestId}/modifications`);
  }


  static getModifications(query){
    return axios.get(`${baseUrl}/tripModifications${query}`);
  }

  static updateModification(modificationId, status) {
    return axios.put(`${baseUrl}/requests/modifications/${modificationId}`, {
      status
    });
  }
}

export default TripModificationsAPI;
