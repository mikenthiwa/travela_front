import React from 'react';
import sinon from 'sinon';
import NewUserRoleForm from '../NewUserRoleForm';
import PersonalDetails from '../FormFieldsets/PersonalDetails';

describe('<NewUserRoleForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    user: {
      UserInfo: {
        name: 'John Doe'
      },
    },
    role: 'travel team member',
    loading: false,
    errors: [],
    addItem: jest.fn(() => {}),
    removeItem: jest.fn(() => {}),
    myTitle: 'Add User' ,
    getRoleData: jest.fn(() => {}),
    handleUpdateRole:  jest.fn(() => {}),
    onChange: jest.fn(),
    values: {
      items: [],
      item: 'lol',
    },
    departments: [{name: 'Technology', id: 2, parentId: null}],
    userDetail: {
      email: 'tomato@andela.com',
      id: 1
    },
    roleName: 'Budget Checker',
    centers: [{location: 'Kigali, Rwanda'}],
    roleId: '33589',
    getAllUsersEmail: jest.fn(),
    closeModal: jest.fn(),
    allMails: [{id:'travela', text:'travela@travela.com'}],
  };

  beforeEach(() => {
    wrapper = mount(<NewUserRoleForm {...props} />);
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('should render a loading indicator while updating a new role', () => {
    wrapper.setProps({ updatingRole: true });
    expect(wrapper.find('i.loading-icon')).toHaveLength(1);
  });


  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(NewUserRoleForm.prototype, 'componentDidMount');
    const wrapper = mount(
      <NewUserRoleForm {...{...props,
        role: 'travel team member',  userDetail: {
          email: 'tomato@andela.com',
          id: 1,
          centers: [{
            location: 'New York, USA'
          }]
        }}} />);
    expect(spy.called).toEqual(true);
    wrapper.unmount();
    sinon.resetHistory();
    sinon.reset();
  });


  it('should add departments button when role is budgetChecker', () => {
    const wrapper = mount(
      <NewUserRoleForm {...{...props, role: 'Budget Checker', roleId: '6000', departments: [] }} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'test@andela.com'}});
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test'}});
    wrapper.find('.add_button').simulate('click');
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test'}});
    wrapper.find('.add_button').simulate('click');
    wrapper.find('input').at(1).simulate('change', { target: { value: 'est' } });
    wrapper.find('.remove_department').simulate('click');
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test'}});
    wrapper.find('.add_button').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(1);
    expect(props.handleUpdateRole).toHaveBeenCalledWith({
      email: 'test@andela.com',
      roleName: 'Budget Checker',
      departments: ['test']
    });
    jest.resetAllMocks();
    wrapper.unmount();
  });


  it('should add center button when role not a budgetChecker', () => {
    const wrapper = mount(
      <NewUserRoleForm {...{...props, role: 'Travel Administrator', roleId: '29187' }} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'test@andela.com'}});
    wrapper.find('input').at(1).simulate('change', { target: { value: 'Lagos'}});
    wrapper.find('.add_button').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(1);
    expect(props.handleUpdateRole).toHaveBeenCalledWith({
      email: 'test@andela.com',
      roleName: 'Travel Administrator',
      center: ['Lagos']
    });
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should add center button when role is not budgetChecker when center is  not provided', () => {
    const wrapper = mount(
      <NewUserRoleForm {...{...props, role: 'Travel Administrator', roleId: '29187' }} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'test@andela.com'}});
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(1);
    expect(props.handleUpdateRole).toHaveBeenCalledWith({
      email: 'test@andela.com',
      roleName: 'Travel Administrator',
    });
    jest.resetAllMocks();
    wrapper.unmount();
  });
  it('should assign all centers to superadmin by default', () => {
    const wrapper = mount(
      <NewUserRoleForm {...{...props, role: 'Super Administrator', roleId: '45678', centers: [{
        id: '1',
        location: 'Kenya'
      },
      {
        id: '2',
        location: 'Nigeria'
      }] }} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'test@andela.com'}});
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(1);
    expect(props.handleUpdateRole).toHaveBeenCalledWith({
      email: 'test@andela.com',
      roleName: 'Super Administrator',
      center: ['Kenya', 'Nigeria']
    });
    jest.resetAllMocks();
    wrapper.unmount();
  });

  describe('<PersonalDetails />', () => {
    const props = {
      myTitle: 'Change Center',
      centers: [{
        id: '1',
        location: 'Kenya'
      },
      {
        id: '2',
        location: 'Nigeria'
      }],
      roleName: 'travel team member',
      values:{
        item: '',
        items: []
      },
      addItem: jest.fn(() => {}),
      hasBlankFields: false,
      removeItem: jest.fn(() => {}),
      departments: [{id:'dept', text:'finance', parentId: null}],
      allMails: [{id:'travela', text:'travela@travela.com'}],
    };

    beforeEach(() => {
      wrapper = shallow(<PersonalDetails {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render all centers when role is super admin', () => {
      const wrapper = shallow(
      <PersonalDetails {...{...props, roleName: 'Super Administrator', myTitle: 'Add User',}} />);
      const centerButtons = wrapper.find('.center-button-group');
      expect(centerButtons).toHaveLength(1);
    });
  });
});
