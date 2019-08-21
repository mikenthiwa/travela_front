import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistItems from './ChecklistItems';
import './ChecklistDetails.scss';

class ChecklistDetails extends Component {

  state = {
    disabledIndex: -1,
  }

  handleSkipToQuestion = (id) => {
    const { checklist: { config } } = this.props;
    const index = config.findIndex(item => item.id === id) + 1;
    this.setState({ disabledIndex: index });
  };
  
  render() {
    const { checklist: { config }, handleResponse } = this.props;
    const { disabledIndex } = this.state;
    const filteredConfig = config.filter((item, index) => index!== disabledIndex);
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
                  handleResponse={handleResponse}
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
  handleResponse: PropTypes.func.isRequired,
};

export default ChecklistDetails;
