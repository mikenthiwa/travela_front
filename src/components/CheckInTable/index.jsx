import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withLoading from '../Hoc/withLoading';
import Utils from '../../helper/Utils';
import './CheckInTable.scss';

export class CheckInTable extends Component {

  handleCheck = (tripId, checkType) => {
    const { handleCheckStatus } = this.props;
    handleCheckStatus(tripId, checkType);

  }
  renderCheckIns(trip) {
    const { residenceClassName, dateToday } = this.props;
    const enforceCheckIn = (moment(dateToday) >= moment(trip.departureDate)) ? false : true;
    return (
      <tr key={trip.id} className="checkInTable__row">
        <td 
          className={`mdl-data-table__cell--non-numeric 
                    checkInTable__data__roomName ${residenceClassName}`}>
          {Utils.generateTripRoomName(trip)}
        </td>
        <td className={`mdl-data-table__cell--non-numeric 
                      checkInTable__data ${residenceClassName}`}>
          {Utils.generateTripDuration(trip)}
        </td>
        <td className="mdl-data-table__cell--non-numeric 
                        checkInTable__data__column table__button-column">
          {trip.checkStatus === 'Not Checked In' && (
            <button 
              id="btnCheck"
              className="checkInTable__button-checkin"
              disabled={enforceCheckIn}
              onClick={() => {this.handleCheck(trip.id, 'checkIn');}} type="button">
              Check-in
            </button>
          )} 
          {trip.checkStatus === 'Checked In' && (
            <button
              id="btnCheckOut"
              className="checkInTable__button-checkout"
              onClick={() => {this.handleCheck(trip.id, 'checkOut');}} type="button">
              Check-out
            </button>
          )}
          {trip.checkStatus === 'Checked Out' && (
            <button
              className="checkInTable__button-checkedout" type="button">
              Checked-out
            </button>
          )}
        </td>
      </tr>
    );
  }

  renderNoCheckIn(message) {
    return <div className="checkInTable__trips--empty">{message}</div>;
  }

  renderError(error) {
    return <div className="checkInTable__trips--error">{error}</div>;
  }
  render() {
    const { trips, tripError } = this.props;
    return (
      <Fragment>
        <div className="table__container table__resize padding-top checkInContainer">
          {tripError && this.renderError(tripError)}
          {trips &&
            trips.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table checkInTable__trips">
              <tbody className="table__body">
                {trips.map(trip => this.renderCheckIns(trip))}
              </tbody>
            </table>
          )}
          {!trips.length &&
            this.renderNoCheckIn('You have no check-in record yet, because you haven\'t booked a room in any of the Andela Guest Houses')}
        </div>
      </Fragment>
    );
  }
}

CheckInTable.propTypes = {
  trips: PropTypes.array,
  tripError: PropTypes.string,
  dateToday: PropTypes.string,
  handleCheckStatus: PropTypes.func.isRequired,
  residenceClassName: PropTypes.string
};

CheckInTable.defaultProps = {
  trips: [],
  tripError: '',
  dateToday: '',
  residenceClassName: ''
};

export default withLoading(CheckInTable);
