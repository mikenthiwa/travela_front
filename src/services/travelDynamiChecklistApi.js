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
  
  static getOneChecklist(requestId) {
    return axios.get(`${baseUrl}/dynamic/checklist/requests/${requestId}`);
  }

  static deleteAChecklist(checklistId) {
    return axios.delete(`${baseUrl}/dynamic/checklist/${checklistId}`);
  }
  
  static deletedChecklists() {
    return axios.get(`${baseUrl}/dynamic/checklist/deleted`);
  }

  static restoreAChecklist(checklistId) {
    return axios.patch(`${baseUrl}/dynamic/checklist/restore/${checklistId}`);
  }

  static restoreAllChecklists() {
    return axios.patch(`${baseUrl}/dynamic/checklist/restore`);
  }

  static getSingleChecklist(checklistId) {
    return axios.get(`${baseUrl}/dynamic/checklist/${checklistId}`);
  }

  static updateChecklist(checklistId, checklist) {
    return axios.patch(`${baseUrl}/dynamic/checklist/${checklistId}`, checklist);
  }
}

export default TravelDynamiChecklistAPI;
