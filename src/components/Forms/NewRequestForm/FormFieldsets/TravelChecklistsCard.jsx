import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../../Preloader/Preloader';
import RequestUtils from '../../../../helper/request/RequestUtils';
import countryUtils from '../../../../helper/countryUtils';

class TravelChecklistsCard extends Component {
  componentDidMount() {
    const { fetchTravelChecklist, trips } = this.props;
    const tripDestinations = {};
    trips.map(trip => {
      tripDestinations[trip.destination.split(', ')[1]] = trip.destination;
    });
    fetchTravelChecklist(null, Object.keys(tripDestinations));
  }
  displayTravelChecklist(checklistItems) {
    return (
      <li className="approval-item" key={checklistItems.name}> 
        <div className="oval" />
        <div className="checklist-name">{checklistItems.name}</div>
      </li>
    );
  }

  render() {
    const { checklistItems, trips, isLoading, userData } = this.props;
    const allChecklistItems = RequestUtils.getDefaultChecklist(checklistItems, trips);
    const newChecklist = RequestUtils.removeLocationChecklist(allChecklistItems, userData);
    return (
      <div className="mdl-cell mdl-cell--7-col mdl-cell--12-col-tablet mdl-cell--12-phone">
        <div className="travel-checklist-rectangle">
          <div className="travel-checklist-text">
            <p> These are the checklist items that you will be required to submit for this trip </p> 
          </div>
          <hr className="travel-checklist-line" />        
          {isLoading
            ? <Preloader /> :  (
              <div className="pending-approvals-block">
                {newChecklist.map(checklist => {
                  const { checklist: checklistItems } = checklist;
                  return (
                    <Fragment key={checklist.destinationName}>
                      <div className="travel-checklist-loc-title">
                        <div className="destination checklist-destination">
                          <span className="country-flag checklist-flag">
                            <img
                              className="flag"
                              src={countryUtils.getCountryFlagUrl(checklist.destinationName)}
                              alt="country flag" />
                          </span>
                          <p>
                            {checklist.destinationName}
                          </p>
                        </div>
                      </div>
                      <ul className="approval-list-items">
                        {checklistItems.map(item => 
                          this.displayTravelChecklist(item)
                        )}
                      </ul>
                    </Fragment>);
                })}
              </div>
            )}
        </div>
      </div>
    );
  }
}
TravelChecklistsCard.propTypes = {
  checklistItems: PropTypes.array,
  fetchTravelChecklist: PropTypes.func,
  trips: PropTypes.array,
  isLoading: PropTypes.bool,
  userData: PropTypes.object
};
TravelChecklistsCard.defaultProps = {
  checklistItems: [],
  fetchTravelChecklist: () => {},
  isLoading: false,
  trips: [{}],
  userData: {}
};
export default TravelChecklistsCard;
