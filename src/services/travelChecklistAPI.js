import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelChecklistAPI {
  static getAllChecklists(requestId, destinationName) {
    let url;
    if  (requestId) {
      url = `${baseUrl}/checklists?requestId=${requestId}`;
    } else if (destinationName) {
      url = `${baseUrl}/checklists?destinationName=${destinationName}`;
    } else {
      url = `${baseUrl}/checklists`;
    }
    return axios.get(url);
  }

  static createChecklist(checklistItemData) {
    return axios.post(`${baseUrl}/checklists`, checklistItemData);
  }

  static updateChecklistItem(checklistItemId, checklistItemData) {
    return axios.put(`${baseUrl}/checklists/${checklistItemId}`, checklistItemData);
  }

  static deleteChecklistItem({checklistItemId, deleteReason}) {
    return axios.delete(`${baseUrl}/checklists/${checklistItemId}`, {
      data: deleteReason
    });
  }

  static getDeletedCheckListItems(destinationName) {
    const url = `${baseUrl}/checklists/deleted?destinationName=${destinationName}`;
    return axios.get(url);
  }

}

export default TravelChecklistAPI;
