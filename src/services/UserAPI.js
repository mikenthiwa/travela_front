import axios from 'axios';
import Cookie from 'cookies-js';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class UserAPI {
  static postNewUsers(userData) {
    return axios.post(`${baseUrl}/user`, userData);
  }

  static getUserData(id) {
    return axios.get(`${baseUrl}/user/${id}`);
  }

  static getAllUsersEmail() { 
    return axios.get(`${baseUrl}/user?field=email`);
  }
  
  static getUserDataFromStagingApi(email) {
    const token = Cookie.get('jwt-token');
    const usersStagingUrl = process.env.REACT_APP_ALL_USERS;
    return axios.get(
      `${usersStagingUrl}${email}`,
      { headers: { Authorization: `Bearer ${token}` } });
  }

  static getAllDepartment() {
    return axios.get(`${baseUrl}/departments`);
  }
}

export default UserAPI;
