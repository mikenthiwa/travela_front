import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReadinessAPI {
  static getTravelReadiness(query) {
    return axios.get(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${
        query.limit
      }&type=${query.type}&travelFlow=${query.travelFlow}&dateFrom=${
        query.range.start
      }&dateTo=${query.range.end}&center=${query.center}`
    );
  }

  static exportTravelReadiness(query) {
    return axios.get(
      `${baseUrl}/analytics/readiness?type=${query.type}&travelFlow=${
        query.travelFlow
      }&dateFrom=${query.range.start}&dateTo=${query.range.end}`,
      { responseType: 'blob' }
    );
  }

  static createDocument(documentType, documentDetails) {
    return axios.post(`${baseUrl}/travelreadiness`, {
      [documentType]: documentDetails
    });
  }

  static pasportImageScan(image){
    return axios.post(`${baseUrl}/travelreadiness/documents/scan`, {imageLink: image});
  }
}

export default ReadinessAPI;
