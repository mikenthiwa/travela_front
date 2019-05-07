import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { setCurrentUser } from '../../redux/actionCreator';
import { postUserData, resetErrors } from '../../redux/actionCreator/userActions';
import travelaLogo from '../../images/travela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import fileSymbol from '../../images/file.svg';
import './Login.scss';
import TextLink from '../../components/TextLink/TextLink';
import { loginStatus } from '../../helper/userDetails';
import Utils from '../../helper/Utils';
import ButtonLoadingIcon from '../../components/Forms/ButtonLoadingIcon';

export class Login extends Component {

  state = {
    isLoading: false
  };

  componentDidMount() {
    const {match:{params}, isAuthenticated} = this.props;
    if(params[0]){
      localStorage.setItem('url', `/${params[0]}`);
      !isAuthenticated && this.login();
    }
    this.authenticated();
  }

  componentDidUpdate(prevProps) {
    this.updated();
  }

  updated = () =>  {
    const { postUserData, errors } = this.props;
    if (errors !== 'Only Andela Email address allowed' && typeof postUserData.token === 'string') {
      localStorage.setItem('jwt-token', postUserData.token);
      this.redirect();
    }
    const { isLoading } =  this.state;
    if ( isLoading && typeof errors === 'string' )
      this.setState({ isLoading: false });
  };

  /* istanbul ignore next */
  authenticated = () => {
    const {  history, setUser } = this.props;
    const token = localStorage.getItem('jwt-token');
    if (token) {
      const decodedToken = Utils.verifyToken(token);
      if(!decodedToken) return history.push('/');
      const { exp } = decodedToken;
      this.checkTokenExpiration(exp);
    }
    setUser();
  };



  checkTokenExpiration = (exp) => {
    const { user } = this.props;
    if(exp && !Utils.isExpired(exp)) {
      loginStatus();
      this.redirect();
    }
  }

  /* istanbul ignore next */
  redirect =() => {
    const {  history } = this.props;
    const url = localStorage.getItem('url');
    if(url) {
      history.push(url);
      localStorage.removeItem('url');
    } else {
      window.location.replace('/home');
    }
  }

  login = (GoogleAuth) => {
    const { postData } = this.props;
    const token = GoogleAuth.tokenId;
    postData({token});
  };

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

  renderGoogleLogin() {
    const { isLoading } = this.state;
    const { resetErrors } = this.props;
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        id="login"
        render={renderProps => (
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised
                      mdl-button--colored login-page__login-btn"
            onClick={() => {this.setState({ isLoading: true}); renderProps.onClick(); resetErrors();}}
            disabled={renderProps.disabled}>
            <img src={symbolG} alt="google-logo" className="login-page__google-white" />
                      Login to Get Started
            <ButtonLoadingIcon isLoading={isLoading} />
          </button>
        )}
        cookiePolicy="single_host_origin"
        onSuccess={this.login}
        onFailure={this.login}
        textClass="login-page__login-to-get-started-text"
      />
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
                {this.renderGoogleLogin()}
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
  setUser: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  postUserData: PropTypes.array,
  errors: PropTypes.shape({}),
  user: PropTypes.shape({}),
  match: PropTypes.object,
  resetErrors: PropTypes.func.isRequired
};

Login.defaultProps = {
  user: [],
  match:{},
  errors: {},
  postUserData: []
};

export const mapStateToProps = ({ auth, user }) => ({
  ...auth, ...user
});

export default connect(
  mapStateToProps,
  { setUser: setCurrentUser, postData: postUserData, resetErrors }, null, {pure: false}
)(Login);
