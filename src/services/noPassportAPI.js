import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class NoPassportAPI {
  static postNoPassport() {
    return axios.post(`${baseUrl}/no-passport`);
  }
}

export default NoPassportAPI;
