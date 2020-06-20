import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import DateInput from '../../../Forms/FormsAPI/Input/InputFields/Date';
import FileUploadField from '../FileUploadField/index';

class FlightDetailsForm extends Component {
  state = {
    departureTime: '',
    arrivalTime: '',
    flightNumber: '',
    airline: '',
    error: {travelError: '', returnError: ''},
    returnDepartureTime: '',
    returnArrivalTime: '',
    returnAirline: '',
    returnFlightNumber: ''
  };

  componentDidMount = () => {
    const {
      checklist: {
        ticketDetails: {
          submissions: [item]
        }
      }
    } = this.props;
    if (item) {
      const { departureTime, arrivalTime, flightNumber, airline,returnDepartureTime,
        returnArrivalTime, returnAirline, returnFlightNumber
      } = item.userUpload;
      this.setState({
        departureTime, arrivalTime, flightNumber, airline, returnDepartureTime,
        returnArrivalTime, returnAirline, returnFlightNumber
      });
    }
  };

  validateDates = (arrivalTime, departureTime, errorType) => {
    let isValid = (arrivalTime && departureTime && arrivalTime > departureTime);
    this.setState(prevState => ({
      error: {
        ...prevState.error,
        [errorType]: isValid ? '' : 'Arrival Time should be greater than Departure time'
      }
    }));
    return isValid;
  };

  validateDate = () => {
    const { tripType } = this.props;
    const {departureTime, arrivalTime, returnDepartureTime, returnArrivalTime} = this.state;
    let result = this.validateDates(arrivalTime, departureTime, 'travelError');
    if( tripType === 'return' && (returnArrivalTime && returnDepartureTime)){
      result &= this.validateDates(returnArrivalTime, returnDepartureTime, 'returnError');
    }
    return result;
  };

  submitFlightDetails = () => {
    const {
      departureTime, arrivalTime, airline, flightNumber, returnDepartureTime,
      returnArrivalTime, returnAirline, returnFlightNumber
    } = this.state;
    const {tripId, checklist: { ticketDetails: { id }}, request, postSubmission
    } = this.props;
    const checkId = `${tripId}-${id}`;
    const file = _.pickBy({ departureTime, arrivalTime, airline, flightNumber, returnDepartureTime,
      returnArrivalTime, returnAirline, returnFlightNumber}, _.identity);  
    const formData = { tripId, file };
    postSubmission({ formData, checklistItemId: id }, checkId, request.id);
  };

  handleFlightDetailsSubmit = () => {
    this.validateDate() && this.submitFlightDetails();
  };

  handleDateInputChange = (date, name) => {
    this.setState({
      [name]: this.formatDateTime(date)
    }, this.validateDate);
  };

  handleTextInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  formatDateTime = date => moment(date).format('YYYY-MM-DDTHH:mm');

  renderDateTimeInput = (label, name, tripId, value, min, max) => {
    return (
      <div className="ticketInput form-input">
        <label htmlFor={name}>{label}</label>
        <DateInput
          onBlur={this.handleFlightDetailsSubmit}
          onChange={date => this.handleDateInputChange(date, name)}
          onChangeRaw={date => this.handleDateInputChange(date, name)}
          showTimeSelect
          name={name}
          minimumDate={min !== 'Invalid date' ? moment(min) : null}
          maximumDate={max !== 'Invalid date' ? moment(max) : null}
          dateFormat="MMMM DD, YYYY hh:mm A"
          timeFormat="hh:mm A"
          value={value ? moment(value) : null}
        />
      </div>
    );
  };

  renderTicketInput = (type, name, label, value) => {
    return (
      <div className="ticketInput form-input">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          placeholder={label}
          className={name}
          value={value}
          onChange={this.handleTextInputChange}
          onBlur={this.handleFlightDetailsSubmit}
          required
        />
      </div>
    );
  };

  renderIsUploading = () => {
    const {
      fileUploads: { isUploading },
      checkId
    } = this.props;
    return (
      <div className="loader-file">
        {isUploading && isUploading.match(checkId) && (
          <div className="submission-progresbar">
            <div className="submission-progress__spinner" />
            <div id="submission-progress" className="submission-progress__">
              Submitting....
            </div>
          </div>
        )}
      </div>
    );
  };

  renderReturnDetailsFields = () => {
    const { 
      returnDepartureTime, returnArrivalTime, returnFlightNumber,
      returnAirline ,error
    } = this.state;
    const { tripId, trip } = this.props;
    return(
      <div className="return-form">
        {this.renderDateTimeInput(
          'Return Departure Time', 'returnDepartureTime',
          tripId, returnDepartureTime, this.formatDateTime(trip.returnDate),
          this.formatDateTime(trip.returnDate))}
        {this.renderDateTimeInput(
          'Return Arrival Time', 'returnArrivalTime',
          tripId, returnArrivalTime, this.formatDateTime(moment(trip.returnDate).add(1, 'hours')),
          this.formatDateTime(moment(trip.returnDate).add(1, 'days')))}
        <div className="error-div"><span className="error">{error.returnError}</span></div>
        {this.renderTicketInput(
          'text','returnFlightNumber','Return Flight Number', returnFlightNumber)}
        {this.renderTicketInput(
          'text', 'returnAirline', 'Return Airline', returnAirline)}
      </div>
    );
    
  }

  renderTicketForm = () => {
    const {
      departureTime,
      arrivalTime,
      flightNumber,
      airline,
      error
    } = this.state;

    const {
      uploadFile, request, downloadAttachments, fileUploads, postSubmission,
      tripId, trip, checklist, counter, checkId, tripType
    } = this.props;
    return (
      <div className="main-div">
        <div className="main-ticket-heading">
          <div className="trip-number">
            <span className="counter">{counter}</span>
          </div>
          <div className="form-title">
            {`Flight ${counter} - `}
            {`${trip.origin.split(', ')[1]} to ${
              trip.destination.split(', ')[1]
            }`}
          </div>
        </div>
        <div className="flight-ticket-details">
          <form className="ticketForm">
            {this.renderDateTimeInput(
              'Departure Time',
              'departureTime',
              tripId,
              departureTime,
              this.formatDateTime(trip.departureDate),
              this.formatDateTime(trip.returnDate)
            )}
            {this.renderDateTimeInput(
              'Arrival Time',
              'arrivalTime',
              tripId,
              arrivalTime,
              this.formatDateTime(trip.departureDate),
              this.formatDateTime(trip.returnDate)
            )}
            <div className="error-div"><span className="error">{error.travelError}</span></div>
            {this.renderTicketInput('text','flightNumber','Flight Number', flightNumber)}
            {this.renderTicketInput('text', 'airline', 'Airline', airline)}
            
            {tripType === 'return' && this.renderReturnDetailsFields()}
          </form>
          
          <div className="file-upload">
            <FileUploadField
              uploadFile={uploadFile}
              checklistItem={checklist['ticket']}
              tripId={tripId}
              requestId={request.id}
              itemType="travelTicket"
              downloadAttachments={downloadAttachments}
              fileUploads={fileUploads}
              checkId={checkId}
              postSubmission={postSubmission}
            />
            {this.renderIsUploading()}
          </div>
        </div>
      </div>
    );
  };

  renderBreakLine = () => {
    const { counter } = this.props;
    return counter > 1 && <hr />;
  };

  render() {
    return (
      <div>
        {this.renderBreakLine()}
        {this.renderTicketForm()}
      </div>
    );
  }
}

FlightDetailsForm.defaultProps = {
  counter: 1
};

FlightDetailsForm.propTypes = {
  tripId: PropTypes.string.isRequired,
  checklist: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  postSubmission: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  fileUploads: PropTypes.func.isRequired,
  counter: PropTypes.number,
  checkId: PropTypes.string.isRequired,
  tripType: PropTypes.string.isRequired
};

export default FlightDetailsForm;
