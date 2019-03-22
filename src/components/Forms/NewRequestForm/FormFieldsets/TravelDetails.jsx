import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import RadioButton from '../../../RadioButton';
import location from '../../../../images/location.svg';
import addMultipleCityBtn from '../../../../images/add.svg';
import deleteBtnRed from '../../../../images/delete.svg';
import TravelDetailsItem from './TravelDetailsItem';
import AddInputRowButton from '../../AddInputRowButton';

class TravelDetailsFieldset extends Component {
  componentDidMount = () => {
    this.get_details();
  };

  get_details = () => {
    const { parentIds } = this.props;
    for (let i = 0; i < parentIds; i += 1) {
      const id = document.getElementById(i);
    }
  };

  customPropsForArrival = (values, name) => ({
    className: 'arrival-date',
    disabled: !values[name],
    minDate: values[name]? moment(values[name]) : moment(),
    placeholderText: !values[name]
      ? 'select depart date first'
      : 'select return date'
  });

  customPropsForDeparture = values => ({
    minDate: moment()
  });

  renderRadioButton = handleRadioButtonChange => {
    const { selection } = this.props;
    return (
      <div className="trip-align" onChange={handleRadioButtonChange}>
        <RadioButton
          name="One Way Trip"
          value="oneWay"
          id="oneWay"
          defaultChecked={selection === 'oneWay'}
        />
        <RadioButton
          name="Return Trip"
          value="return"
          id="return"
          defaultChecked={selection === 'return'}
        />
        <RadioButton
          name="Multi City Trip"
          value="multi"
          id="multi"
          defaultChecked={selection === 'multi'}
        />
      </div>
    );
  };

  renderAddAnotherBtn = () => {
    const { addNewTrip } = this.props;
    return (
      <AddInputRowButton
        text="Add another trip"
        addRowHandler={addNewTrip}
        wrapperClassName="add-multi-trip-area"
        buttonClassName="another-trip"
      />
    );
  };

  fetchRoomsOnFocus = (values, i, selection) => {
    let data = {};
    const { fetchAvailableRooms } = this.props;
    if (this.validateAllTripDetails(values, i, selection)) {
      const newDepartureDate = new Date(
        values[`departureDate-${i}`].format('YYYY-MM-DD')
      );
      const newArrivalDate = moment(newDepartureDate)
        .add(1, 'months')
        .format('YYYY-MM-DD');
      data = {
        gender: values.gender,
        location: values[`destination-${i}`],
        arrivalDate: values[`arrivalDate-${i}`]
          ? values[`arrivalDate-${i}`].format('YYYY-MM-DD')
          : newArrivalDate,
        departureDate: values[`departureDate-${i}`].format('YYYY-MM-DD'),
        tripType: selection,
        rowId: i
      };
      fetchAvailableRooms(data);
    }
  };

  validateAllTripDetails(values, i, selection) {
    const isValid =
      values.gender &&
      values[`destination-${i}`] &&
      values[`departureDate-${i}`];
    if (selection === 'oneWay') return isValid;
    return isValid && values[`arrivalDate-${i}`];
  }

  renderTravelDetails = (i, selection, onChangeInput, parentIds) => {
    const {
      values,
      handleDate,
      handleReason,
      handlePickBed,
      removeTrip,
      availableRooms,
      requestOnEdit,
      listTravelReasons,
      editing
    } = this.props;

    const { renderInput } = this.inputRenderer;

    return (
      <TravelDetailsItem
        itemId={i}
        selection={selection}
        values={values}
        handleDate={handleDate}
        handleReason={handleReason}
        handlePickBed={handlePickBed}
        removeTrip={removeTrip}
        availableRooms={availableRooms}
        onChangeInput={onChangeInput}
        renderInput={renderInput}
        customPropsForDeparture={this.customPropsForDeparture}
        customPropsForArrival={this.customPropsForArrival}
        fetchRoomsOnFocus={this.fetchRoomsOnFocus}
        requestOnEdit={requestOnEdit}
        parentIds={parentIds}
        listTravelReasons={listTravelReasons}
        editing={editing}
      />
    );
  };

  renderForms(parentIds, selection, onChangeInput) {
    const forms = [];
    for (let i = 0; i < parentIds; i += 1) {
      forms.push(
        <div className="trip__detail-col" id={i} key={i}>
          {this.renderTravelDetails(i, selection, onChangeInput, parentIds)}
        </div>
      );
    }
    return forms;
  }

  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { handleRadioButtonChange, selection, onChangeInput } = this.props;

    const { parentIds, existingTrips } = this.props;
    return (
      <fieldset className="travel-details">
        {this.renderRadioButton(handleRadioButtonChange)}
        <div className="trip__detail-row">
          {this.renderForms(parentIds, selection, onChangeInput, existingTrips)}
        </div>
        {selection === 'multi' && this.renderAddAnotherBtn()}
      </fieldset>
    );
  }
}

const values = PropTypes.object;
const handleRadioButtonChange = PropTypes.func;
const selection = PropTypes.string;
const onChangeInput = PropTypes.func;
const addNewTrip = PropTypes.func;
const handleDate = PropTypes.func;
const handleReason = PropTypes.func;
const removeTrip = PropTypes.func;
const parentIds = PropTypes.number;
const existingTrips = PropTypes.func;
const handlePickBed = PropTypes.func;
const fetchAvailableRooms = PropTypes.func;
const availableRooms = PropTypes.object;
const listTravelReasons = PropTypes.object;
const requestOnEdit = PropTypes.object;
const editing = PropTypes.bool;

TravelDetailsFieldset.propTypes = {
  values: values.isRequired,
  handleRadioButtonChange: handleRadioButtonChange.isRequired,
  selection: selection.isRequired,
  onChangeInput: onChangeInput.isRequired,
  addNewTrip: addNewTrip.isRequired,
  handleDate: handleDate.isRequired,
  handleReason: handleReason.isRequired,
  removeTrip: removeTrip.isRequired,
  parentIds: parentIds.isRequired,
  existingTrips: existingTrips,
  handlePickBed: handlePickBed.isRequired,
  fetchAvailableRooms: fetchAvailableRooms.isRequired,
  availableRooms: availableRooms.isRequired,
  listTravelReasons: listTravelReasons.isRequired,
  requestOnEdit: requestOnEdit.isRequired,
  editing: editing
};

TravelDetailsFieldset.defaultProps = {
  existingTrips: null,
  editing: false
};

export default TravelDetailsFieldset;
