import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'cookies-js';
import { setCurrentUser } from '../../redux/actionCreator';
import { postUserData } from '../../redux/actionCreator/userActions';
import travelaLogo from '../../images/travela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import videoSymbol from '../../images/video.svg';
import fileSymbol from '../../images/file.svg';
import './Login.scss';
import TextLink from '../../components/TextLink/TextLink';
import { loginStatus } from '../../helper/userDetails';
import Utils from '../../helper/Utils';
import Button from '../../components/buttons/Buttons';

export class Login extends Component {
  componentDidMount() {
    const {match:{params}, isAuthenticated} = this.props;
    if(params[0]){
      localStorage.setItem('url', `/${params[0]}`);
      !isAuthenticated && this.login();
    }
    this.authenticated();
  }

  /* istanbul ignore next */
  authenticated() {
    const {  history, setCurrentUser, user, postUserData } = this.props;
    const token = Cookies.get('jwt-token');
    if (token) {
      const decodedToken = Utils.verifyToken(token);
      if(!decodedToken) return history.push('/');
      const { exp } = decodedToken;
      this.checkTokenExpiration(exp);
    }
    setCurrentUser();
  }

  checkTokenExpiration(exp) {
    const { user, postUserData } = this.props;
    if(exp && !Utils.isExpired(exp)) {
      const users = {
        email: user.UserInfo.email,
      };
      loginStatus();
      postUserData(users);
      this.redirect();
    }
  }

  /* istanbul ignore next */
  redirect() {
    const {  history } = this.props;
    const url = localStorage.getItem('url');
    if(url) {
      history.push(url);
      localStorage.removeItem('url');
    } else {
      history.push('/home');
    }
  }

  login() {
    const url = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${
      process.env.REACT_APP_AUTH_REDIRECT_URL
    }`;
    window.location.replace(url);
  }

  renderLandPageImage() {
    return (
      <div className="mdl-cell mdl-cell--7-col mdl-cell--hide-tablet mdl-cell--hide-phone">
        <img
          src={cover} alt="Road map" className="login-page__landing-page-map" />
      </div>
    );
  }

  renderLinks() {
    const travelIntranet = 'https://sites.google.com/andela.com/travel-intranet/home?authuser=0';
    const andelaPolicy = `${`
      https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit`}`;
    return (
      <Fragment>
        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text="Andela Travel Intranet"
          link={travelIntranet} />

        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text="Andela Travel Policy"
          link={andelaPolicy} />
      </Fragment>
    );
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout login-page">
        <div className="mdl-layout__content">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--5-col mdl-cell--5-col-tablet hero">
              <div className="hero__main">
                <img
                  src={travelaLogo}
                  alt="Andela Logo"
                  className="login-page__andela-logo" />
                <p className="login-page__travel-request-text">
                  Travel Requests Made Easier
                </p>
                <Button
                  id="login"
                  onClick={this.login}
                  textClass="login-page__login-to-get-started-text"
                  text="Login to Get Started"
                  imageSrc={symbolG}
                  altText="Google Symbol"
                  imageClass="login-page__google-white"
                  buttonType="button"
                  buttonClass="mdl-button mdl-js-button mdl-button--raised
                   mdl-button--colored login-page__login-btn" />
              </div>
              <div className="hero__links">
                {this.renderLinks()}
              </div>
            </div>
            {this.renderLandPageImage()}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  postUserData: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  match: PropTypes.object
};

Login.defaultProps = {
  user: [],
  match:{}
};

export const mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser, postUserData }, null, {pure: false}
)(Login);
