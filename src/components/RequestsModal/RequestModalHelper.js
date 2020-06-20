import React from 'react';
import TripDetails from './TripDetails';

export const buttonTextValuePair = {
  Verified: 'Verify',
  Approved: 'Approve',
  Rejected: 'Reject',
  Verify: 'Verify',
  Approve: 'Approve',
  Reject: 'Reject'
};

export default class RequestModalHelper {

  static getRequestTripsDetails(requestData) {
    const {trips, tripType, createdAt} = requestData;
    const requestTripsDetails = trips && trips.map(trip => {
      const tripDetails = { createdAt, tripType, ...trip, };
      return <TripDetails key={trip.origin} tripDetails={tripDetails} />;
    });
    return requestTripsDetails;
  }

  static renderStatusAsBadge(status) {
    const style = `request__status--${!status ? '' : status.toLowerCase()}`;
    return (
      <div className="modal__button-below">
        <span className={style}>{status}</span>
      </div>
    );
  }

  static getCondition(button, state) {
    const { approveTextColor, rejectTextColor } = state;
    const approvedCondition = approveTextColor && button.id === 1 && !rejectTextColor;
    const rejectCondition = rejectTextColor && button.id === 2 && !approveTextColor;
    return { approvedCondition, rejectCondition };
  }

  static setApprovedStatusStyle(button, style, status, state) {
    const { navigatedPage } = state;
    const { approvedCondition } = RequestModalHelper.getCondition(button, state);
    if ((['Approved', 'Verified'].includes(status) && button.id === 1
      && navigatedPage !== 'Verifications') || (approvedCondition &&
        navigatedPage !== 'Verifications')) {
      style.backgroundColor = '#49AAAF';
      style.color = 'white';
    }
    return style;
  }

  static setVerifiedStatusStyle(button, style, status, state) {
    const { navigatedPage } = state;
    const { approvedCondition } = RequestModalHelper.getCondition(button, state);
    if ((status === 'Verified' && button.id === 1 && navigatedPage === 'Verifications')
    || (approvedCondition && navigatedPage === 'Verifications')) {
      style.backgroundColor = '#00af4f';
      style.color = 'white';
    }
    return style;
  }

  static setRejectedStatusStyle(button, style, status, state) {
    const { rejectCondition } = RequestModalHelper.getCondition(button, state);
    if ((status === 'Rejected' && button.id === 2) || (rejectCondition)) {
      style.backgroundColor = '#FF5359';
      style.color = 'white';
    }
    return style;
  }

  static renderButtonText(status, text, props) {
    const { updateError } = props;
    let butttonText = (status && status.includes(text)) ? status : text;
    butttonText = (updateError.length > 0) ? buttonTextValuePair[text] || '' : butttonText;
    return butttonText;
  }
}
