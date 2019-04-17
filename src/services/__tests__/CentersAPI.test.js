import moxios from 'moxios';
import CentersAPI from '../CentersAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const centersResponse = {
  centers: [{
    id: 1,
    location: 'Lagos, Nigeria'
  },
  {
    id: 2,
    location: 'Nairobi, Kenya'
  }]
};

const updateUserCenterResponse = {
  success: true,
  message: 'Centres updated successfully',
  add: [
    [
      {
        'userId': 1,
        'roleId': 60000,
        'createdAt': '2019-04-17T08:10:03.279Z',
        'updatedAt': '2019-04-17T08:10:03.279Z'
      }
    ]
  ]
};
describe('CentersAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a get request to center api to retrieve centers records', async () => {
    moxios.stubRequest(`${baseUrl}/centers`, {
      status: 200,
      response: centersResponse
    });
    const response = await CentersAPI.fetchCenters();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/centers`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(centersResponse);
  });

  it('should send a get request to center api to update the user center', async () => {
    moxios.stubRequest(`${baseUrl}/center/user`, {
      status: 200,
      response: updateUserCenterResponse
    });
    const response = await CentersAPI.updateUserCenters({
      email: 'tomato@andela.com',
      roleName: 'Travel Team Member',
      center: ['Lagos', 'New York']
    });
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/center/user`);
    expect(request.config.method).toEqual('patch');
    expect(response.data).toEqual(updateUserCenterResponse);
  });
});
