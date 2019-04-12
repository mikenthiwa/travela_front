import React from 'react';
import { shallow } from 'enzyme';
import { RoleDetailsTable } from '..';

const props = {
  roleUsers: [{
    id: 1,
    budgetCheckerDepartments: [
      {
        id: 1,
        name: 'Tomato'
      },
      {
        id: 2,
        name: 'Egg'
      }
    ],
    fullName: 'A user',
    centers: [
      {
        location: 'Nairobi, Kenya'
      }
    ]
  }],
  roleName: 'Travel team member',
  roleUser: {
    id: 1,
    fullName: 'tomato',
    centers: [
      {
        location: 'Nairobi, Kenya'
      }
    ],
    budgetCheckerDepartments: [
      {
        id: 1,
        name: 'Tomato'
      },
      {
        id: 2,
        name: 'Egg'
      }
    ]
  },
  deleteModalState: 'visible',
  deleteModalRoleId: 1,
  hideDeleteRoleModal: jest.fn(),
  showDeleteRoleModal: jest.fn(),
  handleDeleteUserRole: jest.fn()
};
let wrapper;
describe('<RoleDetailsTable />', () => {
  beforeEach(() => {
    wrapper = shallow (<RoleDetailsTable {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render the correct number of users for a role', () => {
    expect(wrapper.find('.table__row').length).toEqual(1);
  });
  it('renders all the columns for a user', () => {
    expect(wrapper.find('.role-user__name')
      .text()).toEqual('A user');
  });

  it('renders delete confirmation modal when delete button is clicked', () => {
    wrapper.find('#deleteButton').simulate('click');
    wrapper.find('.delete-comment-modal__btn').simulate('click');
    expect(wrapper.find('.delete-comment-modal__text').text())
      .toEqual('This action cannot be undone!');
    expect(props.handleDeleteUserRole).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.delete-comment-modal__btn').length).toEqual(1);
  });

  it('should call `closeDeleteModal`', () => {
    const closeDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'closeDeleteModal');
    wrapper.instance().closeDeleteModal();
    expect(closeDeleteModalSpy).toHaveBeenCalled();
    expect(props.hideDeleteRoleModal).toHaveBeenCalledTimes(1);
  });

  it('renders text when there are no users', () => {
    wrapper = shallow (<RoleDetailsTable
      roleUsers={[]}
      roleName="Travel team member" />);
    expect(wrapper.find('.table__requests--empty')
      .text()).toEqual('No travel team member at the moment');
  });
  it('renders error text when there is an error', () => {
    wrapper = shallow (<RoleDetailsTable error="Network error" />);
    expect(wrapper.find('.table__requests--error')
      .text()).toEqual('Network error');
  });

  it('does not render edit button for a role that is not budget checker', () => {
    wrapper = shallow (<RoleDetailsTable {...props} />);
    expect(wrapper.find('#editButton').length).toEqual(0);
  });

  it('renders edit button for budget checker role', () => {
    wrapper = shallow (<RoleDetailsTable {...{...props, roleName: 'Budget Checker', }} />);
    expect(wrapper.find('#editButton').length).toEqual(1);
  });
});
