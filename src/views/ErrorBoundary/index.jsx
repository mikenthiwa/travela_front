import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import hash from 'object-hash';
import travelaLogo from '../../images/travela-logo.svg';
import travelaLogoMobile from '../../images/travela-mobile.svg';
import copy from '../../images/copy.png';
import slack from '../../images/slack.png';
import ops from '../../images/travela-404.png';
import './ErrorBoundary.scss';
import ErrorBoundaryImage from './ErrorBoundaryImage';
import {reportCrash} from '../../redux/actionCreator/errorBoundaryActions';

const helpChannel = process.env.REACT_APP_SLACK_HELP_CHANNEL;
class ErrorBoundary extends Component {

  message = React.createRef();

  state = {
    token: '',
    copied: false,
    crashed: false
  };


  renderNav = () => {
    return (
      <nav className="error-boundary-nav">
        <div className="error-boundary-nav__logo">
          <img src={travelaLogo} alt="" className="error-boundary-nav__logo-desktop" />
          <img src={travelaLogoMobile} alt="" className="error-boundary-nav__logo-mobile" />
        </div>
      </nav>
    );
  };

  onCopy = () => {
    const { current } = this.message;
    current.focus();
    current.select();
    document.execCommand('copy');
    this.setState({ copied: true });
  };


  goBackToSafety = () => {
    window.location.href = '/home';
  };

  renderMessage = () => {
    const { token, copied } = this.state;
    const message = (errorToken = token) => `Kindly check out this Travela issue \`${errorToken}\``;
    return (
      copied ? (
        <div className="travela-send-message">
          <img src={slack} alt="" className="slack-icon" />
          <img src={slack} alt="" className="slack-icon" />
          <div className="share-message-content">
            <p>Message copied!</p>
            <p>
              Open
              {' '}
              <span className="slack-channel">
                <a
                  href={helpChannel}
                  onClick={this.slackOpened}>
                #ask-travela
                </a>
              </span>
              {' '}
              on Slack
            </p>
          </div>
        </div>
      ): (
        <div
          className="error-boundary-message"
          title="Copy"
          role="presentation" onClick={this.onCopy}>
          <textarea data-gramm_editor="false" ref={this.message} value={message()} readOnly />
          <p
            className="travela-issue-message">
            {message(token.substring(0, 10))}
          </p>
          <div className="copy-icon">
            <img src={copy} alt="" />
          </div>
        </div>
      )
    );
  };

  slackOpened = () => {
    this.setState({ copied: false });
  };

  componentDidCatch(error, errorInfo) {
    const token = hash(error);
    this.setState({ crashed: true , token });
    const { reportCrash } = this.props;
    reportCrash({
      stackTrace: error.stack,
      link: window.location.href,
      stackTraceId: token
    });
  }

  renderContent = () => {
    const Message = this.renderMessage;
    return (
      <div className="error-boundary-content">
        <div className="error-boundary-content__image">
          <ErrorBoundaryImage />
        </div>
        <div className="error-boundary-content__card">
          <div className="error-boundary-content__card-content">
            <img src={ops} alt="" />
            <p className="error-boundary-title">It seems something is not quite right.</p>
            <p className="error-boundary-info">
              To report this, kindly copy and forward the message below to the
              {' '}
              <a
                href={helpChannel}
                onClick={this.slackOpened}
                className="error-boundary-channel">
                #ask-travela
              </a>
              {' '}
              channel.
            </p>
            <Message />
            <div className="error-boundary-footer">
              <button type="button" onClick={this.goBackToSafety}>
                Back to safety
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderErrorMessage = () => {
    const NavBar = this.renderNav;
    const Content = this.renderContent;
    return (
      <div className="error-boundary-page">
        <NavBar />
        <div className="error-boundary-page__container">
          <Content />
        </div>
      </div>
    );
  };

  render() {
    const { crashed } = this.state;
    const { children } = this.props;
    return crashed ? this.renderErrorMessage() : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  reportCrash: PropTypes.func
};

ErrorBoundary.defaultProps = {
  reportCrash: () => {}
};

export default connect(null, {
  reportCrash
})(ErrorBoundary);
