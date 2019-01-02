import React from 'react';
import AddRoleForm from '..';

const propsFactory = (overrides) => ({
  addRole: jest.fn(),
  updateRole: jest.fn(),
  addingRole: false,
  roleDetail: {
    description: '',
    roleName: ''
  },
  ...overrides,
});

describe('<AddRoleForm />', () => {
  const addUpdateHelper = ( wrapper, roleName, roleDescription ) => {
    const addForm = wrapper.find('form#add-role-form');
    const roleNameInput = wrapper.find('input#add-role-name');
    const descriptionInput = wrapper.find('textarea#add-role-description');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const roleEvent = {
      target: {
        value: { roleName }
      }
    };

    roleNameInput.simulate('change', roleEvent);

    const descriptionEvent = {
      target: {
        value: { roleDescription }
      }
    };

    descriptionInput.simulate('change', descriptionEvent);
    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state().values).toEqual({
      roleName: { roleName },
      description: { roleDescription }
    });
    expect(handleSubmit).toBeCalled();
  };

  it('renders correctly', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRoleForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the addRole function if all the fields have values', () => {
    const props = propsFactory({  myTitle: 'Add Role' });
    const wrapper = mount(<AddRoleForm {...props} />);
    const roleName = 'New role';
    const roleDescription = 'This is the description of new role created';
    addUpdateHelper(wrapper, roleName, roleDescription);
    expect(props.addRole).toBeCalled();
  });

  it('calls the updateRole function if all the fields have values', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRoleForm {...props} />);
    const roleName = 'Role updated';
    const roleDescription = 'This is the decription of role Updated';
    addUpdateHelper(wrapper, roleName, roleDescription);
    expect(props.updateRole).toBeCalled();
  });

  it('does not call the addRole function if some fields have no values', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRoleForm {...props} />);
    const addForm = wrapper.find('form#add-role-form');
    const roleNameInput = wrapper.find('input#add-role-name');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      target: {
        value: 'a role'
      }
    };

    roleNameInput.simulate('change', event);

    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(handleSubmit).toBeCalled();
    expect(props.addRole.mock.calls.length).toBe(0);
  });

  it('resets the input values to empty when cancel button is clicked', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRoleForm {...props} />);
    const roleNameInput = wrapper.find('input#add-role-name');
    const descriptionInput = wrapper.find('textarea#add-role-description');
    const cancelButton = wrapper.find('button#cancel');
    const handleCancel = jest.spyOn(wrapper.instance(), 'handleCancel');
    const roleEvent = {
      target: {
        value: 'test role'
      }
    };

    roleNameInput.simulate('change', roleEvent);

    const descriptionEvent = {
      target: {
        value: 'test role description'
      }
    };

    descriptionInput.simulate('change', descriptionEvent);
    expect(wrapper.state().values).toEqual({
      roleName: 'test role',
      description: 'test role description'
    });

    cancelButton.simulate('click', {
      preventDefault: jest.fn()
    });
    expect(handleCancel).toBeCalled();
    expect(wrapper.state().values).toEqual({
      roleName: '',
      description: ''
    });
  });

  it('displays status text when role is being added', () => {
    const props = propsFactory({ addingRole : true });
    const wrapper = mount(<AddRoleForm {...props} />);
    const statusText= wrapper.find('h5#add-role-status');
    expect(statusText.text()).toEqual('Adding role...');
  });
});
