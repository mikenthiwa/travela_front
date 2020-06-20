import moxios from 'moxios';
import DynamicCheckListSubmissionAPI from '../DynamicCheckListSubmissionAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('dynamic checklist submissions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetches a checklist', async () => {
    const response = {
      status: 200,
      response: {
        checklist: {
          trips: [],
          checklists: [],
          isSubmitted: false,
        },
      },
    };
    moxios.stubRequest(`${baseUrl}/dynamic-checklists/requestid/submissions`, response);

    const apiResponse = await DynamicCheckListSubmissionAPI.fetchChecklistSubmissions('requestid');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic-checklists/requestid/submissions`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('posts a checklist', async () => {

    const data = {
      checklist: {
        trips: [],
        checklists: [],
        isSubmitted: false,
      }
    };
  
    const response = {
      status: 200,
      response: data
    };
  
    moxios.stubRequest(`${baseUrl}/dynamic-checklists/requestid/submissions`, response);

    const apiResponse = await DynamicCheckListSubmissionAPI.postChecklistSubmission('requestid', data);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic-checklists/requestid/submissions`);
    expect(apiResponse.data).toEqual(response.response);
  });
});  
