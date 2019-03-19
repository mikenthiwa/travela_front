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
    removeDepartment: jest.fn(() => {}),
    addDepartment: jest.fn(() => {}),
    myTitle: 'Add User' ,
    getRoleData: jest.fn(() => {}),
    handleUpdateRole:  jest.fn(() => {}),
    onChange: jest.fn(),
    values: {
      departments: [],
      department: 'lol',
    },
    userDetail: {
      email: 'tomato@andela.com',
      id: 1,
      centers: [{
        location: 'New York, USA'
      }]
    },
    roleName: 'Budget Checker',
    centers: [{location: 'Kigali, Rwanda'}],
    roleId: '33589',
    getAllUsersEmail: jest.fn(),
    allMails: [{id:'travela', text:'travela@travela.com'}],
  };

  beforeEach(() => {
    wrapper = mount(<NewUserRoleForm {...props} />);
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
  });


  it('should add department button when role is budgetChecker', () => {
    const wrapper = mount(
      <NewUserRoleForm {...{...props, role: 'Budget Checker', roleId: '6000' }} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'test@andela.com'}});
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test'}});
    wrapper.find('.add_button').simulate('click');
    wrapper.find('.remove').simulate('click');
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
    spy.mockClear();
  });

  describe('<PersonalDetails />', () => {
    const props = {
      myTitle: 'Change Center',
      centers: [{
        location: []
      }],
      roleName: 'travel team member',
      validate: true,
      getAllUsersEmail: jest.fn(),
      allMails: [{id:'travela', text:'travela@travela.com'}],
    };

    beforeEach(() => {
      wrapper = shallow(<PersonalDetails {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

  });

});
