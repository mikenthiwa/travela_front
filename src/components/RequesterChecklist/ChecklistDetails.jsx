import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistItems from './checklistItems';
import './ChecklistDetails.scss';

class ChecklistDetails extends Component {

  handleChecklistResponse = response => {
    const { checklist, handleResponse } = this.props;
    const config = checklist.config.map(item => item.id === response.id ? { ...item, response } : item);
    handleResponse({ ...checklist, config });
  }
  
  render() {
    const { checklist: { config }, preview } = this.props;
    return (
      <div className="checklist-details">
        <div className="tab-body">
          {config.length ? config.map((configuration, index) => (
            <div className="prompt-wrapper" key={configuration.id}>
              <div className="prompt-number">
                <div className="checklist-number">{index + 1}</div>
                <div className="checklist-prompt">{configuration.prompt}</div>
              </div>
              <div className="checklist-single-item">
                <ChecklistItems 
                  config={configuration}
                  handleResponse={this.handleChecklistResponse}
                  preview={preview}
                />
              </div>
              {configuration.notApplicable && (<div className="disabled-checklist-wrapper" />)}
            </div>
          )) : <div>No checklist for this trip</div>}

        </div>
      </div>
    );
  }
}

ChecklistDetails.propTypes = {
  checklist: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default ChecklistDetails;
