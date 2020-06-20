import moment from 'moment';

export default trips => {
  const returnDates = trips.map(trip => new Date(trip.returnDate));
  const departureDates = trips.map(trip => new Date(trip.departureDate));
  const minDeparture = Math.min.apply(null, departureDates);
  const maxReturn = Math.max.apply(null, returnDates);
  const duration = Math.abs(
    moment(maxReturn).diff(moment(minDeparture), 'days')
  );
  return `${duration + 1} days`;
};
