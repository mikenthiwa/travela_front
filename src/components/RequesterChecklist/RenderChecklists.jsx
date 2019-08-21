import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistTabs from './ChecklistTabs';
import ChecklistDetails from './ChecklistDetails';
import activeIcon from '../../images/icons/new-request-icons/icon.svg';
import './RenderChecklist.scss';

class RenderChecklists extends Component {
  state = {
    tabIndex: 0,
    showFlightDetails: false,
  }

  onTabClick = tab => {
    this.setState({
      tabIndex: tab,
      showFlightDetails: false,
    });
  }

  onFlightDetailsTabClick = () => {
    this.setState({showFlightDetails: true });
  }

  render() {
    const { checklists, handleResponse } = this.props;
    const { tabIndex, showFlightDetails } = this.state;
    const activeChecklist = checklists.find((value, index) => index === tabIndex);
    return (
      <Fragment>
        <div className="checklist-tab-section">
          {checklists.map((checklist, index) => (
            <ChecklistTabs
              isActive={!showFlightDetails && index === tabIndex}
              tripNum={index + 1}
              key={checklist.id}
              checklist={checklist}
              onTabClick={() => this.onTabClick(index)}
            />
          ))}
          <button
            type="button"
            onClick={this.onFlightDetailsTabClick}
            className={`tab-header ${showFlightDetails ? 'selected' : ''}`}
          >
            <div className="tab-header-text-wrapper">
              <span className="tab-header-text">
                FLIGHT DETAILS
              </span>
              {showFlightDetails && (<img className="active-icon" src={activeIcon} alt="active-icon" />)}
            </div>
            <p className="tab-header-name">pending...</p>
          </button> 
        </div>
        <div className="line" />
        <div className="checklist-body-section">
          {activeChecklist && !showFlightDetails && (
            <ChecklistDetails
              checklist={activeChecklist}
              handleResponse={handleResponse}
            />
          )}
          {showFlightDetails && (<div> Flight Details Here!!! </div>
          )}
        </div> 
      </Fragment>
    );
  }
}

RenderChecklists.propTypes = {
  checklists: PropTypes.array.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default RenderChecklists;
