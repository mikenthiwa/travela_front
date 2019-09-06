import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ApprovalsApi {
  static getUserApprovals(query, budgetChecker) {
    return axios.get(`${baseUrl}/approvals${budgetChecker ? '/budget': ''}${query}`);
  }

  static updateRequestStatus(data) {
    let url = `${baseUrl}/approvals/${data.requestId}`;
    if (data.newStatus === 'Verified') {
      url = `${baseUrl}/requests/${data.requestId}/verify`;
    }
    return axios.put(url, data);

  }
  static updateBudgetStatus(data) {
    const url = `${baseUrl}/approvals/budgetStatus/${data.requestId}`;
    return axios.put(url, {
      ...data,
      ...data.budgetStatus,
    });
  }
}

export default ApprovalsApi;
