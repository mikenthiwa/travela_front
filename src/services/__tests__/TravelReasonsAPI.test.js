import moxios from 'moxios';
import TravelReasonsAPI from '../TravelReasonsAPI';

describe('TravelReasonsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a request to the API with a query',  async () => {
    const query = '?page=1&search=Bootcamp';
    moxios.stubRequest(`${baseUrl}/request/reasons${query}`, { status: 200});
    const response = await TravelReasonsAPI.getAllTravelReasons(query);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/request/reasons${query}`);
    expect(response.status).toEqual(200);
  });

  it('sends a request to the API to create a travel reason', async () => {
    const body = {
      title: 'title',
      description: 'description'
    };

    moxios.stubRequest(`${baseUrl}/request/reasons`, { status: 201 });

    const response = await TravelReasonsAPI.createTravelReasons(body);
    const request = (moxios.requests.mostRecent());

    expect(request.url).toEqual(`${baseUrl}/request/reasons`);
    expect(response.status).toEqual(201);
  });

  it('sends a request to edit a travel reason', async () => {
    const body = {
      title: 'title',
      description: 'description',
      id: 1
    };

    moxios.stubRequest(`${baseUrl}/request/reasons/${body.id}`, { response: {body}});

    const response = await TravelReasonsAPI.editTravelReason(body.id, body.title, body.description);
    const request = moxios.requests.mostRecent();

    expect(request.url).toEqual(`${baseUrl}/request/reasons/${body.id}`);
    expect(response.data.body).toEqual(body);
  });

  it('sends a request to the API to retrieve a travel reason\'s details', async () => {
    const id = 1;

    moxios.stubRequest(`${baseUrl}/request/reasons/${id}`, { status: 200 });

    const response = await TravelReasonsAPI.viewTravelReasonDetails(id);
    const request = (moxios.requests.mostRecent());

    expect(request.url).toEqual(`${baseUrl}/request/reasons/${id}`);
    expect(response.status).toEqual(200);
  });

  it('should send a DELETE request to delete a trave reason', async () => {
    const reasonId = 3;
    moxios.stubRequest(`${baseUrl}/request/reasons/${reasonId}`, {
      status: 200,
      response: 'Travel reason deleted successfully'
    });

    const response = await TravelReasonsAPI.deleteTravelReason(reasonId);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/request/reasons/${reasonId}`);
    expect(response.data).toEqual('Travel reason deleted successfully');
  });
});
