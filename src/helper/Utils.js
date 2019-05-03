import React from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import  {format, isEqual} from 'date-fns';

import definedRanges from './constants';

class Utils {
  static getRegex(query) {
    let regex = new RegExp(`${query}=[0-9]+`);
    if (query === 'search' || 'center') {
      regex = new RegExp(`${query}=([^&]*)`);
    }
    return regex;
  }

  static removeQueryParam(queryString, query) {
    const regex = new RegExp(`([&]*)${query}=([^&]*)`);
    let newQueryString = queryString.replace(regex, '');
    newQueryString = newQueryString.replace(/(.+)(&)$/, '$1');
    return newQueryString;
  }

  static createQuery(queryString, queryparams, regex) {
    let newQueryString = `?${queryparams}`;
    if (queryString.length && queryString.search(regex) === -1) {
      newQueryString = `${queryString}&${queryparams}`;
    } else if (queryString.length && queryString.search(regex) > -1) {
      newQueryString = queryString.replace(regex, queryparams);
    }
    return newQueryString;
  }

  static buildQuery(queryString, query, queryValue) {
    const regex = Utils.getRegex(query);
    const queryparams = queryValue ? `${query}=${queryValue}` : '';
    let newQueryString = Utils.createQuery(queryString, queryparams, regex);
    newQueryString =
      query === 'search'
        ? Utils.removeQueryParam(newQueryString, 'page')
        : newQueryString;
    newQueryString = newQueryString.replace(/(.+)(&)$/, '$1');
    return newQueryString;
  }

  static getActiveStatus(query) {
    let activeStatus;
    const regex = /status=[A-Z]+/i;
    const allActive = query.search(regex);
    if (allActive === -1) {
      activeStatus = 'all';
    } else {
      activeStatus = regex.exec(query)[0].split('=')[1];
    }
    return activeStatus;
  }

  static getCurrentLimit(query) {
    const regex = /limit=\d+/;
    const limit =
      regex.exec(query) === null ? '' : regex.exec(query)[0].split('=')[1];
    return limit;
  }

  static getQueryValue(queryString, key) {
    const regex = Utils.getRegex(key);
    const value =
      regex.exec(queryString) === null
        ? ''
        : regex.exec(queryString)[0].split('=')[1];
    return value;
  }

  static formatWord(word, criteria) {
    const formattedWord = `${word}${criteria > 1 ? 's' : ''}`;
    return formattedWord;
  }

  static updateTrips(trips, updatedTrip) {
    let newTripsRecord = trips.filter(
      tripObject => tripObject.id !== updatedTrip.id
    );
    let tripToUpdate = trips.find(
      tripObject => tripObject.id === updatedTrip.id
    );
    if (tripToUpdate) {
      tripToUpdate = { ...tripToUpdate, ...updatedTrip };
      newTripsRecord.push(tripToUpdate);
    }
    return newTripsRecord;
  }

  static generateTripRoomName(trip) {
    let tripRoomName = '';
    if (
      trip.beds.bedName &&
      trip.beds.rooms &&
      trip.beds.rooms.roomName &&
      trip.beds.rooms.guestHouses.houseName
    ) {
      tripRoomName = `${trip.beds.rooms.guestHouses.houseName}, ${
        trip.beds.rooms.roomName
      },
      ${trip.beds.bedName}`;
    }
    return tripRoomName;
  }

  static generateTripDuration({ departureDate, returnDate }) {
    let endDay = '';
    let endMonth = '';
    let endYear = '';
    let startDay = moment(departureDate).format('Do');
    const startMonth = moment(departureDate).format('MMM');
    const startYear = moment(departureDate).format('YYYY');
    if (returnDate) {
      endDay = moment(returnDate).format('Do');
      endMonth = moment(returnDate).format('MMM');
      endYear = moment(returnDate).format('YYYY');
      if (startMonth !== endMonth) startDay += ` ${startMonth}`;
      return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
    }
    return `${startDay} ${startMonth} ${startYear}`;
  }
  static isExpired(expireTimeInSec) {
    if (expireTimeInSec) {
      const now = new Date();
      const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
      return nowInSec > expireTimeInSec;
    }
  }

  /* istanbul ignore next */
  static verifyToken(token) {
    return jwt.verify(
      token,
      Buffer.from(process.env.REACT_APP_JWT_PUBLIC_KEY, 'base64'),
      (error, decodedToken) => {
        if(error) {
          return false;
        }
        return decodedToken;
      }
    );
  }
  static manageRangeFilter (range) {
    const {start, end} = range;
    return `dateFrom=${start}&dateTo=${end}`;
  }

  static manageFilterBtnLabel (range) {
    const {start, end} = range;
    let label = `${format(start, 'MMM DD, YYYY')} - ${format(end, 'MMM DD, YYYY')}`;
    Object.keys(definedRanges).map(definedRange=>{
      const {from, to} = definedRanges[definedRange];
      if(isEqual(start, format(from, 'YYYY-MM-DD')) && isEqual(end, format(to, 'YYYY-MM-DD'))){
        label = definedRange;
      }
    });
    return label;
  }

  static makeTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  static  getCurrentPage(context) {
    const { location: { search } } = context.props;
    const pathParams = new URLSearchParams(search);
    const page = pathParams.get('page') || 1;
    return page;
  }

  static renderLink = (link) => {
    const pathArr = link.split('/');
    pathArr.pop();
    return pathArr.join('/');
  }

  static renderToolTip = (status ,budgetStatus) => {
    let toolTipText;
    switch (status) {
    case 'Approved':
      if (budgetStatus === 'Approved') {
        toolTipText = 'Budget Check done. Pending Travel verification';
        break;
      }
      else{
        toolTipText = 'Manager approval done. Pending budget check approval';
        break;
      }
    case 'Checked':
      toolTipText = 'Budget Check done. Pending Travel verification';
      break;
    case 'Verified':
      toolTipText =
        'All pending approvals are done, the traveller can now travel to the destination';
      break;
    default:
      toolTipText = '';
    }
    const toolTip =
      status === 'Rejected' || status === 'Open' ? '' : (
        <span className="tool__tip">{toolTipText}</span>
      );
    return toolTip;
  }

  static returnTip(data, property) {
    return data.map((item, index) => {
      return index === (data.length - 1) ? `${item[property]}` : `${item[property]}, `;
    });
  }
}

export default Utils;
