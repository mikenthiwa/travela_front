import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class TripsAPI {
  static getTrips() {
    return axios.get(`${baseUrl}/trips`);
  }

  static updateTrip(tripId, tripData) {
    return axios.put(`${baseUrl}/trips/${tripId}`, tripData);
  }

  static updateTripRoom(tripId, tripData) {
    return axios.put(`${baseUrl}/trips/${tripId}/room`, tripData);
  }

  static validateTrips(tripData) {
    return axios.post(`${baseUrl}/trips`, tripData);
  }
}

export default TripsAPI;
