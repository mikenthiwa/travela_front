import React from 'react';
import { shallow, mount } from 'enzyme';
import { expectSaga } from 'redux-saga-test-plan';
import NotifyEmailBehaviour from '../NotifyEmailBehaviour';
import { openModal } from '../../../../../redux/actionCreator/modalActions';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    state({ modal: {}, });
    return component => component;
  }
}));

const props = {
  behaviour: { type: 'NOTIFY_EMAIL', payload: {} },
  handleBehaviour: jest.fn(),
  closeModal: jest.fn(), 
  openModal: jest.fn(),
  shouldOpen: false,
};

describe('Notify Email Behaviour Test Suite', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NotifyEmailBehaviour {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('handles open modal', () => {
    const wrapper = shallow(<NotifyEmailBehaviour {...props} />);
    wrapper.find('button.create-email-template-button').simulate('click');
    wrapper.instance().handleModal();
    expect(props.openModal).toHaveBeenCalled();
  });

  it('calls handleBehaviour', () => {
    const wrapper = shallow(<NotifyEmailBehaviour {...props} />);
    const event = { target: {name: 'some@email.com' } };
    const event2 = { target: {name: 'some user has no filled checklist' } };
    wrapper.find('.recipient').simulate('blur', event);
    wrapper.find('.template').simulate('blur', event2);
    wrapper.instance().handleChange({
      target: {
        name: 'recipient',
        value: 'some@email.com'
      }
    });
    wrapper.instance().handleChange({
      target: {
        name: 'template',
        value: 'i am going home today to chau'
      }
    });
    wrapper.instance().handleCreateTemplate();
    expect(props.handleBehaviour).toHaveBeenCalled();
  });
});
