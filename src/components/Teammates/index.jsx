import moment from 'moment';
import  PropTypes from 'prop-types';
import React, { Component } from 'react';
import  Popover from 'react-awesome-popover';
import 'react-awesome-popover/dest/react-awesome-popover.css';

const Teammates = ({teammates: { payload, isLoading }}) => {
  const renderTeammates = () => {
    return payload.length > 0 && payload.map(({picture, name, destination, departureDate, returnDate}) => (
      <div key={picture}>
        <Popover action="hover" placement="top" contentClass="rap-popover-content">
          <img src={picture} alt={name} />
          <div className="pad">
            <p className="team--username">{name}</p>
            <p className="team--destination">{destination}</p>
            <p className="team--duration">
              {moment(departureDate).format('MMM DD')}
              {returnDate && ` - ${moment(returnDate).format('MMM DD')}`}
            </p>
          </div>
        </Popover>
      </div>
    ));
  };

  return (
    <div className="card-layout card-layout--team">
      <p>Travelling team Members</p>
      <div className="team-members">
        {
          isLoading ?
            <div className="centered-flex">Loading...</div> :
            !renderTeammates() ? (
              <div className="centered-flex">
                <div className="message">At the moment, no member of your team has a scheduled trip</div>
              </div>
            ) : renderTeammates()
        }
      </div>
    </div>
  );
};

Teammates.propTypes = {
  teammates: PropTypes.object,
};

Teammates.defaultProps = {
  teammates: {}
};

export default Teammates;
