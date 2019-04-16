import React from 'react';
import formatDate from '../../helper/formatDate';
import RequestUtils from '../../helper/request/RequestUtils';

export default ({ trips }) => trips.map((trip) => {
  const {
    id, accommodationType, departureDate, returnDate, origin,
    destination, beds
  } = trip;
  const reason = RequestUtils.getTravelReason(trip);
  const accommodation = accommodationType !== 'Residence' ?
    accommodationType : `${beds.bedName}, ${beds.rooms.roomName}, ${beds.rooms.guestHouses.houseName}`;
  return (
    <div className="row" key={id}>
      <div className="partition">
        <p className="text--grey">Flight Route</p>
        <p className="text--black">
          {`${origin.split(',')[1]}-${destination.split(',')[1]}`}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">Travel Dates</p>
        <p className="text--black">
          {formatDate(departureDate, returnDate)}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">Accommodation</p>
        <p className="text--black">
          {accommodation}
        </p>
      </div>
      <div className="partition mobile">
        <p className="text--grey">Travel Reason</p>
        <p className="text--black">
          {reason}
        </p>
      </div>
    </div>
  );
});
