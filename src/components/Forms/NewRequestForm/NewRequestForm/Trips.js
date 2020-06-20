import moment from 'moment';

export const setTrips = requestOnEdit => {
  const { trips } = requestOnEdit;
  let allTrips = [];
  trips.map(trip => allTrips.push(trip));
  return allTrips;
};

export const getTrips = requestOnEdit => {
  const { trips, tripType } = requestOnEdit;
  const tripsStateValues = [];
  trips.map((trip, index) => {
    tripsStateValues[`origin-${index}`] = trip.origin;
    tripsStateValues[`destination-${index}`] = trip.destination;
    tripsStateValues[`arrivalDate-${index}`] = moment(trip.returnDate);
    tripsStateValues[`departureDate-${index}`] = moment(trip.departureDate);
    tripsStateValues[`bed-${index}`] = trip.bedId && trip.bedId;
    tripsStateValues[`otherReasons-${index}`] = trip.otherTravelReasons;
    tripsStateValues[`reasons-${index}`] = trip.otherTravelReasons ?
      'Other..'
      : trip.reasons && trip.reasons.title;
    if (tripsStateValues[`reasons-${index}`] !== 'Other..') {
      delete tripsStateValues[`otherReasons-${index}`];
    }
    tripsStateValues[`trip-type-${index}`] = tripType;
  });
  return tripsStateValues;
};

export function addNewTrip () {
  return this.setState(prevState => {
    const { parentIds, values, trips } = prevState;
    const addedTripStateValues = this.getDefaultTripStateValues(parentIds);
    const nextDepartureField = `departureDate-${parentIds}`;
    const lastArrivalValue = values[`arrivalDate-${parentIds - 1}`];
    const nextOriginField = `origin-${parentIds}`;
    const lastDepartureLocation = values[`destination-${parentIds - 1}`];
    addedTripStateValues[nextDepartureField] = lastArrivalValue;
    addedTripStateValues[nextOriginField] = lastDepartureLocation;
    const newTripDepartureDate = lastArrivalValue && lastArrivalValue.format('YYYY-MM-DD');

    return {
      parentIds: parentIds + 1,
      optionalFields: [prevState.optionalFields[0], `arrivalDate-${parentIds}`],
      trips: trips.concat([{
        departureDate: newTripDepartureDate,
        origin: lastDepartureLocation
      }]),
      values: { ...values, ...addedTripStateValues }
    };
  }, () => this.validate());
}

export function removeTrip (i) {
  const tripProps = ['origin', 'destination', 'arrivalDate', 'departureDate', 'bed', 'reasons', 'otherReasons'];
  this.setState((prevState) => {
    let { parentIds, trips, values, errors } = prevState;
    trips.splice(i, 1);
    parentIds--;
    tripProps.map(prop => {
      // shift trips state values up a level from deleted index
      let start = i;
      while (start < parentIds) {
        values[`${prop}-${start}`] = values[`${prop}-${start + 1}`];
        start++;
      }
      // remove other redundant things from state
      delete values[`${prop}-${parentIds}`];
      delete errors[`${prop}-${i}`];
    });
    return { trips, values, parentIds, errors };
  }, () => this.validate());
}
