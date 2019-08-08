import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../ChecklistWizardPreview/PreviewCheckbox/Checkbox';
import PreviewBehaviour from '../../ChecklistWizardPreview/PreviewBehaviour';
import '../../ChecklistWizardPreview/PreviewCheckbox/index.scss';

class RequesterViewCheckbox extends Component {
  state = {
    isChecked: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const { isChecked } = this.state;
    if (!!prevState.isChecked === !!isChecked) return;
    const { item: { behaviour, id }, handleSkipToQuestion } = this.props;
    isChecked && behaviour.type === 'SKIP_QUESTION' && handleSkipToQuestion(id, true);
    !isChecked && behaviour.type === 'SKIP_QUESTION' && handleSkipToQuestion(id, false);
  }

  handleCheckbox = ({ target: { checked } }) => {
    const { isChecked } = this.state;
    this.setState({ isChecked: checked ? isChecked + 1 : isChecked - 1 });
  }

  renderPreviewBehavior = () => {
    const { item: { behaviour }, handleSkipToQuestion } = this.props;
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
    const { item: { prompt, configuration: { options }, isDisabled } } = this.props;
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
        {isDisabled && <div className="disabled-overlay" />}
      </div>
    );
  }
}

RequesterViewCheckbox.propTypes = {
  item: PropTypes.object.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
};

export default RequesterViewCheckbox;
