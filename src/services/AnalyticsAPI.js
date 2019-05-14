import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

export default class AnalyticsAPI {
  static getAnalytics(query) {
    return axios.get(`${baseUrl}/analytics${query}`);
  }

  static exportAnalytics(query) {
    return axios.get(`${baseUrl}/analytics${query}`, { responseType: 'blob' });
  }

  static getDepartmentTrips(query) {
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(
      `${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&center=${query.center}&type=${query.type}&firstDate=${query.firstDate}&lastDate=${query.lastDate}`,
      {
        responseType,
      }
    );
  }
}
