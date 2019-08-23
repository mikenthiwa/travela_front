import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class DynamicCheckListSubmissionAPI {
  static fetchChecklistSubmissions(requestId) {
    return axios.get(`${baseUrl}/dynamic-checklists/${requestId}/submissions`);
  }

  static postChecklistSubmission(requestId, checklist) {
    return axios.post(`${baseUrl}/dynamic-checklists/${requestId}/submissions`, checklist);
  }
}

export default DynamicCheckListSubmissionAPI;
