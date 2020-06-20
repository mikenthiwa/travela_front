import React from 'react';
import { shallow } from 'enzyme';// eslint-disable-line

import NotificationHeader from '../NotificationHeader';

const props = {
  onCloseNotificationPane: jest.fn()
};

let wrapper;

describe('Notification Header Component', () => {
  beforeEach(() => {
    wrapper = shallow(<NotificationHeader {...props} />);
  });

  it('should render successfully', () => {
    expect(wrapper.find('div.notifications-header').length).toBe(1);
  });

  it('should render the title', () => {
    expect(wrapper.find('div.notifications-header__title').text()).toBe('Notifications');
  });

  it('should render the close button', () => {
    expect(wrapper.find('img.notifications-header__close-btn').prop('src')).toBe('close-btn.svg');
  });

  it('should close the notification pane when the close button is clicked', () => {
    // create a world

    // simulate/ take action

    // test the expectation
  });
});
