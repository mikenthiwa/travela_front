import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChecklistItems from './ChecklistItems';
import './ChecklistDetails.scss';

class ChecklistDetails extends Component {
  render () {
    const { checklist: { config } } = this.props;
    return (
      <div className="checklist-details">
        <div className="tab-body">
          {config.length ? config.map(configuration => (
            <div className="prompt-wrapper" key={configuration.id}>
              <div className="prompt-number">
                <div className="checklist-number">{configuration.order}</div>
                <div className="checklist-prompt">{configuration.prompt}</div>
              </div>
              <div className="checklist-single-item">
                <ChecklistItems config={configuration} />
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
