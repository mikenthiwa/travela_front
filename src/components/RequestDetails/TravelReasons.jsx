import React from 'react';
import RequestUtils from '../../helper/request/RequestUtils';

export default ({ trips }) =>  {
  return trips.map((trip) => {
    const reason = RequestUtils.getTravelReason(trip);
    return (
      <div className="row desktop" key={trip.id}>
        <p className="text--grey">Travel Reason</p>
        <p className="text--black">{reason}</p>
      </div>
    );
  });
};
