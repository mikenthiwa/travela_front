import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AvailableRoomsAPI {
  static getAvailableRooms(data) {
    const { gender, departureDate, location, arrivalDate, tripType } = data.action;
    const availableRoomsQueryObj = {
      gender,
      departureDate,
      location,
      arrivalDate
    };
    const availableRoomQueryString = Object.keys(availableRoomsQueryObj)
      .map(key => `${key}=${encodeURIComponent(availableRoomsQueryObj[key])}`)
      .join('&');
    return axios.get(`${baseUrl}/availablerooms?${availableRoomQueryString}`);
  }
}

export default AvailableRoomsAPI;
