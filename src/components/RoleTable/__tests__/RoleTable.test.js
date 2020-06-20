import React from 'react';
import { shallow } from 'enzyme';
import { RoleTable } from '../index';

const props = {
  roles: [
    {
      id: '1',
      roleName: 'Super Administrator',
      Description: 'Can perform all task on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '2',
      roleName: 'Travel Administrator',
      Description: 'Can view and approve all request on travela',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '3',
      roleName: 'Travel Team Member',
      Description: 'Can view all request made on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '4',
      roleName: 'Requester',
      Description: 'Can make travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '5',
      roleName: 'Manager',
      Description: 'Can request and approve travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    }
  ],
  handleEditRole: jest.fn()
};

const wrapper = shallow(<RoleTable {...props} />);

describe('<RoleTable />', () => {
  it('should render the roles table when there are roles', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(5);
  });

  it('should render a div when there are no roles', () => {
    wrapper.setProps({ roles: [] });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(0);
  });
});
