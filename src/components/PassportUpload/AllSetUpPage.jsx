import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import allSetUpImage from '../../images/allsetup.svg';
import './AllSetUpPage.scss';

class AllSetUpPage extends Component {
  handleGoToDashboardButtonClick = () => {
    const { history } = this.props;
    history.push('/home');
  };
  getStarted = () => (
    <button 
      onClick={() => this.handleGoToDashboardButtonClick()}
      className="get_started"
      type="button"
      id="get-started">
      Go To Dashboard
    </button>
  );
  render() {
    return (
      <div className="all-done">
        <div className="heading">
          You&#39;re All Set Up
        </div>
        <img src={allSetUpImage} className="complete_image" alt="all-done" />
        {this.getStarted()}
      </div>
    );
  }
}

AllSetUpPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default AllSetUpPage;
