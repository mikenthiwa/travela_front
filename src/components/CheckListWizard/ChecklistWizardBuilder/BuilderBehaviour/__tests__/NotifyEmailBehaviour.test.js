import React from 'react';
import { shallow, mount } from 'enzyme';
import NotifyEmailBehaviour from '../NotifyEmailBehaviour';

const props = {
  behaviour: { type: 'NOTIFY_EMAIL', payload: {} },
  handleBehaviour: jest.fn(),
};

describe('Notify Email Behaviour Test Suite', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NotifyEmailBehaviour {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('handles open modal', () => {
    const wrapper = shallow(<NotifyEmailBehaviour {...props} />);
    expect(wrapper.state('shouldOpen')).toBe(false);
    wrapper.find('button.create-email-template-button').simulate('click');
    expect(wrapper.state('shouldOpen')).toBe(true);
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
