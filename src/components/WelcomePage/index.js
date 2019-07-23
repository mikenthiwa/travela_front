import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import welcomeImage from '../../images/welcome_page.svg';
import ButtonLoadingIcon from '../Forms/ButtonLoadingIcon';
import './WelcomePage.scss';

class WelcomePage extends Component {
  handleGetStartedButtonClick = (event, nextStep) => {
    nextStep && nextStep(event);
  };
  render() {
    const { hasBlankFields, loading, send, nextStep } = this.props;
    return (
      <div className="welcome">
        <div className="heading">
          Welcome to Travela
        </div>
        <img src={welcomeImage} className="welcome_image" alt="welcome" />
        <div className="message">
          {'Hi slim this is your first time here & we\'re glad to have you on board. please click the button to begin'}
        </div>
        <button
          onClick={e => this.handleGetStartedButtonClick(e, nextStep)}
          type="submit"
          className="get_started"
          id="get-started"
          disabled={hasBlankFields}>
          <ButtonLoadingIcon isLoading={loading} buttonText={send} />
        </button>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  nextStep: PropTypes.func,
  hasBlankFields: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  send: PropTypes.string,
};

WelcomePage.defaultProps = {
  loading: false,
  send: '',
  nextStep: () => {}
};

export default WelcomePage;
