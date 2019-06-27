import moxios from 'moxios';
import HelpResourceAPI from '../HelpResourceAPI';


const baseUrl = 'http://127.0.0.1:5000/api/v1';
const newResource = {
  link: 'New Resource',
  address: 'This is a new resource'
};

const addResourceResponse = {
  data:{
    success: true,
    message: 'Resource created successfully',
    fetchResources: [
      {
        newResource
      }
    ]
  }
};

const fetchdata = {
  data:{
    success: true,
    message: 'Help resources gotten successfully',
    fetchResources: [
      {}
    ]
  }
};

describe('HelpResourceAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should create new resource', async () => {
    moxios.stubRequest(`${baseUrl}/_help`, {
      status: 201,
      response: { ...addResourceResponse }
    });
    const response = await HelpResourceAPI.addResource(newResource);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/_help`);
    expect(request.config.method).toEqual('post');
    expect(response.data).toEqual(addResourceResponse);
  });

  it('should fetch all help resources ', async () => {
    moxios.stubRequest(`${baseUrl}/_help`, {
      status: 200,
      response: { ...fetchdata }
    });
    const response = await HelpResourceAPI.fetchResource();
    const region = moxios.requests.mostRecent();
    expect(region.url).toEqual(`${baseUrl}/_help`);
    expect(region.config.method).toEqual('get');
    expect(response.data).toEqual(fetchdata);
  });
});
