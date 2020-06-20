import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_notificationHeader.scss';
import closeBtn from '../../images/close-btn.svg';

export default class NotificationHeader extends PureComponent {
  render() {
    const { onCloseNotificationPane } = this.props;

    return (
      <div className="notifications-header">
        <div className="notifications-header__title">
            Notifications
        </div>
        <img
          src={closeBtn}
          alt="close button"
          role="presentation"
          className="notifications-header__close-btn"
          onClick={onCloseNotificationPane}
        />
      </div>
    );
  }
}

NotificationHeader.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired
};
