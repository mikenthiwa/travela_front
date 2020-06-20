import React from 'react';
import {PropTypes} from 'prop-types';
import './BackButton.scss';

class BackButton extends React.Component {
  handleBackButtonClick = (event, backStep) => {
    backStep && backStep(event);
  };

  backButton = backStep => (
    <div className="back-btn">
      <button
        type="button"
        onClick={e => this.handleBackButtonClick(e, backStep)}
        className="bg-btn bg-btn--active"
        id="back-submit"
      >
        Back
      </button>
    </div>
  );

  render() {
    const { backStep } = this.props;
    return <div>{this.backButton(backStep)}</div>;
  }
}

BackButton.propTypes = {
  backStep: PropTypes.func.isRequired,
};

export default BackButton;
