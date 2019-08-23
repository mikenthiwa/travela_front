import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewBehaviour from '../../ChecklistBehaviour/ChecklistBehaviour';
import '../../../CheckListWizard/ChecklistWizardPreview/PreviewCheckbox/index.scss';

class RequesterViewCheckbox extends Component {

  handleCheckbox = (id, checked) => {

    return () => {
      const { handleResponse, item } = this.props;
      const response = item.response || { id: item.id, selectedValue: [], behaviour: item.behaviour };
      const selectedValue = !checked
        ? [...response.selectedValue, id] : response.selectedValue.filter(optionId => optionId !== id);
      handleResponse({ ...response, selectedValue });
    };
  };

  handleBehaviour = (behaviour) => {
    const { handleResponse, item: { response } } = this.props;
    handleResponse({ ...response, behaviour });
  }

  renderPreviewBehavior = () => {
    const { item: { response: { selectedValue, behaviour } } } = this.props;
    return (
      <div className="display-preview-behaviour">
        {!!selectedValue.length && (
          <PreviewBehaviour
            behaviour={behaviour}
            handleBehaviour={this.handleBehaviour}
          />)}
      </div>
    );
  }

  renderCheckbox = (option, checked) => {
    return (
      <div className="checkbox-option" key={option.id}>
        <label htmlFor={option.id}>
          <input 
            className="checkbox-input"
            type="checkbox"
            id={option.id}
            onChange={this.handleCheckbox(option.id, checked)}
            name={`${prompt}-checkbox`} 
            value={option.name}
            checked={checked}
          />
          <div className="fancy-checkbox" />
          {option.name}
        </label>
      </div>
    );
  }

  render() {
    const { item: { configuration: { options }, response } } = this.props;
    const selectedValue = response ? response.selectedValue : [];
    return (
      <div>
        <div className="checkbox-preview-wrapper">
          <div className="checkbox-input-wrap">
            {options.map(option => {
              const checked = selectedValue.includes(option.id);
              return this.renderCheckbox(option, checked);
            })}
          </div>
          {response && this.renderPreviewBehavior()}
        </div>
      </div>
    );
  }
}

RequesterViewCheckbox.propTypes = {
  item: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default RequesterViewCheckbox;
