function refreshValues (prevState, tripType) {
  // squash state.values to the shape defaultState keeping the values from state
  const { prevValues: values, prevTrips: trips } = prevState;
  let newValues = { ...this.defaultState.values };
  Object.keys(newValues).map(
    inputName => (newValues[inputName] = values[inputName])
  );
  if (tripType !== 'multi') {
    let newTrip = { ...trips[0] };
    delete newValues['arrivalDate-0'];
    delete newTrip.returnDate;
    trips[0] = newTrip;
    const slicedTrips = trips.slice(0, 1);
    return { newValues, trips: slicedTrips };
  }
  return { newValues, trips };
}

export default refreshValues;
