import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import ConnectedNavBar from '../../components/nav-bar/NavBar';
import ConnectedLeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import ConnectedNotificationPane from '../../components/notification-pane/NotificationPane';
import ConnectedSideDrawer from '../../components/SideDrawer/SideDrawer';
import upic from '../../images/upic.svg';
import reminderIcon from '../../images/icons/globe.svg';
import closeButton from '../../images/icons/close.svg';
import './Layout.scss';
import {getUserData} from '../../redux/actionCreator/userActions';
import checkUploadedDocument from './helper';

export class Layout extends Component {

  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    hideOverlay: true,
    delay: false,
    clearNav: false,
    showReminder: false,
    title: ''
  };

  componentDidMount = () => {
    const { user, getUserData } = this.props;
    user && getUserData(user.UserInfo.id);
  };

  componentWillReceiveProps({ location, currentUser }) {
    const getReminderStatus = JSON.parse(localStorage.getItem('showReminder'));
    const loggedInBefore = JSON.parse(localStorage.getItem('loggedInBefore'));

    const { travelDocuments } = Object.keys(currentUser).length && currentUser;
    const docs = travelDocuments && travelDocuments.reduce((obj, item) => (obj[item.type] = item.type, obj) ,{});

    const searchParam = new URLSearchParams(location.search).get('search');
    const clearNav = searchParam ? false : true;
    this.setState({ clearNav });

    if (loggedInBefore && docs) {
      if (getReminderStatus) {
        this.setState({ showReminder: false });
      } else {
        const title = checkUploadedDocument(docs);
        setTimeout( () => {
          this.setState({ showReminder: true, title });
        }, 3000);
      }
    }
  }

  onNotificationToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      hideNotificationPane: !prevState.hideNotificationPane,
      hideSideBar: !prevState.hideSideBar
    }));
  };

  handleHideSearchBar = () => {
    this.setState(prevState => ({
      ...prevState,
      openSearch: !prevState.openSearch
    }));
  };

  handleOverlay = () => {
    this.setState({ hideOverlay: true });
  };

  handleShowDrawer = () => {
    this.setState({ hideOverlay: false });
  };

  closeReminder = () => {
    this.setState({ 
      showReminder: false
    });
    localStorage.setItem('showReminder', JSON.stringify('false'));
  }

  renderNavBar = (openSearch, clearNav) => {
    return (
      <ConnectedNavBar
        className=""
        avatar={upic}
        onNotificationToggle={this.onNotificationToggle}
        handleHideSearchBar={this.handleHideSearchBar}
        openSearch={openSearch}
        handleShowDrawer={this.handleShowDrawer}
        clearNav={clearNav}
      />
    );
  };

  renderLeftSideBar = (hideSideBar) => {
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    const { location } = this.props;
    if (location.pathname !== '/welcome-page') {
      return (
        <div
          className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet
          mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>
          <div className={`sidebar ${hideClass2}`}>
            <ConnectedLeftSideBar location={location} />
          </div>
        </div>
      );
    }
    return null;
  };


  renderOverlay = (overlayClass) => {
    return (
      <div
        className="side_overlay"
        style={{ display: `${overlayClass}` }}
        role="button"
        onClick={this.handleOverlay}
        onKeyPress={() => {}}
        tabIndex="0"
      />
    );
  };

  renderNotificationPane = (hideClass, hideSideBar) => {
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    const { isAuthenticated } = this.props;
    return isAuthenticated && (
      <div
        className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3}
        request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}
      >
        <div className={`notification ${hideClass}`}>
          <ConnectedNotificationPane
            onCloseNotificationPane={this.onNotificationToggle}
          />
        </div>
      </div>
    );
  };

  renderSideDrawer = (showDrawer) => {
    const {location} = this.props;
    return (
      <ConnectedSideDrawer
        showDrawer={showDrawer}
        location={location}
        handleShowDrawer={this.handleOverlay}
      />
    );
  };

  renderContent(){
    const {children, isLoaded, user, location} = this.props;
    const { hideNotificationPane, hideSideBar} = this.state;
    const [hideClass, leftPaddingClass] = hideNotificationPane
      ? ['hide', '']
      : ['', 'pd-left'];
    return (
      <div className="mdl-layout__content full-height">
        <div className="mdl-grid mdl-grid--no-spacing full-height">
          {location.pathname !== '/welcome-page' ? this.renderLeftSideBar(hideSideBar) : null}
          <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view
          mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            <div className={`rp-requests ${leftPaddingClass}`}>
              { (isLoaded || !user) &&  children }
            </div>
          </div>
        </div>
        {this.renderNotificationPane(hideClass, hideSideBar)}
      </div>
    );
  }

  renderReminder = () => {
    const { showReminder, title } = this.state;
    const { user } =  this.props;
    if (showReminder) {
      return (
        <div className="reminder-wrapper">
          <div className="reminder">
            <img src={reminderIcon} alt="icon" className="reminder__icon" />
            <div className="reminder__body">
              <span className="username">
                Hi 
                {' '}
                {user.UserInfo && user.UserInfo.fullName}
                ,
              </span>
              <span>
                This is a gentle reminder that you are yet to upload 
                {' '}
                {title}
              </span>
              <Link to="/travel_readiness">
                <button type="button" onClick={this.closeReminder} className="reminder-link">
                  If it is ready, kindly click this link to upload it.
                </button>
              </Link>
              <button type="button" className="close-reminder" onClick={this.closeReminder}>
                <img src={closeButton} alt="close-button" />
              </button>
            </div> 
          </div>
        </div>
      );
    }
  }

  render () {
    const { hideOverlay, openSearch, clearNav } = this.state;
    const overlayClass = hideOverlay ? 'none': 'block';
    return (
      <div>
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
          {this.renderOverlay(overlayClass)}
          {this.renderSideDrawer(overlayClass)}
          {this.renderNavBar(openSearch, clearNav)}
          {this.renderContent()}
          {this.renderReminder()}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = ({auth, user, currentUser}) => ({...user,...auth, ...currentUser});

export default withRouter(connect(mapStateToProps, { getUserData })(Layout));
