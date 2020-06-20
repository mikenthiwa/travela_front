import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import toast from 'toastr';
import FileSaver from 'file-saver';
import mockAxios from '../../__mocks__/mockAxios';
import {
  fetchAttachmentsSuccess,
  fetchAttachmentsFailure
} from '../../actionCreator';
import SubmissionAPI from '../../../services/checklistSubmissionAPI';
import {
  watchFetchAttachments,
  watchdownloadAttachments
} from '../attachmentsSaga';
import { DOWNLOAD_ATTACHMENTS } from '../../constants/actionTypes';

const action = {
  type: 'FETCH_ATTACHMENTS',
  query: 'request-id-1'
};

const documentData = {
  url: 'www',
  name: 'Visa.pdf'
};

const response = {
  payload: [
    {
      0: {
        destinationName: 'Lagos, Nigeria',
        checklist: [],
        tripId: 'wiWm8Nu2i8'
      },
      1: {
        destinationName: 'Nairobi, Kenya',
        checklist: [],
        tripId: 'rOHLTQ7HwL'
      },
      2: {
        destinationName: 'New York, United States',
        checklist: [],
        tripId: 'e5rUWSzpkE'
      }
    }
  ]
};

describe('Attachments saga', () => {
  describe('fetch attachments', () => {
    let sagaConstructor, testSaga, axios, SubmissionAPI;

    beforeAll(() => {
      jest.resetModules();
      jest.doMock('axios', () => mockAxios);
      axios = require('axios');
      sagaConstructor = require('../attachmentsSaga').fetchAttachmentsSaga;
      SubmissionAPI = require('../../../services/checklistSubmissionAPI')
        .default;
      testSaga = sagaConstructor(action);
    });

    afterAll(() => {
      jest.clearAllMocks();
      jest.resetModules();
    });

    it('should yield a call to getSubmission with correct request-id', async () => {
      const id = action.query;
      expect(testSaga.next().value).toEqual(
        call(SubmissionAPI.getSubmission, id)
      );
    });

    it('sends a get attachments with the correct request-id', async () => {
      const idQueryParam = action.query;
      const fullUrl = `http://127.0.0.1:5000/api/v1/checklists/${idQueryParam}/submissions`;
      await SubmissionAPI.getSubmission(idQueryParam);
      expect(axios.get).toHaveBeenCalledWith(fullUrl);
    });

    it('should dispatch an action with the yielded data', async () => {
      const fetchResponse = await SubmissionAPI.getSubmission(action.query);
      // expect dispatch with data from response
      expect(testSaga.next(fetchResponse).value).toEqual(
        put(fetchAttachmentsSuccess(fetchResponse.data))
      );
    });

    it('should be done after dispatching the response', () => {
      expect(testSaga.next().done).toBe(true);
    });

    it('should dispatch an error if the response is an error', async () => {
      const badAction = { ...action, url: '456' };
      const testSaga2 = sagaConstructor(badAction);
      testSaga2.next();
      expect(
        testSaga2.throw('Possible network error, please reload the page').value
      ).toEqual(
        put(
          fetchAttachmentsFailure(
            'Possible network error, please reload the page'
          )
        )
      );
    });
  });

  describe('download document saga', () => {
    toast.success = jest.fn();
    toast.error = jest.fn();
    jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
    const { url, name } = documentData;
    const download = {
      url: url,
      name: name
    };

    it('dowloads document successfully', () => {
      return expectSaga(watchdownloadAttachments)
        .provide([[call(FileSaver.saveAs, download.url, download.name)]])
        .dispatch({
          type: DOWNLOAD_ATTACHMENTS,
          url: url,
          name: name
        })
        .silentRun();
    });
  });
});
