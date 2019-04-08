import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import travela from '../../images/travela.svg';
import account from '../../images/account_circle.svg';
import logout from '../../images/logout.svg';
import mobileTravel from '../../images/travela-mobile.svg';
import icon from '../../images/drop-down-icon.svg';
import notification from '../../images/notification.svg';
import SearchBar from '../search-bar/SearchBar';
import Button from '../buttons/Buttons';
import ImageLink from '../image-link/ImageLink';
import { logoutUser } from '../../helper/userDetails';
import Utils from '../../helper/Utils';
import './NavBar.scss';

export class NavBar extends PureComponent {

  state = {
    hideLogoutDropdown: true,
    keyword: ''
  };

  
  debouncer = debounce(
    (history, pathName, queryString) =>
      (history.push(`${pathName}${queryString}`)),
    2000,
    { trailing: true }
  );

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown);
  }
  
  getUnreadNotificationsCount = () => {
    const { notifications } = this.props;
    let count = 0;
    notifications.map(notification => {
      if (notification.notificationStatus === 'unread') return count += 1;
    });
    return count;
  }

  onChange = (event) => {
    const { history, location } = this.props;
    this.setState({keyword: event.target.value}, () => {
      const {keyword} = this.state;
      const queryString = Utils.buildQuery(location.search, 'search', keyword);
      this.debouncer.cancel();
      this.debouncer(history, location.pathname, queryString);
    });
  }

  onSubmit = () => {
    this.debouncer.cancel();
    const { history, location } = this.props;
    const { keyword } = this.state;
    const queryString = Utils.buildQuery(location.search, 'search', keyword);
    history.push(`${location.pathname}${queryString}`);
  }

  handleClick = () => {
    const {hideLogoutDropdown} = this.state;
    this.setState({ hideLogoutDropdown: !hideLogoutDropdown});
    document.addEventListener('click', this.hideDropdown);
  }

  hideDropdown = () => {
    this.setState({hideLogoutDropdown: true});
    document.removeEventListener('click', this.hideDropdown);
  }

  logout = () => {
    const { history } = this.props;
    logoutUser(history);
  };

  logoutLink() {
    const {hideLogoutDropdown} = this.state;
    const logoutDropdownStyle = hideLogoutDropdown ? 'none' : 'block';
    return (
      <span className="dropdown-arrow">
        <Button
          onClick={this.handleClick}
          imageSrc={icon}
          altText="Dropdown Icon"
          buttonId="demo-menu-lower-right"
          imageClass="navbar__mdl-Icon"
          buttonType="button"
          buttonClass="mdl-button mdl-js-button mdl-button--icon mdl-Icons"
        />
        <div className="navbar__mdl-list" style={{display: `${logoutDropdownStyle}`}}>
          <div className="navbar__link">
            <Link className="navbar__link" id="profile" role="presentation" to="/settings/profile">
              <img
                src={account} alt="profile" className="navbar__navbar-account"
              />
              Profile
            </Link>
          </div>
          <div className="border-line" />
          <div className="navbar__link" onClick={this.logout} id="logout" role="presentation">
            <img
              src={logout}
              alt="profile"
              className="navbar__navbar--account"
            />
            Logout
          </div>
        </div>
      </span>
    );
  }

  renderNotification() {
    const { onNotificationToggle } = this.props;
    const unreadNotificationsCount = this.getUnreadNotificationsCount();
    const notificationClassName = (unreadNotificationsCount)
      ? 'material-icons mdl-badge navbar__badge'
      : 'material-icons navbar__badge';
    return (
      <div
        id="notification"
        onClick={onNotificationToggle}
        className="navbar__nav-size"
        role="presentation"
      >
        <span
          className={notificationClassName}
          data-badge={unreadNotificationsCount}
        >
          <img
            src={notification}
            alt="Notification"
            className="navbar__navbar-notification"
          />
        </span>
      </div>
    );
  }

  renderLogo() {
    return (
      <span className="navbar__logo-icons">
        <img src={travela} alt="Andela Logo" className="mdl-cell--hide-phone" />
        <img
          src={mobileTravel} 
          alt="Travela Logo" 
          className="navbar__travela-logo" />
      </span>
    );
  }

  renderUserIcons() {
    const { avatar, user } = this.props;
    return (
      <div className="profile-sec">
        <span className="navbar__mdl-icons">
          <ImageLink
            imageSrc={user ? user.UserInfo.picture : avatar}
            altText="Andela Logo"
            imageClass="navbar__mdl-upic"
          />
          <span className="navbar__text-size">
            {user ? user.UserInfo.name : ''}
          </span>
        </span>
        {this.logoutLink()}
      </div>
    );
  }

  renderHeader(handleShowDrawer){

    return(
      <div className="mdl-layout__header-row">
        <div className="navbar__nav-size navbar__logo-icons">
          <button type="button" className="material-icons hamburger" onClick={handleShowDrawer}>
            menu
          </button>
          {this.renderLogo()}
        </div>
        <div className="mdl-layout-spacer" />
        <div className="navbar__search-size mdl-cell--hide-phone">
          <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <nav className="mdl-navigation">
          {this.renderNotification()}
          <div className="navbar__user-icon navbar__nav-size 
            mdl-cell--hide-tablet mdl-cell--hide-phone">
            {this.renderUserIcons()}
          </div>
        </nav>
      </div>
    );
  }

  render() {
    const {handleHideSearchBar, handleShowDrawer, openSearch, shouldOpen } = this.props;
    let showSearch='none';
    if(openSearch) {
      showSearch='block';
    }
    return (
      <div className={shouldOpen ? '' : 'header-container'}>
        <header className="mdl-layout__header navbar__layout_header">
          {this.renderHeader(handleShowDrawer)}
          <button type="button" className="navbar__search-icon--btn" onClick={handleHideSearchBar}>
            <div>
              <i className="material-icons navbar__search-icon">
          search
              </i>
            </div>
          </button>
          <div
            className="navbar__search-size 
                  mdl-cell--hide-desktop mdl-cell--hide-tablet" style={{display: `${showSearch}`}}>
            <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} />
          </div>
        </header>
      </div>
    );
  }
}

NavBar.propTypes = {
  onNotificationToggle: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  avatar: PropTypes.string.isRequired,
  handleHideSearchBar: PropTypes.func.isRequired,
  openSearch: PropTypes.bool,
  shouldOpen: PropTypes.bool,
  handleShowDrawer: PropTypes.func,
  notifications: PropTypes.array
};

NavBar.defaultProps = {
  openSearch: false,
  shouldOpen: false,
  handleShowDrawer:()=>{},
  notifications: []
};

const mapStateToProps = state => ({
  user: state.auth.user,
  ...state.notifications,
  ...state.modal.modal,
});

export default withRouter(connect(mapStateToProps)(NavBar));
