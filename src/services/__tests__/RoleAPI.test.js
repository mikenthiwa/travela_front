import moxios from 'moxios';
import RoleAPI from '../RoleAPI';
import { roleResponses } from '../__mocks__/serviceMocks';
import expectedResponse from '../__mocks__/mocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';
const id = 'JFENDVNDK';
const newRole = {
  roleName: 'A new role',
  description: 'Some role'
};

const newRoleResponse = {
  message: 'Role created successfully',
  result: newRole
};

const updateRole = {
  roleName: 'Update a new role',
  description: 'This is updated role'
};

const updateRoleResponse = {
  message: 'User role updated successfully.',
  result: updateRole
};

const updateBudgetCheckerResponse = {
  user: {
    email: 'test.user@andela.com',
    fullName: 'test user'
  },
  budgetCheckerDepartments: [{
    name: 'Fellows'
  }]
}

describe('RoleAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get role details ', async () => {
    moxios.stubRequest(`${baseUrl}/user/roles`, {
      status: 200,
      response: { ...roleResponses }
    });
    const response = await RoleAPI.getRoleData(id);
    const role = moxios.requests.mostRecent();
    expect(role.url).toEqual(`${baseUrl}/user/roles`);
    expect(role.config.method).toEqual('get');
    expect(response.data).toEqual(roleResponses);
  });

  it('should send a POST request to updated a users role', async () => {
    const role = {
      email: 'super.mario@andela.com',
      roleName: 'Hero Head'
    };

    moxios.stubRequest(`${baseUrl}/user/role/update`, {
      status: 201,
      response: {
        email: 'super.mario@andela.com',
        roleName: 'Hero Head'
      }
    });

    const response = await RoleAPI.putData(role);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/user/role/update`
    );
    expect(response.data).toEqual({
      email: 'super.mario@andela.com',
      roleName: 'Hero Head'
    });
  });

  it(`should send 'DELETE' request to
  delete user role for specified userId`, async () => {
    moxios.stubRequest(`${baseUrl}/user/roles/2/339458`, {
      status: 200,
      response: { travelTeamMembers: [] }
    });

    const response = await RoleAPI.deleteUserRole(2, 339458);
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/user/roles/2/339458`);
    expect(request.config.method).toEqual('delete');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelTeamMembers: [] });
  });

  describe('Fetch role users', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should send a GET request to get users with a particular role', async () => {
      const roleId = 53908;
      const page = 1;
      const search = '';
      moxios.stubRequest(`${baseUrl}/user/roles/${roleId}?${search}&page=${page}`, {
        status: 200,
        response: { ...expectedResponse }
      });
      const response = await RoleAPI.getRoleUsers(53908, page);
      const request = moxios.requests.mostRecent();
      expect(request.url).toEqual(`${baseUrl}/user/roles/${roleId}?${search}&page=${page}`);
      expect(request.config.method).toEqual('get');
      expect(response.data).toEqual(expectedResponse);
    });
  });

  describe('Add new role', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should send a POST request to add a new role', async () => {
      moxios.stubRequest(`${baseUrl}/user/role`, {
        status: 201,
        response: { ...newRoleResponse }
      });
      const response = await RoleAPI.addRole(newRole);
      const request = moxios.requests.mostRecent();
      expect(request.url).toEqual(`${baseUrl}/user/role`);
      expect(request.config.method).toEqual('post');
      expect(response.data).toEqual(newRoleResponse);
    });
  });

  describe('Update role', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it('should send a PATCH request to update role', async() => {
      const roleId = 1;
      moxios.stubRequest(`${baseUrl}/user/role/${roleId}`, {
        status: 200,
        response: { ...updateRoleResponse }
      });
      const response = await RoleAPI.updateRole(roleId, updateRole);
      const request = moxios.requests.mostRecent();
      expect(request.url).toEqual(`${baseUrl}/user/role/1`);
      expect(request.config.method).toEqual('patch');
      expect(response.data).toEqual(updateRoleResponse);
    });
  });

  describe('Update budget checker', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it('should send a PATCH request to update budget checker', async() => {
      moxios.stubRequest(`${baseUrl}/user/roles/budgetChecker`, {
        status: 200,
        response: { ...updateBudgetCheckerResponse }
      });
      const response = await RoleAPI.updateBudgetChecker();
      const request = moxios.requests.mostRecent();
      expect(request.config.method).toEqual('patch');
      expect(response.data).toEqual(updateBudgetCheckerResponse);
    });
  });
});
