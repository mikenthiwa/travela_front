import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelDynamiChecklistAPI {
  static createDynamicChecklist(checklistItemData) {
    return axios.post(`${baseUrl}/dynamic/checklist`, checklistItemData);
  }

  static getAllDynamicChecklists() {
    return axios.get(`${baseUrl}/dynamic/checklist`);
  }
}

export default TravelDynamiChecklistAPI;
