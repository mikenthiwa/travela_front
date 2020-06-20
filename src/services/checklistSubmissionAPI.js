import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class SubmissionAPI {
  static postSubmission(submissionData, requestId, checklistItemId) {
    return axios.post(
      `${baseUrl}/checklists/${requestId}/submissions/${checklistItemId}`,
      submissionData
    );
  }
  static getSubmission(requestId){
    return axios.get(`${baseUrl}/checklists/${requestId}/submissions`);
  }
}
export default SubmissionAPI;
