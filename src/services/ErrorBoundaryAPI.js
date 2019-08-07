import axios from 'axios';
import {resolveBaseUrl} from './index';

const baseUrl = resolveBaseUrl();

export default class ErrorBoundaryAPI {

  static postCrash(data) {
    return axios.post(`${baseUrl}/errorBoundary`, data);
  }
}
