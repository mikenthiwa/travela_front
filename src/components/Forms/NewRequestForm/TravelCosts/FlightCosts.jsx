import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../../Preloader/Preloader';
import flight from '../../../../images/icons/new-request-icons/Flight.svg';

const FlightCosts = ({ isLoading, origin, destination, cost, displayType}) => {
  return (
    <div className={`${isLoading && 'stipend-container-with-loading'}`}>
      {isLoading
        ? <Preloader />
        : (
          <div className="breakdown-box-content">
            <div className="breakdown-box-icon">
              <img
                src={flight}
                alt="Flight"
              />
            </div>
            <div className="breakdown-box-title">
              {'Flight Costs'}
            </div>
            <div className="breakdown-box-cost">
              {`$${cost}`}
            </div>
            <div className="breakdown-box-cost-details">
              {displayType === 'sum' ? '' : `${origin} - ${destination}`}
            </div>
          </div>
        )
      }
    </div>
  );
};




FlightCosts.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  cost: PropTypes.number,
  displayType: PropTypes.string,
  isLoading: PropTypes.bool
};

FlightCosts.defaultProps = {
  displayType: '',
  origin: '',
  destination: '',
  cost: 0,
  isLoading: false
};

export default FlightCosts;
