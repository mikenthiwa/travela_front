import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelReadinessDocumentsAPI {
  static getAllUsersReadiness(query) {
    return axios.get(`${baseUrl}/travelreadiness/users?searchQuery=${query}`);
  }

  static getUserReadiness(userId) {
    return axios.get(`${baseUrl}/travelreadiness/users/${userId}`);
  }

  static getTravelReadinessDocument(documentId) {
    return axios.get(`${baseUrl}/travelreadiness/documents/${documentId}`);
  }

  static verifyTravelReadinessDocument(query) {
    return axios.put(`${baseUrl}/travelreadiness/documents/${query}/verify`);
  }

  static editTravelReadinessDocument(documentType, documentDetails, documentId) {
    return axios.put(
      `${baseUrl}/travelreadiness/documents/${documentId}`,
      {
        [documentType]: documentDetails
      }
    );
  }

  static deleteTravelReadinessDocument(documentId) {
    return axios.delete(`${baseUrl}/travelreadiness/documents/${documentId}`);
  }
}



export default TravelReadinessDocumentsAPI;

