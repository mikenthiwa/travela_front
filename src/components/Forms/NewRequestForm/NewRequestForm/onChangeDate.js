import { checkLowerDate, checkSameDate } from './verifyDates';

function resetTripArrivalDate (id, dateName) {
  this.setState(
    prevState => ({
      values: {
        ...prevState.values,
        [`arrivalDate-${id}`]: null
      }
    }),
    () => this.validate(dateName)
  );
}

function handleArrivalDate (date, selection, dateName, dateFormat) {
  const getId = dateName.split('-')[1];
  if (selection === 'multi') {
    const targetFieldId = Number(getId) + 1;
    this.setState(
      prevState => {
        const { trips } = prevState;
        const newTrips = [...trips];
        if (targetFieldId < newTrips.length) {
          newTrips[targetFieldId].departureDate = dateFormat;
        }
        return {
          targetFieldId,
          values: {
            ...prevState.values,
            [`departureDate-${targetFieldId}`]: date
          },
          trips: [...newTrips]
        };
      }
    );
  }
}

function handleDepatureDate (getId, selection, date, dateFormat) {
  if (
    selection === 'multi'
    && `departureDate-${getId}` !== 'departureDate-0'
  ) {
    const targetFieldId = getId - 1;
    this.setState(
      prevState => {
        const { trips } = prevState;
        const newTrips = [...trips];
        newTrips[targetFieldId].arrivalDate = dateFormat;
        newTrips[targetFieldId].returnDate = dateFormat;
        return {
          targetFieldId,
          values: {
            ...prevState.values,
            [`arrivalDate-${targetFieldId}`]: date
          },
          trips: [...newTrips]
        };
      }
    );
  }
}

function setTripDate (getId, dateFormat, dateStartsWithArrival, dateStartsWithDeparture) {
  const { trips } = this.state;
  if (dateStartsWithDeparture) {
    trips[getId].departureDate = dateFormat;
  } else if (dateStartsWithArrival) {
    trips[getId].returnDate = dateFormat;
  }
}

function onPickDate (getId, dateStartsWithDeparture, selection, dateName) {
  dateStartsWithDeparture && selection !== 'oneWay'
    ? () => resetTripArrivalDate.bind(this)(getId, dateName)
    : () => this.validate(dateName);
}

function handleDates (dateName, date) {
  const { trips, selection } = this.state;
  const dateFormat = date ? date.format('YYYY-MM-DD') : null;
  const getId = dateName.split('-')[1];
  const dateStartsWithDeparture = dateName.startsWith('departure');
  const dateStartsWithArrival = dateName.startsWith('arrival');
  if (trips[getId]) {
    setTripDate.bind(this)(getId, dateFormat, dateStartsWithArrival, dateStartsWithDeparture);
  } else {
    trips.push({
      [dateName.split('-')[0]]: dateFormat
    });
  }
  dateStartsWithDeparture && handleDepatureDate.bind(this)(getId, selection, date);
  dateStartsWithArrival && handleArrivalDate.bind(this)(date, selection, dateName);
  return onPickDate.bind(this)(getId, dateStartsWithDeparture, selection, dateName);
}

function onChangeDate (date, event) {
  const dateWrapperId = event.nativeEvent.path[7].id || event.nativeEvent.path[4].id;
  const dateName = dateWrapperId.split('_')[0];
  const onPickDate = handleDates.bind(this)(dateName, date);
  this.setState(
    prevState => ({
      values: {
        ...prevState.values,
        [dateName]: date
      }
    }),
    onPickDate
  );
  checkLowerDate.bind(this)();
  checkSameDate.bind(this)();
}

export default onChangeDate;
