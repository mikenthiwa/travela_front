import moment from 'moment';
import toast from 'toastr';

const checkDateEquality = (trips) => {
  const tripsLength = trips.length > 1 ? trips.length - 1 : trips.length;
  const tripsDate = [];
  for (let i = 0; i < tripsLength; i++) {
    tripsDate.push(moment(trips[i].departureDate).isSame(trips[i].returnDate, 'day'));
  }
  let theBool = 0;
  for (let i = 0; i < tripsDate.length; i++) {
    theBool += tripsDate[i];
  }
  return [theBool, tripsDate];
};

//dates for each trip cant be the same.
export function checkSameDate () {
  const { trips, values } = this.state;
  const [theBool, tripsDate] = checkDateEquality(trips);
  if (theBool && trips[0].returnDate) {
    this.setState({ isSameDate: true });
    const firstMatch = tripsDate.findIndex(trip => trip);
    trips[0].returnDate &&
      firstMatch !== -1 && toast
      .error(`Return date must be the greater than Departure date for Trip ${
        trips.length > 1 ? firstMatch + 1 : ''}`);
  } else this.setState({ isSameDate: false });
}

//dates can be lower than the currents days date.
export function checkLowerDate () {
  const { trips } = this.state;
  const tripsLength = trips.length > 1 ? trips.length - 1 : trips.length;
  const tripsDate = [];
  for (let i = 0; i < tripsLength; i++) {
    tripsDate.push(moment().isAfter(trips[i].departureDate, 'day'));
  }
  const firstMatch = tripsDate.findIndex(trip => trip);
  if (firstMatch !== -1) {
    this.setState({ isLowerDate: true });
    toast.error(`Date must be the greater than Today's Date for Trip ${
      trips.length > 1 ? firstMatch + 1 : ''}`);
  } else this.setState({ isLowerDate: false });
}
