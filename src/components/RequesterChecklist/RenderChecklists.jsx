import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistTabs from './ChecklistTabs';
import ChecklistDetails from './ChecklistDetails';
import activeIcon from '../../images/icons/new-request-icons/icon.svg';
import './RenderChecklist.scss';
import TripDetails from './Trips/TripDetails';

class RenderChecklists extends Component {

  handleResponse = field => {
    const { handleSubmission, preview } = this.props;
    return data => !preview && handleSubmission({ field, data, isFieldArray: true });
  }

  render() {
    const { checklists, trips, tabIndex, onTabChange, isSubmitted, preview } = this.props;
    const activeChecklist = checklists.find((value, index) => index === tabIndex);

    return (
      <Fragment>
        <div className="checklist-tab-section">
          {checklists.map((checklist, index) => (
            <ChecklistTabs
              isActive={index === tabIndex}
              tripNum={index + 1}
              key={checklist.id}
              checklist={checklist}
              onTabClick={() => onTabChange(index)}
            />
          ))}
          <button
            type="button"
            onClick={() => onTabChange(checklists.length)}
            className={`tab-header ${!activeChecklist ? 'selected' : ''}`}
          >
            <div className="tab-header-text-wrapper">
              <span className="tab-header-text">
                FLIGHT DETAILS
              </span>
              {!activeChecklist && (<img className="active-icon" src={activeIcon} alt="active-icon" />)}
            </div>
            <p className="tab-header-name">Ticket Details</p>
          </button> 
        </div>
        <div className="line" />
        <div className="checklist-body-section">
          {activeChecklist && (
            <ChecklistDetails
              checklist={activeChecklist}
              handleResponse={this.handleResponse('checklists')}
              preview={preview}
            />
          )}
          {!activeChecklist && (
            <TripDetails
              trips={trips}
              handleTrips={this.handleResponse('trips')}
              preview={preview}
            />
          )}
          {isSubmitted && !preview && (<div className="disabled-checklist-overlay" />)}
        </div>
      </Fragment>
    );
  }
}

RenderChecklists.propTypes = {
  checklists: PropTypes.array.isRequired,
  handleSubmission: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  tabIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default RenderChecklists;
