import React from 'react';
import PropTypes from 'prop-types';
import '../ChecklistDetails.scss';
import TripForm from './TripForm';

const TripDetails = ({ trips, handleTrips, preview }) => (
  <div className="checklist-details">
    <div className="tab-body">
      {trips.map((trip, index) => (
        <div className="prompt-wrapper" key={trip.id}>
          <div className="prompt-number">
            <div className="checklist-number">{index + 1}</div>
            <div className="checklist-prompt">
              {`Flight ${index + 1} - ${trip.origin} to ${trip.destination}`}
            </div>
          </div>
          <div className="checklist-single-item">
            <TripForm
              trip={trip}
              handleTrips={handleTrips}
              preview={preview}
            />
          </div>
        </div>
      ))} 
    </div>
  </div>
);

TripDetails.propTypes = {
  trips: PropTypes.array.isRequired,
  handleTrips: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default TripDetails;
