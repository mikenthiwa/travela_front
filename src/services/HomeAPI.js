import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

export default class HomeAPI {
  static getTeammates(dept) {
    return axios.get(`${baseUrl}/requests/${dept}/users`);
  }
}
