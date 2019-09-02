import moxios from 'moxios';
import DepartmentsAPI from '../DepartmentsAPI';

describe('TravelReasonsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a request to the API with a query',  async () => {
    const query = '?page=1';
    moxios.stubRequest(`${baseUrl}/all-departments${query}`, { status: 200});
    const response = await DepartmentsAPI.getAllDepartments(query);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/all-departments${query}`);
    expect(response.status).toEqual(200);
  });

  it('sends a request to the API to create a department', async () => {
    const body = {
      name: 'Operations',
      parentDepartment: null
    };

    moxios.stubRequest(`${baseUrl}/department`, { status: 201 });

    const response = await DepartmentsAPI.createDepartment(body);
    const request = (moxios.requests.mostRecent());

    expect(request.url).toEqual(`${baseUrl}/department`);
    expect(response.status).toEqual(201);
  });

  it('sends a request to edit a department', async () => {
    const body = {
      name: 'Operations',
      parentDepartment: null,
      id: 1
    };


    moxios.stubRequest(`${baseUrl}/department/${body.id}`, { response: {body}});

    const response = await DepartmentsAPI.editDepartment(body.id, body);
    const request = moxios.requests.mostRecent();

    expect(request.url).toEqual(`${baseUrl}/department/${body.id}`);
    expect(response.data.body).toEqual(body);
  });

  it('sends a request to the API to retrieve a department\'s details', async () => {
    const id = 1;

    moxios.stubRequest(`${baseUrl}/department/${id}`, { status: 200 });

    const response = await DepartmentsAPI.retrieveDepartment(id);
    const request = (moxios.requests.mostRecent());

    expect(request.url).toEqual(`${baseUrl}/department/${id}`);
    expect(response.status).toEqual(200);
  });

  it('should send a DELETE request to delete a department', async () => {
    const id = 1;
    moxios.stubRequest(`${baseUrl}/department/${id}`, {
      status: 200,
      response: 'Travel reason deleted successfully'
    });

    const response = await DepartmentsAPI.deleteDepartment(id);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/department/${id}`);
    expect(response.status).toEqual(200);
  });
});
