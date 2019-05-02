import moment from 'moment';
import _ from 'lodash';

class RequestUtils {
  static stipendData(stipends) {
    return stipends.map(stipend => {
      const { amount, center: { location } } = stipend;
      return { location, amount };
    });
  }

  static calculateDuration(trip, tripType) {
    /*

    condition to be applied for a one way
    request has not been decided, so we use 1 day as default

     */
    if (tripType === 'oneWay') {
      return 1;
    }
    const { departureDate, returnDate, } = trip;
    const start = moment(departureDate);
    const end = moment(returnDate);
    const days = end.diff(start, 'days');
    return days === 0 ? 1 : days;
  }

  static calculateSingleStipend(trip, stipends, tripType) {
    const stipend = [];
    const days = RequestUtils.calculateDuration(trip, tripType);
    const allStipend = RequestUtils.stipendData(stipends); // TODO
    const destinationArray = trip.destination.split(',');
    const countryOfDestination = destinationArray[1].trim();

    const selectedStipend =  allStipend.filter((each) => {
      return each.location === countryOfDestination;
    });

    if (selectedStipend[0]) {
      const subTotal = selectedStipend[0].amount * days;
      RequestUtils.total += subTotal;
      stipend.push({
        subTotal,
        location: selectedStipend[0].location,
        dailyRate: selectedStipend[0].amount,
        duration: days,
        centerExists: true,
      });
    } else {
      const isAndelaCenter = RequestUtils
        .centerExists(allStipend, trip.destination);
      if (!isAndelaCenter) {
        stipend.push({
          subTotal: 0,
          location: trip.destination.split(',')[1],
          dailyRate: 'N/A',
          duration: days,
          centerExists: false,
        });
      }
    }
    return stipend;
  }

  static centerExists(allStipend, destination) {
    const centerExists = allStipend
      .map(stipend => stipend.location)
      .includes(destination.split(',').pop());
    return centerExists;
  }

  static getAllTripsStipend(trips, stipends, tripType) {
    let newTrips = trips;
    if (trips.length > 1) {
      newTrips = trips.map((trip, i) => {
        if (i + 1 === trips.length) {
          return {
            ...trip,
            departureDate: trips[i - 1].returnDate,
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
      }, 0);
    const total = totalStipend;

    return {
      totalStipend: total > 0 ? `$ ${total}` : 'N/A',
      stipendSubTotals,
    };
  }

  static formatLocation(location) {
    /* eslint-disable */
    switch (location) {
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

  static removeLocationChecklist(checklistItems, userData) {
    const newChecklist = [...checklistItems];
    newChecklist.map((checkItem, index) => {
      if (checkItem.destinationName.includes(userData.location)) {
        newChecklist[index].checklist.splice(0, newChecklist[index].checklist.length - 1);
      }
    });
    return newChecklist;
  }

  static getTravelReason(trip) {
    const reason = trip.otherTravelReasons || (trip.reasons || {}).title;
    return _.capitalize(reason) || 'N/A';
  }
  static getDefaultChecklist(checklistItems, trips) {
    if (checklistItems.length < trips.length && checklistItems.length !== 0) {
      const checklistItemsValues = [
        ...new Set(checklistItems.map(checklistItem => checklistItem.destinationName))
      ];

      const tripsValues = [...new Set(trips.map(trip => trip.destination))];

      const differenceDestinations = tripsValues.filter(
        destination => !checklistItemsValues.includes(destination)
      );

      if (checklistItems.length !== 0) {
        const checklists = checklistItems[0].checklist;

        const defaultChecklists = checklists.filter(function (checklist) {
          return checklist.destinationName.includes('Default');
        });

        differenceDestinations.map(differenceDestination => {
          const newItems = {
            destinationName: differenceDestination,
            checklist: defaultChecklists
          };
          checklistItems.push(newItems);
        });
      }
    }
    return checklistItems;
  }
}

export default RequestUtils;
