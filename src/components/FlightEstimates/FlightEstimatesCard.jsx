import React from 'react';
import '../TravelStipends/TravelStipends.scss';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';

const handleAction = (action, id, openModal, fetchSingleFlightEstimate) => {
  (action === 'edit') && openModal(true, 'edit flight estimate');
  (action === 'delete') && openModal(true, 'Delete flight estimate');
  fetchSingleFlightEstimate(id);
};

export const FlightEstimateCard = ({
  originCountry, originRegion,
  destinationCountry, destinationRegion, 
  flightEstimate, openModal, id, fetchSingleFlightEstimate}) => {
    
  const displayOrigin = originCountry || originRegion;
  const displayDestination = destinationCountry || destinationRegion;
  return  (
    <div className="card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--3-col-phone">
      <div className="travel_stipend_menu">
        <ContextMenu classNames="table__menu-container">
          <MenuItem
            classNames="edit"
            onClick={
              () => handleAction('edit', 
                id, openModal, fetchSingleFlightEstimate)
            }>
            Edit
          </MenuItem>
          <MenuItem
            classNames="delete"
            onClick={
              () => handleAction('delete', 
                id, openModal, fetchSingleFlightEstimate)
            }>
            Delete
          </MenuItem>
        </ContextMenu>
      </div>
      <div className="card_title">
        {displayOrigin}
        {' to '}
        {displayDestination}
        {' '}
      </div>
      <div className="card_stipend">
        &#36;
        {flightEstimate}
        {' '}
      </div>
      <p className="card_p">Flight Estimate</p>
    </div>
  );

};

export const FlightEstimateCards = (
  { flightEstimates, openModal,fetchSingleFlightEstimate }
) => {
  return(
    
    <div className="stipend-list mdl-grid">
      {
        flightEstimates.map(estimate => {
          return (
            <FlightEstimateCard
              key={estimate.id}
              id={estimate.id}
              originCountry={estimate.originCountry}
              destinationCountry={estimate.destinationCountry}
              originRegion={estimate.originRegion}
              destinationRegion={estimate.destinationRegion}
              flightEstimate={estimate.amount}
              openModal={openModal}
              fetchSingleFlightEstimate={fetchSingleFlightEstimate}
            />
          );
        })
      }
    </div>
  );
};

FlightEstimateCard.propTypes = {
  originCountry: PropTypes.string,
  destinationCountry: PropTypes.string,
  originRegion: PropTypes.string,
  destinationRegion: PropTypes.string,
  fetchSingleFlightEstimate: PropTypes.func.isRequired,
  flightEstimate: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

FlightEstimateCards.propTypes = {
  flightEstimates: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchSingleFlightEstimate: PropTypes.func.isRequired,
};

FlightEstimateCard.defaultProps = {
  originCountry: '',
  destinationCountry: '',
  originRegion: '',
  destinationRegion: ''
};

export default withLoading(FlightEstimateCards, RequestPlaceholder);
