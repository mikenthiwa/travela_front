import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import './_notificationPane.scss';
import handleManagerNotification from '../../helper/socket/socket';
import {
  fetchUsersNotification,
  updateAllNotificationStatus,
  markSingleNotificationAsRead
} from '../../redux/actionCreator/notificationsActions';

export class NotificationPane extends PureComponent {

  componentDidMount() {
    const { user, fetchUsersNotification } = this.props;
    fetchUsersNotification();
    handleManagerNotification(user);
  }

  getNotifications() {
    const { notifications } = this.props;
    const generalNotifications = [];
    const pendingNotifications = [];
    notifications.map(notification => {
      if (notification.notificationType === 'general') {
        generalNotifications.push(notification);
      } else if(notification.notificationType === 'pending') {
        pendingNotifications.push(notification);
      }
    });
    return { generalNotifications, pendingNotifications };
  }

  renderNoNotificationsMessage() {
    return (
      <div className="no-notification-msg">
        No notifications
      </div>
    );
  }

  render() {
    const {
      onCloseNotificationPane, updateAllNotificationStatus,
      markSingleNotificationAsRead, singleNotificationRead, 
      user
    } = this.props;
    const { generalNotifications, pendingNotifications } = this.getNotifications();
    return (
      <div className="nav-pane">
        <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
        {
          (generalNotifications.length || pendingNotifications.length) ? (
            <div className="scrollable-div">
              {
                (pendingNotifications.length > 0) && (
                  <NotificationContainer
                    title="Pending Approvals" pendingNotifications={pendingNotifications}
                    updateAllNotificationStatus={updateAllNotificationStatus}
                    singleNotificationRead={singleNotificationRead}
                    markSingleNotificationAsRead={markSingleNotificationAsRead}
                    user={user}
                  />
                )
              }
              {
                (generalNotifications.length > 0) && (
                  <NotificationContainer
                    title="General Notifications" generalNotifications={generalNotifications}
                    updateAllNotificationStatus={updateAllNotificationStatus} 
                    markSingleNotificationAsRead={markSingleNotificationAsRead}
                    singleNotificationRead={singleNotificationRead}
                    user={user}
                  />)
              }
            </div>
          ) : this.renderNoNotificationsMessage()}
        <div className="notification-item__last" />
      </div>

    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired,
  fetchUsersNotification: PropTypes.func.isRequired,
  updateAllNotificationStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object),
  markSingleNotificationAsRead: PropTypes.func.isRequired,
  singleNotificationRead: PropTypes.number.isRequired
};

NotificationPane.defaultProps = {
  notifications: [],
  user: {
    UserInfo: {
      id: ''
    }
  }
};

const mapStateToProps = ({auth, notifications, modal}) => ({
  user: auth.user,
  notifications: notifications.notifications,
  singleNotificationRead: notifications.singleNotificationRead,
  ...modal.modal
});

const mapDispatchToProps = {
  fetchUsersNotification,
  updateAllNotificationStatus,
  openModal,
  closeModal,
  markSingleNotificationAsRead
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPane);
