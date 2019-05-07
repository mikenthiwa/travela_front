import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'cookies-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import Utils from '../helper/Utils';
import API from '../services/AccommodationAPI';
import { logoutUser } from '../helper/userDetails';
import checkUserPermission from '../helper/permissions';

const history = PropTypes.shape({});

/* istanbul ignore next */
export default function(ComposedComponent, ...allowedRoles) {
  /* istanbul ignore next */
  class Authenticate extends Component {
    componentDidMount() {
      const token = localStorage.getItem('jwt-token');
      const { history } = this.props;
      if(token) {
        API.setToken();
        this.verifyToken(token);

        // This decodes the user object saved in the cookie and
        // uses this information to verify the user's
        // identity on fullstory.
        const decodedUser = jwtDecode(token);
        window.FS.identify(decodedUser.UserInfo.id, {
          displayName: decodedUser.UserInfo.name,
          email: decodedUser.UserInfo.email,
        });
      } else {
        return logoutUser(history, 'Session Expired. Login to continue');
      }
    }

    verifyToken(token) {
      const { history } = this.props;
      const decodedToken = Utils.verifyToken(token);
      const msg = 'Session Expired. Login to continue';
      if(!decodedToken) return logoutUser(history, msg);
      const { exp } = decodedToken;
      Utils.isExpired(exp) && logoutUser(history, msg);
    }

    render() {
      const { history, getCurrentUserRole, isLoaded } = this.props;
      return isLoaded && checkUserPermission(history, allowedRoles, getCurrentUserRole)
        ? <ComposedComponent {...this.props} />
        : null;
    }
  }

  Authenticate.propTypes = {
    history: history.isRequired,
    getCurrentUserRole: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoaded: PropTypes.bool.isRequired,
  };

  const mapStateToProps = ({ auth, user }) => ({ ...auth,...user });
  return withRouter(connect(mapStateToProps, null)(Authenticate));
}
