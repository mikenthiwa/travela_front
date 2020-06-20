import {
  fetchAttachments,
  fetchAttachmentsSuccess,
  fetchAttachmentsFailure,
  downloadAttachments,
  downloadAttachmentsSuccess,
  downloadAttachmentsFailure,
} from '../attachmentActions';

describe('Attachments action creators', () => {
  describe('Fetch attachments actions', () => {
    it('should return action of type FETCH_ATTACHMENTS', () => {
      const query = 'request-id-1';
      const receivedAction = {
        type: 'FETCH_ATTACHMENTS',
        query
      };
      const newAction = fetchAttachments(query);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type FETCH_ATTACHMENTS_SUCCESS', () =>{
      const payload = { submissions:  [{
        0: { destinationName: 'Lagos, Nigeria', checklist: [], tripId: 'wiWm8Nu2i8' },
        1: { destinationName: 'Nairobi, Kenya', checklist: [], tripId: 'rOHLTQ7HwL' },
        2: { destinationName: 'New York, United States', checklist: [], tripId: 'e5rUWSzpkE' }
      }]};
      const receivedAction = {
        type: 'FETCH_ATTACHMENTS_SUCCESS',
        payload: payload.submissions
      };
      const newAction = fetchAttachmentsSuccess(payload);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type FETCH_ATTACHMENTS_FAILURE', () => {
      const error = 'Possible network error';
      const receivedAction = {
        type: 'FETCH_ATTACHMENTS_FAILURE',
        error
      };
      const newAction = fetchAttachmentsFailure(error);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type DOWNLOAD_ATTACHMENTS', () => {
      const url = 'www.com';
      const name = 'Visa.png';
      const receivedAction = {
        type: 'DOWNLOAD_ATTACHMENTS',
        url,
        name
      };
      const newAction = downloadAttachments(url, name);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type DOWNLOAD_ATTACHMENTS_SUCCESS', () => {
      const response = 'Download in progress ...';
      const receivedAction = {
        type: 'DOWNLOAD_ATTACHMENTS_SUCCESS',
        response
      };
      const newAction = downloadAttachmentsSuccess(response);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type DOWNLOAD_ATTACHMENTS_FAILURE', () => {
      const error = 'Possible network error, please reload the page';
      const receivedAction = {
        type: 'DOWNLOAD_ATTACHMENTS_FAILURE',
        error
      };
      const newAction = downloadAttachmentsFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});
