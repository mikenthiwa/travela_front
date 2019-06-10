import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../../Preloader/Preloader';
import cash from '../../../../images/icons/new-request-icons/Cash.svg';

const TravelStipends = ({ isLoading, stipend, calculatedTotalTripStipends, displayType }) => {
  return (
    <div className={`${isLoading && 'stipend-container-with-loading'}`}>
      {isLoading
        ? <Preloader />
        : (
          <div className="breakdown-box-content">
            <div className="breakdown-box-icon">
              <img
                src={cash}
                alt="Hotel"
              />
            </div>
            <div className="breakdown-box-title">
              {'Travel Stipend'}
            </div>
            <div className="breakdown-box-cost">
              {`$${calculatedTotalTripStipends}`}
            </div>
            <div className="breakdown-box-cost-details">
              {displayType === 'sum' ? '' : `Costs $${stipend} per day`}
            </div>
          </div>
        )
      }
    </div>
  );
};




TravelStipends.propTypes = {
  stipend: PropTypes.number,
  isLoading: PropTypes.bool,
  displayType: PropTypes.string,
  calculatedTotalTripStipends: PropTypes.number
};

TravelStipends.defaultProps = {
  displayType: '',
  stipend: 0,
  isLoading: false,
  calculatedTotalTripStipends: 0
};

export default TravelStipends;
