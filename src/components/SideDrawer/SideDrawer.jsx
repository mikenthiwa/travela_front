import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SideDrawer.scss';
import ConnectedLeftSideBar from '../LeftSideBar/LeftSideBar';
import ImageLink from '../image-link/ImageLink';
import closeBtn from '../../images/close-btn.svg';

export class SideDrawer extends PureComponent {
  render() {
    const { user, handleShowDrawer, showDrawer, location } = this.props;
    const showDrawerTransition = showDrawer === 'none'? 
      'side-drawer__slide-in' : 'side-drawer__slide-out';
    return (
      <div className={`side-drawer ${showDrawerTransition}`}>
        <div
          className={
            `side-drawer__cancel-btn ${showDrawer === 'none' ? 'hidden' : ''}`
          }>
          <button type="button" onClick={handleShowDrawer}>
            <img src={closeBtn} alt="close" />
          </button>
        </div>
        <div className="side-drawer__user-details">
          <ImageLink
            altText="User profile picture"
            imageClass="navbar__mdl-upic"
            imageSrc={user ? user.UserInfo.picture : ''}
          />
          <div className="side-drawer__user-name">
            {user ? user.UserInfo.name : ''}
          </div>
        </div>
        <hr className="side-drawer__divider" />
        <nav role="presentation" onClick={handleShowDrawer} className="mdl-navigation">
          <ConnectedLeftSideBar location={location} />
        </nav>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  user: PropTypes.object.isRequired,
  showDrawer: PropTypes.string,
  location: PropTypes.object,
  handleShowDrawer: PropTypes.func.isRequired
};

SideDrawer.defaultProps = {
  showDrawer: 'block',
  location: {}
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(SideDrawer);
