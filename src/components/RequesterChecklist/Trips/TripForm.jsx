import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import './TripForm.scss';
import DateInput from './TripDate';
import TicketUpload from './TicketUpload';
import tripValidator from '../../../helper/TripValidator';

const addToDate = (time, value) => moment(time).add(value, 'hours').toISOString();

const generateFlightDetails = trip => {
  const returnFields = trip.request.tripType === 'return' ? {
    returnDepartureTime: trip.returnDate,
    returnArrivalTime: addToDate(trip.returnDate, 1),
    returnAirline: '',
    returnFlightNumber: '',
  } : {};
  return {
    departureTime: trip.departureDate,
    arrivalTime: addToDate(trip.departureDate || trip.returnDate, 1),
    flightNumber: '',
    airline: '',
    ticket: '',
    ...returnFields
  };
};
class TripForm extends Component {
  
  state = { touched: [], errors: {} };

  componentDidMount () {
    const { trip } = this.props;
    const flightDetails = trip.flightDetails || generateFlightDetails(trip);
    !trip.flightDetails && this.validateAndSubmit({ ...trip, flightDetails });
  }

  validateAndSubmit = trip => {
    const { handleTrips } = this.props;
    let errors;
    try {
      tripValidator(trip).validateSync(trip.flightDetails, { abortEarly: false });
      errors = {};
    } catch (error) {
      errors = error.inner.reduce((prev, curr) => ({ ...prev, [curr.path]: curr.message }), {});
    } finally {
      this.setState({ errors });
      handleTrips(trip);
    }
  }

  handleBlur = e => {
    const { touched } = this.state;
    this.setState({ touched: [...touched, e.target.name]});
  }

  handleInputChange = event => {
    const { trip } = this.props;
    const flightDetails = { ...trip.flightDetails, [event.target.name]: event.target.value };
    this.validateAndSubmit({...trip, flightDetails });
  };

  handleTicketUpload = ticket => {
    const { trip } = this.props;
    const flightDetails = { ...trip.flightDetails, ticket };
    this.validateAndSubmit({ ...trip, flightDetails });
  }

  renderDateTimeInput = (label, name, value, min, max) => {
    const { errors, touched } = this.state;
    const { preview } = this.props;
    const handleChange = date => this.handleInputChange({ target: { name, value: date.toDate().toISOString() } });
    const handleBlur = () => this.handleBlur({ target: { name } });
    return (
      <div className="ticketInput form-input">
        <label htmlFor={name}>{label}</label>
        <DateInput
          onBlur={handleBlur}
          onChange={handleChange}
          showTimeSelect
          name={name}
          value={value}
          minimumDate={min !== 'Invalid date' ? moment(min) : null}
          maximumDate={max !== 'Invalid date' ? moment(max) : null}
          dateFormat="MMMM DD, YYYY hh:mm A"
          timeFormat="hh:mm A"
          disabled={preview}
        />
        {touched.includes(name) && (<div className="error-div"><span className="error">{errors[name]}</span></div>)}
      </div>
    );
  };

  renderTicketInput = (type, name, label, value) => {
    const { errors, touched } = this.state;
    const { preview } = this.props;
    return (
      <div className="ticketInput form-input">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          placeholder={label}
          className={name}
          value={value}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
          required
          disabled={preview}
        />
        {touched.includes(name) && (<div className="error-div"><span className="error">{errors[name]}</span></div>)}
      </div>
    );
  };

  renderReturnDetailsFields = () => {
    const { trip } = this.props;
    const {
      returnDepartureTime,
      returnArrivalTime,
      returnFlightNumber,
      returnAirline,
      arrivalTime,
    } = trip.flightDetails;

    return(
      <Fragment>
        {this.renderDateTimeInput(
          'Return Departure Time',
          'returnDepartureTime',
          returnDepartureTime,
          moment(arrivalTime || trip.returnDate).add(30, 'minutes'),
          null,
        )}
        {this.renderDateTimeInput(
          'Return Arrival Time',
          'returnArrivalTime',
          returnArrivalTime,
          moment(returnDepartureTime || trip.returnDate).add(30, 'minutes'),
          null
        )}
        {this.renderTicketInput('text','returnFlightNumber','Return Flight Number', returnFlightNumber)}
        {this.renderTicketInput('text', 'returnAirline', 'Return Airline', returnAirline)}
      </Fragment>
    );
    
  }

  renderTicketForm = () => {
    const { trip, preview } = this.props;
    if (!trip.flightDetails) return null;
    const {
      departureTime,
      arrivalTime,
      flightNumber,
      airline,
      ticket,
    } = trip.flightDetails;
  
    return (
      <div className="trip-details-form">
        <div className="flight-ticket-details">
          <form className="ticket-form">
            {this.renderDateTimeInput(
              'Departure Time',
              'departureTime',
              departureTime,
              trip.departureDate,
              trip.returnDate
            )}
            {this.renderDateTimeInput(
              'Arrival Time',
              'arrivalTime',
              arrivalTime,
              moment(departureTime || trip.departureDate).add(30, 'minutes'),
              moment(trip.returnDate).add(1, 'days'),
            )}
            {this.renderTicketInput('text','flightNumber','Flight Number', flightNumber)}
            {this.renderTicketInput('text', 'airline', 'Airline', airline)}
            {trip.request.tripType === 'return' && this.renderReturnDetailsFields()}
            <TicketUpload 
              id={trip.id}
              ticket={ticket}
              handleTicketUpload={this.handleTicketUpload}
              preview={preview}
            />
          </form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderTicketForm()}
      </Fragment>
    );
  }
}

TripForm.propTypes = {
  handleTrips: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default TripForm;
