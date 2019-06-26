import React from 'react';
import './SubmitArea.scss';
import { PropTypes } from 'prop-types';

class SubmitArea extends React.Component {
  renderBackButton = (onClick, currentTab ) => {
    return (
      <button
        type="button"
        className="bg-btn bg-btn--active"
        onClick={() => onClick('back')}
        id="back-submit"
        disabled={currentTab === 0}
      >
        Back
      </button>
    );
  };

  renderNextButton = (onClick, currentTab, numTabs) => {
    return (
      <button
        type="button"
        className="bg-btn bg-btn--active"
        onClick={() => onClick('next')}
        id="back-submit"
        disabled={currentTab === numTabs - 1}
      >
        Next
      </button>
    );
  };

  render() {
    const { handleSubmitArea, numTabs, currentTab } = this.props;
    return (
      <div className="checklist-submit-area submit-area">
        {this.renderBackButton(handleSubmitArea, currentTab)}
        {this.renderNextButton(handleSubmitArea, currentTab, numTabs)}
      </div>
    );
  }
}

SubmitArea.propTypes = {
  handleSubmitArea: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
  numTabs: PropTypes.number.isRequired
};

export default SubmitArea;
