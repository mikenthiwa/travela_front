import moment from 'moment';
import _ from 'lodash';

class RequestUtils {
  static stipendData(stipends) {
    return stipends.map(stipend => {
      const { amount, country } = stipend;
      return { country , amount };
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
    const defaultStipend = allStipend.filter(stipend => stipend.country === 'Default');
    const destinationArray = trip.destination.split(',');
    const countryOfDestination = destinationArray[1].trim();

    const selectedStipend =  allStipend.filter((each) => {
      return each.country === countryOfDestination;
    });

    if (selectedStipend[0]) {
      const subTotal = selectedStipend[0].amount * days;
      RequestUtils.total += subTotal;
      stipend.push({
        subTotal,
        location: selectedStipend[0].country,
        dailyRate: selectedStipend[0].amount,
        duration: days,
        centerExists: true,
      });
    } else {
      const isAndelaCenter = RequestUtils
        .centerExists(allStipend, trip.destination);
      const subTotal = defaultStipend[0].amount * days;
      RequestUtils.total += subTotal;
      if (!isAndelaCenter) {
        stipend.push({
          subTotal,
          location: trip.destination.split(',')[1],
          dailyRate: defaultStipend[0].amount,
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

  static removeLocationChecklist (checklistItems, userData) {
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

      const tripsValues = [...new Set(trips.map(trip => trip.destination.split(', ')[1]))];

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

    else if(checklistItems.length === 1 && trips.length === 1 && checklistItems[0].destinationName === 'Default'){
      const newItems = {
        destinationName: trips[0].destination.split(', ')[1],
        checklist: checklistItems[0].checklist
      };
      checklistItems.splice(0, 1, newItems);

    }
    return checklistItems;
  }

  static getManagerNameOrId(managers, manager){
    const fieldType = {
      number: "id",
      string: "fullName"
    };
    const field = fieldType[typeof(manager)];
    const fieldResult = field === "id" ? "fullName": "id";
    const [managerResult] = managers.filter(userManager => userManager[field] === manager);
    return managerResult ? managerResult[fieldResult] : null;
  }
}

export default RequestUtils;
