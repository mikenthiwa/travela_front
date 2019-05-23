import moxios from 'moxios';
import CountriesAPI from '../CountriesAPI';
import { newCountry, createCountryResponse, fetchCountriesResponse, regionId, query} from '../../mockData/countriesMock';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('CountriesAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should create new countries', async () => {
    moxios.stubRequest(`${baseUrl}/regions/${regionId}/countries`, {
      status: 201,
      response: { ...createCountryResponse }
    });
    const response = await CountriesAPI.addCountries(regionId, newCountry);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/regions/${regionId}/countries`);
    expect(request.config.method).toEqual('post');
    expect(response.data).toEqual(createCountryResponse);
  });

  it('should fetch all countries ', async () => {
    moxios.stubRequest(`${baseUrl}/regions/${regionId}/countries?searchQuery=${query}`, {
      status: 200,
      response: { ...fetchCountriesResponse }
    });
    const response = await CountriesAPI.getCountries(regionId,query);
    const region = moxios.requests.mostRecent();
    expect(region.url).toEqual(`${baseUrl}/regions/${regionId}/countries?searchQuery=${query}`);
    expect(region.config.method).toEqual('get');
    expect(response.data).toEqual(fetchCountriesResponse);
  });
});
