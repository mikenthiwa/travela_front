import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from '../../../CheckListWizard/ChecklistWizardPreview/PreviewRadio/Radio';
import ChecklistBehaviour from '../../ChecklistBehaviour/ChecklistBehaviour';
import './RequesterRadio.scss';

class RequesterRadio extends Component {

  handleCheckName = (option) => {
    const { handleResponse, item: { id } } = this.props;
    return () => {
      handleResponse({ id, selectedValue: option.id, behaviour: option.behaviour || {} });
    };
  }

  handleBehaviour = (behaviour) => {
    const { handleResponse, item: { response } } = this.props;
    handleResponse({ ...response, behaviour });
  }

  render() {
    const { item, preview } = this.props;
    const selectedOption = item.response && item.response.selectedValue;
    return (
      <React.Fragment>
        <div className="radio-grid-wrapper">
          <div className="radio-grid">
            {item.configuration.options.map(option => (
              <div className={`radio-option ${option.id === selectedOption ? 'selected' : ''}`} key={option.id}>
                <Radio 
                  option={option} 
                  handleCheckName={this.handleCheckName(option)}
                  checked={option.id === selectedOption}
                />
              </div>
            ))}
          </div>
        </div>
        {item.response && item.response.behaviour && (
          <ChecklistBehaviour
            behaviour={item.response.behaviour}
            handleBehaviour={this.handleBehaviour}
            preview={preview}
          />)
        }
      </React.Fragment>
    );
  }
}

RequesterRadio.propTypes = {
  item: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default RequesterRadio;
