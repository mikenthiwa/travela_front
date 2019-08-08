import React, { Component } from 'react';
import toast from 'toastr';
import PropTypes from 'prop-types';
import PreviewChecklistItem from './PreviewChecklistItem';
import './index.scss';

class ChecklistWizardPreview extends Component {
  state = {
    disabledQuestions: [],
  }
  
  handleSkipToQuestion = (id, isDisabled) => {
    const { disabledQuestions } = this.state;
    const { items } = this.props;
    const index = items.findIndex(item => item.id === id) + 1;
    let array;
    if (isDisabled) {
      array = [index, ...disabledQuestions];
    } else  {
      array = disabledQuestions.filter((item, checklistIndex) => index !== (checklistIndex + 1));
    }
    this.setState({ disabledQuestions: array });
  };
  render() {
    const { items, nationality, destinations } = this.props;
    const { disabledQuestions } = this.state;
    const filteredConfig = items.filter((item, i) => !disabledQuestions.includes(i));
    return (
      <div className="checklist-wizard-preview checklist-wizard-col">
        <div className="checklist-wizard-preview-wrapper">
          <div className="preview-item-header">
            <p className="preview-header">Preview the Checklist</p>
            <p className="travellingto-preview">
              {`Applicable to ${nationality.name} travelling to `}
              <span className="coutries-blue">{`${destinations.length} ${destinations.length === 1 ? 'country' : 'countries'}`}</span>
            </p>
          </div>
          { filteredConfig.map((item, index) => (
            <div className="preview-checklist-item" key={item.id}>
              <PreviewChecklistItem
                handleSkipToQuestion={this.handleSkipToQuestion}
                item={item}
                order={index + 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
}


ChecklistWizardPreview.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  nationality: PropTypes.objectOf(PropTypes.string).isRequired,
  destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChecklistWizardPreview;
