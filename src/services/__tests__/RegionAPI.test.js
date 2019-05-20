import moxios from 'moxios';
import RegionAPI from '../RegionsAPI';


const baseUrl = 'http://127.0.0.1:5000/api/v1';
const newRegion = {
  region: 'New Region',
  description: 'New Region Created'
};

const addRegionResponse = {
  data:{
    success: true,
    message: 'Region created successfully',
    fetchRegions: [
      {
        newRegion
      }
    ]
  }
};

const fetchdata = {
  data:{
    success: true,
    message: 'Successfully retrieved regions',
    fetchRegions: [
      {}
    ]
  }
};

describe('RegionAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should create new region', async () => {
    moxios.stubRequest(`${baseUrl}/regions`, {
      status: 201,
      response: { ...addRegionResponse }
    });
    const response = await RegionAPI.addRegion(newRegion);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/regions`);
    expect(request.config.method).toEqual('post');
    expect(response.data).toEqual(addRegionResponse);
  });

  it('should fetch all regions ', async () => {
    moxios.stubRequest(`${baseUrl}/regions`, {
      status: 200,
      response: { ...fetchdata }
    });
    const response = await RegionAPI.fetchRegions();
    const region = moxios.requests.mostRecent();
    expect(region.url).toEqual(`${baseUrl}/regions`);
    expect(region.config.method).toEqual('get');
    expect(response.data).toEqual(fetchdata);
  });
});
