import React from 'react';
import { mount } from 'enzyme';
import NotifyEmail from '../NotifyEmail';


const props = {
  behaviour: {
    type: 'NOTIFY_EMAIL',
    payload: {
      recipient: 'john@example.com',
      template: 'template',
    },
  },
};


describe('<NotifyEmail />', () => {
  it('should render correctly', () => {
    const wrapper = mount(<NotifyEmail {...props} />);
    expect(wrapper.find('.notify-email-behaviour.wrapper')).toHaveLength(1);
    expect(wrapper.find('.notify-email-behaviour.text').first().text()).toEqual('john@example.com will be sent a notification');
  });
});
