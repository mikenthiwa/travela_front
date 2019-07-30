import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import PreviewBehaviour from '../PreviewBehaviour';
import './index.scss';

class PreviewCheckbox extends Component {
  state = {
    isChecked: 0,
  }

  handleCheckbox = ({ target: { checked } }) => {
    const { isChecked } = this.state;
    this.setState({ isChecked: checked ? isChecked + 1 : isChecked - 1 });
  }

  renderPreviewBehavior = () => {
    const { item: { behaviour } , handleSkipToQuestion } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="display-preview-behaviour">
        {!!isChecked && (
          <PreviewBehaviour
            behaviour={behaviour}
            handleSkipToQuestion={handleSkipToQuestion}
          />)}
      </div>
    );
  }

  render() {
    const { item: { prompt, configuration: { options } } } = this.props;
    return (
      <div>
        <div className="checkbox-preview-wrapper">
          <div className="checkbox-input-wrap">
            {options.map(option => (
              <div key={option.id} className="checkbox-option">
                <Checkbox
                  prompt={prompt}
                  options={option}
                  handleCheckbox={this.handleCheckbox}
                />
              </div>
            ))}
          </div>
          { this.renderPreviewBehavior() }
        </div>
      </div>
    );
  }
}

PreviewCheckbox.propTypes = {
  item: PropTypes.object.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
};

export default PreviewCheckbox;
