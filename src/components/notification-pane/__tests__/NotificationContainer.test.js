import React from 'react';
import { shallow } from 'enzyme';
import NotificationContainer from '../NotificationContainer';
import testImage from '../../../images/logo.svg';

describe('Notification Container Component', () => {
  const customProps = {
    title: 'Pending Approvals',
    pendingNotifications: [{
      isPending: true,
      general: false,
      name: 'Captain America',
      notificationType: 'pending',
      notificationStatus: 'unread',
      senderImage: testImage,
      id: 1,
      notificationLink: '/requests/my-approvals/id1',
      updatedAt: new Date().toISOString()
    },
    {
      isPending: true,
      general: false,
      name: 'The Wasp',
      notificationStatus: 'unread',
      notificationType: 'pending',
      senderImage: testImage,
      id: 2,
      notificationLink: '/requests/my-approvals/id2',
      updatedAt: new Date().toISOString()
    },
    {
      isPending: true,
      general: false,
      name: 'Thor Ragnarok',
      notificationStatus: 'unread',
      notificationType: 'pending',
      senderImage: testImage,
      id: 3,
      notificationLink: '/requests/my-approvals/id3',
      updatedAt: new Date().toISOString()
    },
    ],
    generalNotifications: [{
      isPending: false,
      general: true,
      name: 'Ademola Ariya',
      message: 'posted a comment',
      notificationStatus: 'unread',
      notificationType: 'general',
      senderImage: testImage,
      id: 11,
      notificationLink: '/requests/my-approvals/EwUNJYzNg',
      updatedAt: new Date().toISOString()
    }],
    updateAllNotificationStatus: jest.fn(),
    markSingleNotificationAsRead: jest.fn(),
    timeStamp: '',
    id: 12,
    singleNotificationRead: 3
  };

  const getDerivedStateFromPropsSpy =
        jest.spyOn(NotificationContainer, 'getDerivedStateFromProps');
  const setup = (props = customProps) => shallow( <NotificationContainer {...props} />);

  it('should render Pending Approvals successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  it('should render General Notifications successfully', () => {
    const newProps = { ...customProps,
      title: 'General Notifications'
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('NotificationItem').length).toBe(1);
  });

  it('should call `getDerivedStateFromprops` when the component renders',
    (done) => {
      const wrapper = setup();
      getDerivedStateFromPropsSpy.mockReset();
      const nextProps = {
        ...customProps,
        title: 'Pending Approvals',
        pendingNotifications: [ {
          isPending: true,
          general: false,
          name: 'Test pending',
          notificationStatus: 'read',
          notificationType: 'pending',
          senderImage: testImage,
          id: 2,
          notificationLink: '/requests/my-approvals/id2',
          updatedAt: new Date().toISOString()
        }],
        generalNotifications: [{
          isPending: false,
          general: true,
          name: 'Test general',
          message: 'posted a comment',
          notificationStatus: 'read',
          notificationType: 'general',
          senderImage: testImage,
          id: 11,
          notificationLink: '/requests/my-approvals/EwUNJYzNg',
          updatedAt: new Date().toISOString()
        }]
      };
      wrapper.setProps(nextProps);
      expect(getDerivedStateFromPropsSpy).toHaveBeenCalled();
      done();
    });

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
    const wrapper = setup();

    const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
    wrapper.instance().handleMarkAllAsRead();
    expect(handleMarkAllAsReadSpy).toHaveBeenCalled();
    done();
  });

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
    const wrapper =
        setup({ ...customProps, title: 'General Notifications' });

    const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
    wrapper.instance().handleMarkAllAsRead();
    expect(handleMarkAllAsReadSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'handleMarkSingleAsRead'
    if a notification is clicked`, (done) => {
    const wrapper =
        setup({ ...customProps, title: 'General Notifications' });

    const handleMarkSingleAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkSingleAsRead');
    wrapper.instance().handleMarkSingleAsRead();
    expect(handleMarkSingleAsReadSpy).toHaveBeenCalled();

    done();
  });
});
