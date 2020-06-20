import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class DepartmentsAPI {
  static getAllDepartments(query){
    return axios.get(`${baseUrl}/all-departments${query}`);
  }

  static retrieveDepartment(id) {
    return axios.get(`${baseUrl}/department/${id}`);
  }

  static createDepartment(body) {
    return axios.post(`${baseUrl}/department`, body);
  }

  static editDepartment(id, body) {
    return axios.put(`${baseUrl}/department/${id}`, {...body});
  }

  static deleteDepartment(id) {
    return axios.delete(`${baseUrl}/department/${id}`);
  }

}
export default DepartmentsAPI;
