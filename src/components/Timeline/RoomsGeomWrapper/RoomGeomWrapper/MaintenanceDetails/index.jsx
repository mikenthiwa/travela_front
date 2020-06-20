import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import '../../TripGeometry/TripGeometry.scss';

export default class MaintenanceDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      reason: ''
    };
  }
  
  static getDerivedStateFromProps(prevProps) {
    const { maintenance } = prevProps;
    const { departureDate, returnDate, reason } = maintenance;
    return { start: departureDate, end: returnDate, reason: reason };
  }

  handleClickMaintenanceDetailsBody = (e) => {
    e.stopPropagation();
  }

  handleCloseDetailsButton = () => {
    const {toggleBookingDetails} = this.props;
    toggleBookingDetails('close');
  }

  renderMaintenanceDetailsHeader = () => {
    return (
      <div className="trip-booking-details__header">
        <span>Maintenance</span>
        <div
          tabIndex="-1"
          role="presentation"
          onKeyUp={()=>{}}
          className="close-button"
          onClick={this.handleCloseDetailsButton}
        >
          <div>&times;</div>
        </div>
      </div>
    );
  }

  renderMaintenanceDetailsBody = () => {
    const { maintenance, handleEditMaintenanceModal, handleDeleteMaintenanceModal } = this.props;
    const startDate = maintenance.start
      ? moment(maintenance.start, 'YYYY-MM-DD').format('DD MMM YYYY')
      : 'n/a';
    const endDate = maintenance.end
      ? moment(maintenance.end, 'YYYY-MM-DD').format('DD MMM YYYY')
      : 'n/a';  
    return (
      <div className="trip-booking-details__body">
        <div>
          <span>Start: </span>
          <span>{startDate}</span>
        </div>
        <div>
          <span>End:</span>
          <span>{endDate}</span>
        </div>
        {
          (moment(maintenance.end).unix() >= moment(new Date()).unix()) && (
            <div>
              <span>
                <button
                  type="button"
                  className="trip-booking-details__button"
                  onClick={() => handleEditMaintenanceModal(maintenance)}
                  style={{ width: '60px'}}
                >
            Edit
                </button>
              </span>
              <span>
                <button
                  type="button"
                  className="trip-booking-details__button"
                  onClick={() => handleDeleteMaintenanceModal(maintenance)}
                  style={{ width: '60px', backgroundColor: 'rgb(255, 83, 89)'}}
                >
            Delete
                </button>
              </span>
            </div>
          )}
      </div>
    );
  }

  determineTranslateClass = () => {
    const { translateDetailsLeft } = this.props;
    return translateDetailsLeft ? 'translateX' : '';
  }

  render() {
    const { bookingDetailsPos, detailsVariantClass } = this.props;
    const translateClass = this.determineTranslateClass();
    return (
      <div
        className={`trip-booking-details details-${detailsVariantClass} ${translateClass}`}
        onClick={this.handleClickMaintenanceDetailsBody}
        role="presentation"
        id="trip-booking-details"
        style={{
          position: 'absolute',
          left: `${bookingDetailsPos}px`,
        }}
      >
        {this.renderMaintenanceDetailsHeader()}
        {this.renderMaintenanceDetailsBody(this.state)}
      </div>
    );
  }
}

MaintenanceDetails.propTypes = {
  maintenance: PropTypes.object.isRequired,
  bookingDetailsPos: PropTypes.number,
  detailsVariantClass: PropTypes.string,
  toggleBookingDetails: PropTypes.func.isRequired,
  translateDetailsLeft: PropTypes.bool,
  handleEditMaintenanceModal: PropTypes.func.isRequired,
  handleDeleteMaintenanceModal: PropTypes.func.isRequired
};

MaintenanceDetails.defaultProps = {
  bookingDetailsPos: 0,
  detailsVariantClass: 'hidden',
  translateDetailsLeft: false
};
