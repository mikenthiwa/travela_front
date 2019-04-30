import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './_notificationItem.scss';
import readMessageIcon from '../../images/read-message.svg';
import unreadMessageIcon from '../../images/unread-message.svg';
import generateDynamicDate from '../../helper/generateDynamicDate';

export default class NotificationItem extends PureComponent {
  state = {
    localNotificationStatus: 'unread'
  }

  markAsRead = () => {
    const { markSingleAsRead, id } = this.props;
    this.setState({
      localNotificationStatus: 'read'
    });
    markSingleAsRead(id);
  }

  checkMarkedAsRead = () => {
    const { localNotificationStatus } = this.state;
    const { notificationStatus } = this.props;
    return notificationStatus === 'read' || localNotificationStatus === 'read';
  }

  renderNotificationItemMetaInfo = () => {
    const { isPending, notificationStatus, link,
      timeStamp, general, markSingleAsRead, id } = this.props;
    const { localNotificationStatus } = this.state;
    return (
      <div className="notification--item__info__bottom">
        <span className="t-hours-ago">
          {generateDynamicDate(true, timeStamp)}
        </span>
        <Link to={`${link}`}>
          <span
            className="view-details"
            onClick={() => markSingleAsRead(id)} role="button" tabIndex="0" onKeyUp={()=>{}}>
            {isPending && 'View Details'}
            {' '}
            {general && 'View Details'}
          </span>
        </Link>
        <img
          role="presentation"
          src={this.checkMarkedAsRead()
            ? readMessageIcon : unreadMessageIcon}
          alt="message icon"
          className={this.checkMarkedAsRead()
            ? 'msg-icon msg-icon__opened' : 'msg-icon msg-icon__closed'}
          onClick={this.markAsRead}
        />
      </div>
    );
  };

  renderNotificationMessage = (message, link) => {
    const id = link.split('/').pop();
    const fixedMessage = message.includes('<a href=') && message.split('<a href')[0] + id + message.split('</a>').pop();
    const activeMessage = fixedMessage || message;

    return (
      <span>
        {activeMessage.includes(id)
          ? (
            <span id="notificationWithLink">
              {activeMessage.split(id)[0]}&nbsp;
              <Link to={link}>
                {id}
              </Link>
              {activeMessage.split(id)[1]}
            </span>
          ): activeMessage
        }
      </span>
    );
  }

  render() {
    const { name, image, message, user, link } = this.props;
    const bgColorClass = this.checkMarkedAsRead() ? 'message-opened' : '';
    const userName = user.UserInfo && user.UserInfo.name;
    const handle = new RegExp(userName).test(message);


    return (
      <div className={`notification-item ${bgColorClass}`}>
        <div className="notification-item__image__container">
          <img src={image} alt="" className="notification-item__image" />
        </div>
        <div className="notification-item__info">
          <div className="notification--item__info__top">
            <div>
              <span className="notification--item__info__top__name">
                {handle ? '' : `@${name} `}
              </span>
              {this.renderNotificationMessage(message, link)}
            </div>
          </div>
          {this.renderNotificationItemMetaInfo()}
        </div>
      </div>
    );
  }
}

NotificationItem.defaultProps = {
  isPending: false,
  general: false,
  name: '',
  image: '',
  markSingleAsRead: () => { },
  message: '',
};

NotificationItem.propTypes = {
  isPending: PropTypes.bool,
  general: PropTypes.bool,
  link: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.number.isRequired,
  notificationStatus: PropTypes.string.isRequired,
  image: PropTypes.string,
  timeStamp: PropTypes.string.isRequired,
  message: PropTypes.string,
  markSingleAsRead: PropTypes.func,
  user: PropTypes.shape().isRequired,
};
