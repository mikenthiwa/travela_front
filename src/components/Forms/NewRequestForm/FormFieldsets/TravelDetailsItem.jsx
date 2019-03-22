import React, { Component, Fragment } from 'react';
import Moment from 'moment';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import location from '../../../../images/location.svg';
import deleteBtn from '../../../../images/icons/new-request-icons/deleteBtn.svg';

class TravelDetailsItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      choices: [],
      bedOnEdit: null,
      gender: null,
      trip: null,
      missingRequiredFields: true,
      accommodationType: null
    };
  }

 
  componentDidMount() {
    const { itemId, editing, requestOnEdit, values } = this.props;
    this.loadState(requestOnEdit, itemId, editing, values);
  }

  componentWillReceiveProps(nextProps) {
    const { itemId, selection, availableRooms, values, editing } = nextProps;
    const rowId = availableRooms.rowId || 0;
    if (rowId === itemId) {
      this.setBedChoices(editing, values, availableRooms.beds);
    }
    this.validateTripDetails(values, itemId, selection);
  }


  validateTripRecord = (values, itemId) => {
    const { trip, gender } = this.state;
    const origin = trip.origin === values[`origin-${itemId}`];
    const destination = trip.destination === values[`destination-${itemId}`];
    const departureDate = Moment(values[`departureDate-${itemId}`]).isSame(
      trip.departureDate
    );
    const arrivalDate = Moment(values[`arrivalDate-${itemId}`]).isSame(
      trip.returnDate
    );
    const genderCheck = values.gender === gender;
    return (
      (origin && destination && departureDate && genderCheck) || arrivalDate
    );
  };

  getRawBedChoices = (editing, values, beds) => {
    const { bedOnEdit, itemId } = this.state;
    let bedChoices = [...beds];
    if (editing && bedOnEdit) {
      if (this.validateTripRecord(values, itemId)) {
        bedChoices = [bedOnEdit, ...beds];
      }
    }
    return bedChoices;
  };

  loadState = (request = [], itemId, editing, values) => {
    const trip = request.trips && request.trips[itemId];
    const pendingState = { itemId };
    if (trip && editing) {
      pendingState.bedOnEdit = trip.beds;
      pendingState.trip = { ...trip };
      pendingState.gender = request.gender;
      pendingState.missingRequiredFields = false;
      pendingState.accommodationType = trip.accommodationType;
    }
    this.setState({ ...pendingState }, () =>
      this.setBedChoices(editing, values, [])
    );
  };

  setValues = (values, itemId, id, editing) => {
    if (editing) {
      values[`bed-${itemId}`] = values[`bed-${itemId}`] || id || null;
    }
  };

  setBedChoices = (editing, values, beds) => {
    const { itemId, selection } = this.props;
    const { accommodationType } = this.state;
    let bedChoices = this.getRawBedChoices(editing, values, beds);
    if (bedChoices.length < 1) {
      switch (accommodationType) {
      case 'Hotel Booking':
        this.setValues(values, itemId, -1, editing);
        bedChoices.unshift({ label: 'Hotel Booking', value: -1 });
        bedChoices.unshift({ label: 'Not Required', value: -2 });
        break;
      case 'Not Required':
        this.setValues(values, itemId, -2, editing);
        bedChoices.unshift({ label: 'Not Required', value: -2 });
        bedChoices.unshift({ label: 'Hotel Booking', value: -1 });
        break;
      default:
        bedChoices.unshift({ label: 'Not Required', value: -2 });
        bedChoices.unshift({ label: 'Hotel Booking', value: -1 });
        break;
      }
    } else {
      bedChoices = bedChoices.map(choice => {
        this.setValues(values, itemId, choice.id, editing);
        return {
          label: `${choice.rooms.roomName}, ${choice.bedName}`,
          value: choice.id
        };
      });
      bedChoices.unshift({ label: 'Not Required', value: -2 });
      bedChoices.push({ label: 'Hotel Booking', value: -1 });
    }
    this.setState({ choices: bedChoices });
  };

  handleChangeInput = event => {
    const { onChangeInput, handlePickBed, selection, values } = this.props;
    const { itemId } = this.state;
    onChangeInput(event);
    if (selection !== 'oneWay') {
      this.validateTripDetails(values, itemId, selection);
      handlePickBed(null, itemId, false);
    }
  };

  handleDate = (date, event) => {
    const { handleDate, handlePickBed, selection, values } = this.props;
    const { itemId } = this.state;
    handleDate(date, event);
    if (selection !== 'oneWay') {
      this.validateTripDetails(values, itemId, selection);
      handlePickBed(null, itemId, false);
    }
  };

  renderLocation = locationType => {
    const { itemId, renderInput } = this.props;
    return (
      <div className="travel-to" onChange={this.handleChangeInput}>
        {renderInput(`${locationType}-${itemId}`, 'text', { parentid: itemId })}
        <img src={location} alt="icn" className="location-icon" />
      </div>
    );
  };

  renderDeparture = () => {
    const {
      itemId,
      values,
      renderInput,
      customPropsForDeparture,
      selection
    } = this.props;
    return (
      <div className="others-width" role="presentation">
        {renderInput(`departureDate-${itemId}`, 'date', {
          ...customPropsForDeparture(values),
          parentid: itemId,
          handleDate: this.handleDate,
          onChange: this.handleDate,
          selection
        })}
      </div>
    );
  };

  renderArrival = () => {
    const {
      itemId,
      values,
      renderInput,
      customPropsForArrival,
      selection,
      parentIds
    } = this.props;
    if (selection === 'multi' && itemId === parentIds - 1) {
      delete values[`arrivalDate-${parentIds - 1}`];
      return null;
    }
    return(
      <div className="others-width" role="presentation">
        {renderInput(`arrivalDate-${itemId}`, 'date', {
          ...customPropsForArrival(values, `departureDate-${itemId}`),
          parentid: itemId,
          handleDate: this.handleDate,
          onChange: this.handleDate,
          selection
        })}
      </div>
    );
  };

  renderBedDropdown = () => {
    const {
      itemId,
      selection,
      values,
      handlePickBed,
      availableRooms,
      renderInput,
      fetchRoomsOnFocus
    } = this.props;

    const { choices, missingRequiredFields } = this.state;
    return (
      <div className="travel-to bed__option">
        {availableRooms.isLoading && availableRooms.rowId === itemId ? (
          <div className="travel-input-area__spinner" />
        ) : null}
        {selection === 'multi' &&
        values['origin-0'] === values[`destination-${itemId}`] &&
        values['origin-0'].trim() !== '' ? (
            missingRequiredFields ? (
              <div>
                {renderInput(`bed-${itemId}`, 'text', {
                  className: 'room-dropdown',
                  placeholder: 'Not Required',
                  disabled: false,
                  choices: []
                })}
                <img
                  style={{ top: '43px', position: 'absolute', right: '15px' }}
                  src="/static/media/form_select_dropdown.d19986d7.svg"
                  alt="icon"
                />
              </div>
            ) : (
              renderInput(`bed-${itemId}`, 'dropdown-select', {
                className: 'room-dropdown',
                parentid: itemId,
                size: '100%',
                choices: choices,
                onChange: value => handlePickBed(value, itemId),
                onFocus: () => fetchRoomsOnFocus(values, itemId, selection)
              })
            )
          ) : missingRequiredFields ? (
            <div>
              {renderInput(`bed-${itemId}`, 'text', {
                value: '',
                className: 'room-dropdown',
                placeholder: 'Select Accomodation',
                disabled: missingRequiredFields
              })}
              <img
                style={{ top: '43px', position: 'absolute', right: '15px' }}
                src="/static/media/form_select_dropdown.d19986d7.svg"
                alt="icon"
              />
            </div>
          ) : (
            renderInput(`bed-${itemId}`, 'dropdown-select', {
              className: 'room-dropdown',
              parentid: itemId,
              size: '100%',
              choices: choices,
              onChange: value => handlePickBed(value, itemId),
              onFocus: () => fetchRoomsOnFocus(values, itemId, selection)
            })
          )}
      </div>
    );
  };

  renderTravelReasons = () => {
    const {
      itemId,
      selection,
      values,
      renderInput,
      handleReason,
      listTravelReasons,
    } = this.props;
    const reasonChoices = (reasons) => {
      const reasonsList = ['Other..'];
      if(reasons) {
        reasons.map((reason) => {
          reasonsList.push(reason.title);
        });
      }
      return reasonsList;
    };

    return (
      <div className="travel-to reasons__option">
        {renderInput(`reasons-${itemId}`, 'dropdown-select', {
          className: 'reasons__dropdown',
          placeholder: 'Select Reason',
          parentid: itemId,
          size: '100%',
          choices: reasonChoices(listTravelReasons.travelReasons),
          onChange: value => handleReason(value, itemId, null),
        })}

      </div>
    );
  };

  renderOtherTravelReasons =()=>{
    const{ itemId,
      selection,
      values,
      renderInput,
      handleReason,
      listTravelReasons,
      editing
    } = this.props;
    const { travelReasons } = listTravelReasons;
    const isThere = _.find(travelReasons, {
      title: values[`reasons-${itemId}`]
    });
    const reason = !isThere && editing ? 'Other..' : values[`reasons-${itemId}`];
    const characters = values[`otherReasons-${itemId}`];
    let charLength = characters ? characters.trim().length : '';
    let reasonsLimit =  reasonsWarningColor(charLength, 140);

    return (
      <div className="other__reason" onChange={typedReason => handleReason(typedReason.target.value, itemId, 'other')}>
        { reason === 'Other..' ? (
          <Fragment>
            <div style={{ display: 'none' }}>{ values[`otherReasons-${itemId}`]  = '' || characters }</div>
            {renderInput(`otherReasons-${itemId}`, 'textarea', {
              maxLength:'140',
              rows:'20',
              parentid: itemId,
            })}
            <div className="character__conditions" style={{ color: `${reasonsLimit.color}`, top: `${reasonsLimit.top}` }}>
              {reasonsLimit.charLeft}
            </div>
          </Fragment>)
          : ''
        }
      </div>
    );
  }

  validateTripDetails(values, i, selection) {
    const isValid =
    values.gender &&
    values[`destination-${i}`] &&
    values[`departureDate-${i}`] &&
    values[`reasons-${i}`];

    if (isValid && selection === 'oneWay') {
      this.setState({ missingRequiredFields: false });
    }

    if (isValid && values[`arrivalDate-${i}`]) {
      this.setState({ missingRequiredFields: false });
    }

    if (isValid && selection === 'multi' && values[`arrivalDate-${i-1}`]) {
      this.setState({ missingRequiredFields: false });
    }
  }


  renderTravelHead(itemId, selection) {
    return (
      <Fragment>
        {selection === 'multi' ? (
          <div className="trip-heading-rectangle">
            Trip
            {` ${itemId + 1}`}
            <div className="trip-heading-line" />
          </div>
        ) : null}
      </Fragment>
    );
  }

  render() {
    const { itemId, selection, removeTrip, values } = this.props;
    const { 'reasons-0': reason } = values;
    return (
      <Fragment>
        <div className="travel-input-area">
          <div className="input-group" id={`trip${itemId}`}>
            {this.renderTravelHead(itemId, selection)}
            <div className={`rectangle ${selection}`}>
              <div className="style-details">
                {this.renderLocation('origin')}
                {this.renderLocation('destination')}
                <div className="travel__duration">
                  {this.renderDeparture()}
                  {selection !== 'oneWay' ? this.renderArrival() : null}

                </div>
                {this.renderTravelReasons()}
                {this.renderBedDropdown()}
                {this.renderOtherTravelReasons()}
              </div>
            </div>
            {selection === 'multi' && itemId >= 2 && (
              <button
                type="button"
                className="delete-icon"
                onClick={() => removeTrip(itemId)}
              >
                <img src={deleteBtn} alt="clicked" className="addsvg" />
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export const reasonsWarningColor = (length, max) =>{
  const charLeft = max - length;
  switch(true){
  case (charLeft===0):
    return { color:'red', charLeft: `You have reached a maximum of ${140} Characters`};
  case (charLeft < 11):
    return {color:'red', charLeft };
  case (charLeft < 20):
    return {color:'#E67373', charLeft };
  default:
    return {color: '#3359db', charLeft};
  }
};

export default TravelDetailsItem;

const itemId = PropTypes.number;
const values = PropTypes.object;
const selection = PropTypes.string;
const onChangeInput = PropTypes.func;
const handleDate = PropTypes.func;
const handleReason = PropTypes.func;
const removeTrip = PropTypes.func;
const handlePickBed = PropTypes.func;
const availableRooms = PropTypes.object;
const renderInput = PropTypes.func;
const customPropsForDeparture = PropTypes.func;
const customPropsForArrival = PropTypes.func;
const fetchRoomsOnFocus = PropTypes.func;
const requestOnEdit = PropTypes.object;
const listTravelReasons = PropTypes.object;
const editing = PropTypes.bool;

TravelDetailsItem.propTypes = {
  itemId: itemId.isRequired,
  values: values.isRequired,
  selection: selection.isRequired,
  onChangeInput: onChangeInput.isRequired,
  handleDate: handleDate.isRequired,
  handleReason: handleReason.isRequired,
  removeTrip: removeTrip.isRequired,
  handlePickBed: handlePickBed.isRequired,
  availableRooms: availableRooms.isRequired,
  renderInput: renderInput.isRequired,
  customPropsForDeparture: customPropsForDeparture.isRequired,
  customPropsForArrival: customPropsForArrival.isRequired,
  fetchRoomsOnFocus: fetchRoomsOnFocus.isRequired,
  editing: editing,
  requestOnEdit: requestOnEdit.isRequired,
  parentIds: PropTypes.number,
  listTravelReasons: listTravelReasons,
};

TravelDetailsItem.defaultProps = {
  parentIds: 0,
  editing: false,
  listTravelReasons: {},
};
