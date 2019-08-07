import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelDynamiChecklistAPI {
  static getAllDynamicChecklists() {
    return axios.get(`${baseUrl}/dynamic/checklist`);
  }
  
  static createDynamicChecklist(checklistItemData) {
    return axios.post(`${baseUrl}/dynamic/checklist`, checklistItemData);
  }
}

export default TravelDynamiChecklistAPI;
