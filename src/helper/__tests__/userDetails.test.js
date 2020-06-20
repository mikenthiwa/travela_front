import { getUserRoleCenter } from '../userDetails';

describe('getUserRoleCentes Tests', () => {
  it('should return user center', async done => {
    const userDetail = {
      id: 4,
      fullName: 'Sylvia Mbugua',
      centers: [{ location: 'Kenya' }]
    };
    const response = await getUserRoleCenter(userDetail, 'Nigeria');
    expect(response).toEqual('Kenya');
    done();
  });
});
