import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class DocumentTypesAPI {
  static fetchDocumentTypes() {
    return axios.get(`${baseUrl}/documents/types`);
  }

  static editDocumentType(type) {
    return axios.patch(`${baseUrl}/documents/types`, type);
  }

  static postDocumentType(typeData) {
    return axios.post(`${baseUrl}/documents/types`, typeData);
  }

  static deleteDocumentType(name) {
    return axios.delete(`${baseUrl}/documents/types/delete/${name}`);
  }
}

export default DocumentTypesAPI;
