import React from 'react';
import NewEmailTemplateForm from '../index';

const mockData = {
  name: 'Reminder Template',
  from: 'moses.gitau@andela.com',
  cc: ['gitaumoses4@andela.com'],
  subject: 'This is the subject',
  message: 'This is the message'
};

const props = {
  history: {
    push: jest.fn()
  },
  updateSingleReminderEmailTemplate: jest.fn(),
  errors: {},
  isSaving: false,
  createReminderEmailTemplate: jest.fn(),
  match: {
    params: {}
  },
  editing: false,
  data: {...mockData},
  getAllUsersEmail: jest.fn(),
  getUsersEmail: [],
  newEmailTemplate: {
    errors: {}
  }
};

const event = {
  preventDefault: jest.fn()
};

describe('<NewEmailTemplateForm> component', () =>{
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<NewEmailTemplateForm {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<NewEmailTemplateForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not submit without any values in the form', () => {
    wrapper.find('form').simulate('submit');
    expect(props.createReminderEmailTemplate).toHaveBeenCalledTimes(0);
  });

  it('should submit data if all the fields are fields', () => {
    wrapper.setState({values: mockData, hasBlankFields: false});
    wrapper.find('form').simulate('submit');

    expect(props.createReminderEmailTemplate).toHaveBeenCalledWith(mockData, props.history);
  });

  it('should redirect to the reminder setup page on cancel', () => {
    wrapper.find('button').last().simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/settings/reminder-setup');
  });

  it('should display errors when received from the props', () => {
    const errors = { name: 'The name should be more than 3 characters'};
    wrapper.setProps({ newEmailTemplate: {errors}, errors});
    expect(wrapper.state('errors')).toEqual(errors);
  });

  it('should update single reminder template', () =>{
    const wrapper = shallow(<NewEmailTemplateForm {...props} editing />);
    wrapper.setState({ editing: true, hasBlankFields: false });
    wrapper.find('form').simulate('submit',event );
    expect(props.updateSingleReminderEmailTemplate).toHaveBeenCalled();
  });

  it('should display <Preloader /> component if isFetching is true', () =>{
    const wrapper = shallow(<NewEmailTemplateForm {...props} editing />);
    wrapper.setProps({ updatedEmailTemplate: {isFetching: true} });
    expect(wrapper.find('Preloader').text()).toBe('<Preloader />');
  });

  it('should display Form component if isFetching is fasle', () =>{
    const wrapper = shallow(<NewEmailTemplateForm {...props} editing />);
    wrapper.setProps({ updatedEmailTemplate: {isFetching: false} });
    expect(wrapper.find('EmailTemplateDetails').text()).toBe('<EmailTemplateDetails />');
    expect(wrapper.find('SubmitArea').text()).toBe('<SubmitArea />');
  });
});
