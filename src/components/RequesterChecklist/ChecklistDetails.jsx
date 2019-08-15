import React, { Component } from 'react';
import toast from 'toastr';
import PropTypes from 'prop-types';
import ChecklistItems from './ChecklistItems';
import './ChecklistDetails.scss';

class ChecklistDetails extends Component {

  constructor(props) {
    super(props);
    const { checklist: { config } } = this.props;
    this.state = {
      config,
    };
  }
  
  handleSkipToQuestion = (id, isDisabled) => {
    const { config } = this.state;
    const index = config.findIndex(item => item.id === id) + 1;
    const newConfig = config.map((item, checklistIndex) => checklistIndex === index ? { ...item, isDisabled } : item);
    this.setState({ config: newConfig });
  };
  
  render() {
    const { config } = this.state;
    const filteredConfig = config.length && config.filter(item => !item.isDisabled);
    return (
      <div className="checklist-details">
        <div className="tab-body">
          {config.length ? filteredConfig.map((configuration, index) => (
            <div className="prompt-wrapper" key={configuration.id}>
              <div className="prompt-number">
                <div className="checklist-number">{index + 1}</div>
                <div className="checklist-prompt">{configuration.prompt}</div>
              </div>
              <div className="checklist-single-item">
                <ChecklistItems 
                  config={configuration}
                  handleSkipToQuestion={this.handleSkipToQuestion}
                />
              </div>
            </div>
          )) : <div>No checklist for this trip</div>} 
        </div>
      </div>
    );
  }
}

ChecklistDetails.propTypes = {
  checklist: PropTypes.object.isRequired,
};

export default ChecklistDetails;
