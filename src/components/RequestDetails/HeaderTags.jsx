import React, { Component } from 'react';
import PropTypes from 'prop-types';
import greenTick from '../../images/Tick/green_tick.svg';

class HeaderTag extends Component {
  render() {
    const {
      submissionInfo: { percentageCompleted }, request: { status, budgetStatus }
    } = this.props;
    return (
      <div className="stage-container">
        <div
          className={`stage ${
            status === 'Open' && budgetStatus === 'Open' ? 'is-current' : ''
          }`}
        >
          Managers Approval
          {(status && status === 'Approved') || status === 'Verified' ? (
            <img className="green-tick" src={greenTick} alt="green-tick" />
          ) : (
            ''
          )}
        </div>
        <div
          className={`stage ${
            status === 'Approved' && budgetStatus === 'Open'
              ? 'is-current'
              : (status === 'Approved' || status === 'Verified') && budgetStatus === 'Approved'
                ? ''
                : 'incomplete'
          }`}
        >
          Budget Check
          {budgetStatus && budgetStatus === 'Approved' ? (
            <img className="green-tick" src={greenTick} alt="green-tick" />
          ) : (
            ''
          )}
        </div>
        <div
          className={`stage ${
            status === 'Approved' && budgetStatus === 'Approved' && percentageCompleted !== 100
              ? 'is-current'
              : percentageCompleted === 100
                ? ''
                : 'incomplete'
          }`}
        >
          Travel Checklist Submission
          {percentageCompleted === 100 ? (
            <img className="green-tick" src={greenTick} alt="green-tick" />
          ) : (
            ''
          )}
        </div>
        <div
          className={`stage ${
            status === 'Approved' && budgetStatus === 'Approved' && percentageCompleted === 100
              ? 'is-current'
              : status === 'Verified'
                ? ''
                : 'incomplete'
          }`}
        >
          Travel Verification
          {status && status === 'Verified' ? (
            <img className="green-tick" src={greenTick} alt="green-tick" />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

HeaderTag.propTypes = {
  request: PropTypes.shape({}).isRequired,
  submissionInfo: PropTypes.object.isRequired,
};

export default HeaderTag;
