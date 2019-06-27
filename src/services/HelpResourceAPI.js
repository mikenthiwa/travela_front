import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class HelpResourceApi {
  static addResource(linkData) {
    return axios.post(`${baseUrl}/_help`, linkData);
  }
  static fetchResource() {
    return axios.get(`${baseUrl}/_help`);
  }
}
export default HelpResourceApi;
