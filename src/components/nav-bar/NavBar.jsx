import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter, Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import travela from '../../images/travela.svg';
import account from '../../images/account_circle.svg';
import logout from '../../images/logout.svg';
import mobileTravel from '../../images/travela-mobile.svg';
import icon from '../../images/drop-down-icon.svg';
import notification from '../../images/notification.svg';
import SearchBar from '../search-bar/SearchBar';
import centerIcon from '../../images/icons/circle.svg';
import SelectDropDown from '../SelectDropDown/SelectDropDown';
import selectDropDownIcon from '../../images/icons/form_select_dropdown.svg';
import Button from '../buttons/Buttons';
import ImageLink from '../image-link/ImageLink';
import { logoutUser } from '../../helper/userDetails';
import Utils from '../../helper/Utils';
import LocationDropdownRoutes from '../../helper/LocationDropdownRoutes';
import './NavBar.scss';
import searchBarAllowedRoutes from '../search-bar/SearchBarRoutes';
import inactiveHelpIcon from '../../images/icons/helpIcon_inactive.svg';

export class NavBar extends PureComponent {
  
  state = {
    hideLogoutDropdown: true,
    keyword: '',
    shouldOpen: false
  };

  debouncer = debounce(
    (history, pathName, queryString) =>
      (history.push(`${pathName}${queryString}`)),
    2000,
    { trailing: true }
  );

  componentWillMount() {
    const { location } = this.props;
    const locationUrl = new URLSearchParams(location.search).get('search');
    this.setState({ keyword: locationUrl || '' });
  }

  componentWillReceiveProps({ clearNav, shouldOpen }) {
    if (clearNav) {
      this.setState({
        keyword: ''
      });
    }
    setTimeout(() => {
      this.setState({ shouldOpen });
    }, shouldOpen ? 0 : 500);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown);
  }

  getUnreadNotificationsCount = () => {
    const { notifications } = this.props;
    let count = 0;
    notifications.map(notification => {
      if (notification.notificationStatus === 'unread') return count += 1;
    });
    const regulatedCount = (count > 99) ? '99+': count;
    return regulatedCount;
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

  getCenter = (center) => {
    const { history, location } = this.props;
    const locationUrl = new URLSearchParams(location.search);
    locationUrl.set('page', 1);
    center === 'All Locations' ? locationUrl.delete('center') : locationUrl.set('center', center);
    history.push(`${location.pathname}?${locationUrl.toString()}`);
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
  };

  hideDropdown = () => {
    this.setState({ hideLogoutDropdown: true });
    document.removeEventListener('click', this.hideDropdown);
  };

  logout = () => {
    const { history } = this.props;
    localStorage.removeItem('showReminder');
    localStorage.removeItem('loggedInBefore');
    logoutUser(history);
  };

  logoutLink() {
    const { hideLogoutDropdown } = this.state;
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

  renderHelpLink() {
    return (
      <div className="navbar__navbar-help-icon">
        <Link to="/help">
          <span>
            <p>Click to access Help Page</p>
          </span>
          <img alt="HelpIcon" src={inactiveHelpIcon} />
        </Link>
      </div>
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
        <img src={travela} alt="Andela Logo" className="mdl-cell--hide-phone navbar__travela-logo-text" />
        <img
          src={mobileTravel}
          alt="Travela Logo"
          className="navbar__travela-logo" />
      </span>
    );
  }

  renderUserIcons() {
    const { avatar, currentUser } = this.props;
    return (
      <div className="profile-sec">
        <span className="navbar__mdl-icons">
          <ImageLink
            imageSrc={currentUser ? currentUser.picture : avatar}
            altText="Andela Logo"
            imageClass="navbar__mdl-upic"
          />
          <span className="navbar__text-size">
            {currentUser ? currentUser.fullName : ''}
          </span>
        </span>
        {this.logoutLink()}
      </div>
    );
  }

  renderLocationDropdown(centers, centerSelected) {
    const { location } = this.props;
    return ( LocationDropdownRoutes.find(route => route.test(location.pathname))) &&(
      <div className="center-dropdown__container">
        <SelectDropDown
          onClickItem={this.getCenter}
          dropDownItems={centers}
          defaultSelected={centerSelected || 'All Locations'}
          dropDownIcon={selectDropDownIcon}
        />
      </div>
    );
  }

  renderHeader(handleShowDrawer, keyword){
    const { userCenters, location, userLocation } = this.props;
    const locationUrl = new URLSearchParams(location.search);
    const centerSelected = locationUrl.get('center');
    const defaultCenters = Array.from(new Set([ userLocation, ...userCenters]).values());
    const centers = location.pathname === '/trip-planner/checklists' ? defaultCenters : ['All Locations', ...userCenters];
    const allCenters = centers.map(center => ({ value: center, name: center }));
    return(
      <div className="mdl-layout__header-row">
        <div className="navbar__nav-size navbar__logo-icons">
          <button type="button" className="material-icons hamburger" onClick={handleShowDrawer}>
            menu
          </button>
          {this.renderLogo()}
        </div>
        <div className="mdl-layout-spacer" />
        { ( searchBarAllowedRoutes.find(route => route.test(location.pathname))) &&
          (
            <div className="navbar__search-size mdl-cell--hide-phone">
              <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} value={keyword} />
            </div>
          )
        }
        <div className="center-dropdown">
          {allCenters.length > 1 && this.renderLocationDropdown(allCenters, centerSelected)}
        </div>
        <nav className="mdl-navigation">
          {location.pathname !== '/welcome-page' ? this.renderHelpLink() : null}
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
    const {handleHideSearchBar, handleShowDrawer, openSearch } = this.props;
    const { keyword, shouldOpen } = this.state;
    let showSearch='none';
    if (openSearch) { showSearch='block';}
    return (
      <div className={shouldOpen ? 'header-container-modal-open' :'header-container'}>
        <header className="mdl-layout__header navbar__layout_header">
          {this.renderHeader(handleShowDrawer, keyword)}
          {( searchBarAllowedRoutes.find(route => route.test(location.pathname))) && 
          (
            <Fragment>
              <button
                type="button"
                className="navbar__search-icon--btn"
                onClick={handleHideSearchBar}
              >
                <div>
                  <i className="material-icons navbar__search-icon">search</i>
                </div>
              </button>
              <div
                className="navbar__onclick-search-size" style={{ display: `${showSearch}` }}>
                <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} value={keyword} />
              </div>
            </Fragment>
          )}
        </header>
      </div>
    );
  }
}

NavBar.propTypes = {
  onNotificationToggle: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  userLocation: PropTypes.string,
  currentUser: PropTypes.shape({}).isRequired,
  avatar: PropTypes.string.isRequired,
  handleHideSearchBar: PropTypes.func.isRequired,
  openSearch: PropTypes.bool,
  handleShowDrawer: PropTypes.func,
  notifications: PropTypes.array,
  userCenters: PropTypes.array,
  clearNav: PropTypes.bool.isRequired,
  shouldOpen: PropTypes.bool
};

NavBar.defaultProps = {
  openSearch: false,
  handleShowDrawer:()=>{},
  notifications: [],
  userCenters: [],
  userLocation: '',
  shouldOpen: false
};

const mapStateToProps = state => {
  const userCenters = _.maxBy([
    state.approvals.myCenters,
    state.travelChecklist.userCenters,
    state.analytics ? state.analytics.payload.userCenters : [],
  ],
  _.size);
  return {
    currentUser: state.user.currentUser,
    ...state.notifications,
    ...state.modal.modal,
    userLocation: state.user.currentUser.location,
    userCenters
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
