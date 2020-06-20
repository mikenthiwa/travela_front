import checkUserPermission from '../index';
import {MANAGER, REQUESTER, SUPER_ADMINISTRATOR, TRAVEL_TEAM_MEMBER} from '../../roles';

const history = {
  push: jest.fn(),
};
describe('checkUserPermissions', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect if the user does not have permissions', () => {
    const result = checkUserPermission(history,[SUPER_ADMINISTRATOR], [REQUESTER, MANAGER]);
    expect(result).toBe(false);
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should return true if the user has permissions', () => {
    const result = checkUserPermission(history,[REQUESTER, SUPER_ADMINISTRATOR, MANAGER], [TRAVEL_TEAM_MEMBER,SUPER_ADMINISTRATOR]);
    expect(result).toBe(true);
    expect(history.push).toHaveBeenCalledTimes(0);
  });
});
