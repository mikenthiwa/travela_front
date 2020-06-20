import React from 'react';
import { shallow } from 'enzyme';

import { NotificationPane } from '../NotificationPane';
import notificationMockData from '../__mocks__/notificationMockData-pane';

const props = {
  onCloseNotificationPane: jest.fn(),
  fetchUsersNotification: jest.fn(),
  notifications: [...notificationMockData],
  markSingleNotificationAsRead: jest.fn(),
  updateAllNotificationStatus: jest.fn(),
  singleNotificationRead: 0
};
describe('Notification Pane Component', () => {
  const setup = () => shallow(<NotificationPane {...props} />);

  it('should render successfully', (done) => {
    const wrapper = setup();
    expect(wrapper.find('div.nav-pane').length).toBe(1);
    done();
  });

  it('should return pendingNotifications and generalNotification array',
    (done)=>{
      const wrapper = setup();
      expect(wrapper.instance()
        .getNotifications().pendingNotifications.length).toEqual(2);
      expect(wrapper.instance()
        .getNotifications().generalNotifications.length).toEqual(2);
      done();
    });

  it('should call `getNotifications` on component render', (done) => {
    const wrapper = setup();
    const getNotificationsSpy = jest
      .spyOn(wrapper.instance(), 'getNotifications');
    wrapper.instance().getNotifications();
    expect(getNotificationsSpy).toHaveBeenCalled();
    done();
  });
});
