import moxios from 'moxios';
import HomeAPI from '../HomeAPI';
import { fetchTeammatesResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Teammates API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get Teammates', async () => {
    const query = 'TDD';

    moxios.stubRequest(`${baseUrl}/requests/${query}/users`, {
      status: 200,
      response: fetchTeammatesResponse
    });

    const response = await HomeAPI.getTeammates(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/requests/${query}/users`);
    expect(response.data).toEqual(fetchTeammatesResponse);
  });
});
