import { checkLowerDate, checkSameDate } from './verifyDates';

function getSecondTripStateValues (editing, trips, newTrips, getDefaultTripStateValues) {
  (editing && newTrips.length > 1) ? {} : getDefaultTripStateValues(1, trips[1]);
}

function handleMultiTrip (newTrips) {
  let { trips } = this.state;
  const { editing,requestOnEdit: { trips: nextTrips } } = this.props;
  let parentIds,
    secondTripStateValues = {};
  if (newTrips.length > 1) {
    parentIds = newTrips.length || nextTrips.length;
    trips = newTrips;
  } else {
    parentIds = 2;
    trips = [].concat([trips[0] || {}, {
      origin: trips[0].destination,
      departureDate: null,
    }]);
  }
  secondTripStateValues = getSecondTripStateValues(editing, trips, newTrips, this.getDefaultTripStateValues);
  this.setState(prevState => ({
    parentIds,
    trips,
    values: { ...prevState.prevValues, ...secondTripStateValues }
  }), () => this.validate());
}

function handleReturnAndOneWayTrips (tripType) {
  this.setState(prevState => {
    const { newValues, trips } = this.refreshValues(prevState, tripType);
    return {
      parentIds: 1,
      values: newValues,
      isSameDate: false,
      isLowerDate: false,
      trips: trips || [{}]
    };
  }, () => this.validate());
}

function handleCollapse (tripType) {
  this.setState(prevState => {
    const { newValues, trips } = this.refreshValues(prevState, tripType);
    return {
      parentIds: 1,
      values: newValues,
      trips: trips || [{}]
    };
  }, () => this.validate());
  this.collapsible();
}

function handleRadioButton (event) {
  let { collapse, trips, values, selection, prevValues, prevTrips } = this.state;
  const tripType = event.target.value;
  this.setState({ selection: tripType });
  const newTrips = prevTrips.map((trip, index) => ({ ...trip, ...trips[index] }));
  prevValues && prevValues['arrivalDate-0'] && delete prevValues['arrivalDate-0'];
  values && values['arrivalDate-0'] && delete values['arrivalDate-0'];
  this.setState(
    {
      prevTrips: newTrips,
      prevValues: { ...prevValues, ...values }
    }, () => this.validate()
  );
  if (tripType === 'multi' && !collapse) handleMultiTrip.bind(this)(newTrips);
  else if (!collapse) handleReturnAndOneWayTrips.bind(this)(tripType);
  else handleCollapse.bind(this)(tripType);

  trips[0].travelReasons &&
    !trips[0].otherTravelReasons &&
    this.handleReason(values['reasons-0'], 0, null);

  checkLowerDate.bind(this)();
  checkSameDate.bind(this)();
  selection !== 'oneWay' && setTimeout(() => this.validate('reasons-0'), 100);
  tripType === 'return' && !values['arrivalDate-0'] ?
    (() => {
      setTimeout(this.setState({ isSameDate: true }), 150);
    })() :
    null;
}

export default handleRadioButton;
