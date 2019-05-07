import axios from 'axios';
import Cookies from 'cookies-js';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AccommodationAPI {
  static postAccommodation(accommodationData) {
    return axios.post(`${baseUrl}/guesthouses`, accommodationData);
  }
  static getAccommodationCentres() {
    return axios.get(`${baseUrl}/guesthouses`);
  }
  static editAccommodation(accommodationData, guestHouseId) {
    return axios.put(`${baseUrl}/guesthouses/${guestHouseId}`, accommodationData);
  }
  static setToken () {
    const token = localStorage.getItem('jwt-token');
    axios.defaults.headers.common['Authorization'] = token;
  }
  static fetchTimelineData(guestHouseId, startDate, endDate) {
    const queryObj = { startDate, endDate };
    const queryString = Object.keys(queryObj)
      .map(key => `${key}=${encodeURIComponent(queryObj[key])}`)
      .join('&');
    return axios.get(`${baseUrl}/guesthouses/${guestHouseId}?${queryString}`);
  }

  static disableOrRestoreAccommodation(guestHouseId) {
    return axios.put(`${baseUrl}/guesthouse/${guestHouseId}`);
  }

  static getDisabledAccommodations() {
    return axios.get(`${baseUrl}/disabledguesthouses`);
  }
}

export default AccommodationAPI;
