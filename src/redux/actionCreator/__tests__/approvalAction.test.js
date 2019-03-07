import { 
  updateRequestStatus, updateRequestStatusSuccess, 
  updateRequestStatusFailure, updateBudgetStatus, 
  updateBudgetStatusSuccess, updateBudgetStatusFailure
} from '..';

describe('Requests Actions', () => {
  describe('Update Request Status', () => {
    it('should return action of type UPDATE_REQUEST_STATUS', () => {
      const statusUpdateData = {
        newStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS',
        statusUpdateData: {
          newStatus: 'Approved'
        }
      };
      const newAction = updateRequestStatus(statusUpdateData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_REQUEST_STATUS_SUCCESS', () => {
      const updatedRequest = {
        newStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS_SUCCESS',
        updatedRequest: {
          newStatus: 'Approved'
        }
      };
      const newAction = updateRequestStatusSuccess(updatedRequest);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_REQUEST_STATUS_FAILURE', () => {
      const error = 'Could not update requests status';

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS_FAILURE',
        error
      };
      const newAction = updateRequestStatusFailure(error);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_BUDGET_STATUS', () => {
      const requestId = 1; // eslint-disable-line
      const budgetStatusData = {
        budgetStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_BUDGET_STATUS',
        requestId : 1,
        budgetStatusData: {budgetStatus: 'Approved'}
        
      };
      const newAction = updateBudgetStatus(requestId, budgetStatusData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_BUDGET_STATUS_SUCCESS', () => {
      const updatedBudgetRequest = {
        id: 1,
        budgetStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_BUDGET_STATUS_SUCCESS',
        updatedBudgetRequest: {
          id: 1,
          budgetStatus: 'Approved'
        }
      };
      const newAction = updateBudgetStatusSuccess(updatedBudgetRequest);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_BUDGET_STATUS_FAILURE', () => {
      const error = 'No approvals exist at the moment';

      const receivedAction = {
        type: 'UPDATE_BUDGET_STATUS_FAILURE',
        error: 'No approvals exist at the moment'
      };
      const newAction = updateBudgetStatusFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});
