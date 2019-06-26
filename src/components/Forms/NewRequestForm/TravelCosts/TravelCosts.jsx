import React, {Fragment} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TabView from  '../../../TripTabView/TabView';
import TraveStipends from './TravelStipends';
import FlightCosts from './FlightCosts';
import HotelEstimates from './HotelEstimates';
import './TravelCosts.scss';

const calculateTripDuration = ({ departureDate, returnDate }) => {
  const tripDuration =  moment(returnDate).diff(moment(departureDate), 'days');
  if (isNaN(tripDuration)) return 0;
  return tripDuration;
};
const calculateTotalTripStipends = (stipend, duration) => parseInt(duration) * parseInt(stipend);
const calculateTotalHotelRate = (rate, duration) => parseInt(duration) * parseInt(rate);

const getTripStipend = (stipends, destination) => {
  const getTripStipend = stipend => stipend.country === destination.split(', ')[1];
  const tripStipend = stipends.find(getTripStipend);
  return tripStipend;
};

const getTripHotelRate = (hotelEstimates, destination) => {
  const getTripHotelRate = hotelEstimate => hotelEstimate.country.country === destination.split(', ')[1];
  const tripHotelRate = hotelEstimates.find(getTripHotelRate);
  return tripHotelRate;
};

const getTripFlightCost = (flightCosts, origin, destination) => {
  const getTripFlightCost = flightCost => flightCost.origin === origin.split(', ')[1] && flightCost.destination === destination.split(', ')[1];
  const tripFlightCost = flightCosts.find(getTripFlightCost);
  return tripFlightCost;
};

export const calculateTotalTripCost = (trips, stipends, flightCosts, hotelEstimates) => {
  const getAllTripsTotal = trips.map((trip, index) => {
    const { origin, destination } = trip;
    const tripDuration = calculateTripDuration(trip);
    const isDateValid = Math.sign(tripDuration) !== -1;//negative results means invalid dates

    const tripStipend = getTripStipend(stipends, destination);
    let stipendAmount;
    if (tripStipend && isDateValid) {
      ({ amount: stipendAmount } = tripStipend);
      stipendAmount = calculateTotalTripStipends(stipendAmount, tripDuration);
    }
    const tripHotelRate = getTripHotelRate(hotelEstimates, destination);
    let hotelCost;
    if (tripHotelRate && isDateValid) {
      ({ amount: hotelCost } = tripHotelRate);
      hotelCost = calculateTotalHotelRate(hotelCost, tripDuration);
    }
    const tripFlightCost = getTripFlightCost(flightCosts, origin, destination);
    let flightCost;
    if (tripFlightCost) {
      ({ cost: flightCost } = tripFlightCost);
    }
    return {stipendAmount, hotelCost, flightCost, tripDuration, origin, destination};
  });

  return getAllTripsTotal;
};

const sumAllTripCosts = (tripsSum) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const tripFlightCost = tripsSum
    .map(trip => trip.flightCost)
    .filter(value => value !== undefined)
    .reduce(reducer, 0);
  const tripHotelRate = tripsSum
    .map(trip => trip.hotelCost)
    .filter(value => value !== undefined)
    .reduce(reducer, 0);
  const tripStipend = tripsSum
    .map(trip => trip.stipendAmount)
    .filter(value => value !== undefined)
    .reduce(reducer, 0);
  const tripDuration = tripsSum
    .map(trip => trip.tripDuration)
    .filter(value => Math.sign(value) !== -1)
    .reduce(reducer, 0);
  return {
    tripFlightCost,
    tripHotelRate,
    tripStipend,
    tripDuration
  };
};

const renderStipends = (isLoading, tripStipend, destination, tripDuration, returnDate, displayType) => {
  if (!returnDate || !tripStipend) return '';
  if (tripStipend) {
    const { amount } = tripStipend;
    const calculatedTotalTripStipends = amount ? calculateTotalTripStipends(amount, tripDuration) : tripStipend;
    return (
      <div className="breakdown-box">
        <TraveStipends
          isLoading={isLoading} stipend={amount || tripStipend}
          location={destination} duration={tripDuration}
          calculatedTotalTripStipends={calculatedTotalTripStipends}
          displayType={displayType} />
      </div>
    );
  }
};

const renderFlightCosts = (isLoading, origin, destination, tripFlightCost, displayType) => {
  if (!tripFlightCost) return '';
  if (tripFlightCost) {
    const { cost } = tripFlightCost;
    return (
      <div className="breakdown-box">
        <FlightCosts
          isLoading={isLoading}
          origin={origin} destination={destination}
          cost={cost || tripFlightCost}
          displayType={displayType} />
      </div>
    );
  }
};

const renderHotelEstimates = (isLoading, rate, destination, tripDuration, returnDate, displayType) => {
  if (!returnDate || !rate) return '';
  if (rate) {
    const { amount } = rate;
    const calculatedTotalHotelRate = amount ? calculateTotalHotelRate(amount, tripDuration) : rate;
    return (
      <div className="breakdown-box">
        <HotelEstimates
          isLoading={isLoading}
          rate={amount || rate} location={destination}
          duration={tripDuration}
          calculatedTotalHotelRate={calculatedTotalHotelRate}
          displayType={displayType} />
      </div>
    );
  }
};

const calculateTripDetails = (stipends, flightCosts, hotelEstimates, trip, index) => {
  const { destination, origin, returnDate } = trip;
  const tripDuration = calculateTripDuration(trip);
  const tripStipend = getTripStipend(stipends, destination);
  const tripHotelRate = getTripHotelRate(hotelEstimates, destination);
  const tripFlightCost = getTripFlightCost(flightCosts, origin, destination);
  const subTitle = tripDuration <= 0 ? 'Final Stop' : `${tripDuration > 1 ? `${tripDuration} days` : `${tripDuration} day`} in ${destination.split(',')[0]}`;
  return {
    title: `TRIP ${index + 1}`,
    subTitle,
    tripDuration,
    tripStipend,
    tripHotelRate,
    tripFlightCost,
    origin,
    destination,
    returnDate
  };
};

const renderTabContent = (isLoading, trip) => {
  const {
    tripHotelRate,
    tripFlightCost,
    tripStipend,
    origin,
    destination,
    tripDuration,
    returnDate,
    title,
    subTitle,
    displayType
  } = trip;

  const noEstimatesMessage = (
    <Fragment key={title}>
      <p className="no-estimate-message">There are no estimates available for this trip</p>
    </Fragment>
  );

  if (subTitle === 'Final Stop' && !tripFlightCost) return noEstimatesMessage;
  if (!tripHotelRate && !tripFlightCost && !tripStipend) return noEstimatesMessage;

  return (
    <Fragment key={title}>
      {renderHotelEstimates(isLoading, tripHotelRate, destination, tripDuration, returnDate, displayType)}
      {renderFlightCosts(isLoading, origin, destination, tripFlightCost, displayType)}
      {renderStipends(isLoading, tripStipend, destination, tripDuration, returnDate, displayType)}
    </Fragment>
  );
};
const TravelCosts = ({stipends, flightCosts, hotelEstimates, isLoading, trips}) => {
  const tripsData = trips.map((trip, index) => calculateTripDetails(stipends, flightCosts, hotelEstimates, trip, index));
  const tripsSum = calculateTotalTripCost(trips, stipends, flightCosts, hotelEstimates);
  const totalSum = sumAllTripCosts(tripsSum);
  const totalTab = {
    ...tripsData[0],
    ...totalSum,
    title: 'TOTAL ESTIMATE',
    subTitle: totalSum.tripDuration > 0 ? `${totalSum.tripDuration} days in total` : 'No duration',
    displayType:'sum'
  };
  const tabContent = [...tripsData, {...totalTab}];
  return (
    <Fragment>
      <TabView tabs={tabContent} currentTab={0}>
        {
          tabContent.map(trip => renderTabContent(isLoading, trip))
        }
      </TabView>
    </Fragment>);
};

TravelCosts.propTypes = {
  stipends: PropTypes.array,
  flightCosts: PropTypes.array,
  hotelEstimates: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  trips: PropTypes.array
};

TravelCosts.defaultProps = {
  hotelEstimates: [],
  flightCosts: [],
  stipends: [],
  trips: [],
};

export default TravelCosts;
