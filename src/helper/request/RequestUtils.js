import moment from 'moment';

class RequestUtils {
  static stipendData (stipends){
    return stipends.map(stipend => {
      const { amount, center: { location }  } = stipend;
      return  { location, amount };
    });
  }

  static calculateDuration (trip, tripType) {
    /*

    condition to be applied for a one way
    request has not been decided, so we use 1 day as default

     */
    if(tripType === 'oneWay') {
      return 1;
    }
    const { departureDate, returnDate, } = trip;
    const start = moment(departureDate);
    const end = moment(returnDate);
    const days = end.diff(start, 'days');
    return days === 0 ? 1 : days;
  }

  static calculateSingleStipend (trip, stipends, tripType) {
    const stipend = [];
    const days = RequestUtils.calculateDuration(trip, tripType);
    const allStipend = RequestUtils.stipendData(stipends); // TODO

    allStipend.forEach((data, i) => {
      if(data.location === trip.destination){
        const subTotal = data.amount * days;
        RequestUtils.total += subTotal;
        stipend.push({
          subTotal,
          location: data.location.split(',')[0],
          dailyRate: data.amount,
          duration: days,
          centerExists: true,
        });
      } else {
        const isAndelaCenter = RequestUtils
          .centerExists(allStipend, trip.destination);
        if(!isAndelaCenter) {
          stipend.push({
            subTotal: 0,
            location: trip.destination.split(',')[0],
            dailyRate: 'N/A',
            duration: days,
            centerExists: false,
          });
        }
      }
    });
    return stipend;
  }

  static centerExists(allStipend, destination) {
    const centerExists = allStipend
      .map(stipend => stipend.location)
      .includes(destination);
    return centerExists;
  }

  static getAllTripsStipend(trips, stipends, tripType) {
    let newTrips = trips;
    if(trips.length > 1) {
      newTrips = trips.map((trip, i) => {
        if(i + 1 === trips.length){
          return {
            ...trip,
            departureDate: trips[ i -1].returnDate,
            returnDate: trip.departureDate
          };
        }
        return trip;
      });
    }

    const stipendSubTotals = newTrips.map(trip => RequestUtils
      .calculateSingleStipend(trip, stipends, tripType)[0]);

    const totalStipend = stipendSubTotals
      .map(stipend => stipend.subTotal)
      .reduce((previousStipend, nextStipend) => {
        return Math.abs(previousStipend) + Math.abs(nextStipend);
      },0);
    const total =totalStipend;

    return {
      totalStipend:  total > 0 ? `$ ${total}`: 'N/A',
      stipendSubTotals,
    };
  }

  static formatLocation(location) {
    switch(location){
    case 'Nairobi':
      return 'Nairobi(NBO)';
    case 'Lagos':
      return 'Lagos(LOS)';
    case 'Kampala':
      return 'Kampala(KLA)';
    case 'Kigali':
      return 'Kigali(KGL)';
    default:
      return location;
    }
  }
  static cleanChecklists(checklistItems, userData) {
    let trimmedCheckLists = [];
    let finalCheckLists = [];
    if(checklistItems.length) {
      checklistItems.forEach(item => {
        if(item && item.checklist) {
          trimmedCheckLists.push(...item.checklist);
        }
      });
      finalCheckLists = trimmedCheckLists.filter(trip => {
        return !trip.destinationName.startsWith(userData.location);
      });
    }
    return finalCheckLists;
  }
}

export default RequestUtils;
