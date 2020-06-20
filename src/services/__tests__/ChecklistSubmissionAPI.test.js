import moxios from 'moxios';
import ChecklistSubmissionAPI from '../checklistSubmissionAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('ChecklistSubmissionAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send `POST` request to submit checklist item', async () => {
    const url = `${baseUrl}/checklists/234/submissions/8`;
    moxios.stubRequest(url, {
      status: 200,
      response: { submission: 'submission' }
    });

    const response = await ChecklistSubmissionAPI
      .postSubmission({ submission: 'submission' }, '234', '8');
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(url);
    expect(request.config.method).toEqual('post');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ submission: 'submission' });
  });

  it('should send `GET` request to submit checklist item', async () => {
    const url = `${baseUrl}/checklists/234/submissions`;
    moxios.stubRequest(url, {
      status: 200,
      response: { submissions: 'submission' }
    });

    const response = await ChecklistSubmissionAPI.getSubmission('234');
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(url);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ submissions: 'submission' });
  });
});
