import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../../Preloader/Preloader';
import hotel from '../../../../images/icons/new-request-icons/Hotel.svg';

const HotelEstimates = ({ isLoading, rate, calculatedTotalHotelRate, displayType }) => {
  return (
    <div className={`${isLoading && 'stipend-container-with-loading'}`}>
      {isLoading
        ? <Preloader />
        : (
          <div className="breakdown-box-content">
            <div className="breakdown-box-icon">
              <img
                src={hotel}
                alt="Hotel"
              />
            </div>
            <div className="breakdown-box-title">
              {'Hotel Estimate'}
            </div>
            <div className="breakdown-box-cost">
              {`$${calculatedTotalHotelRate}`}
            </div>
            <div className="breakdown-box-cost-details">
              { displayType === 'sum' ? '' : `Costs $${rate} per day`}
            </div>
          </div>
        )
      }
    </div>
  );
};

HotelEstimates.propTypes = {
  rate: PropTypes.number,
  isLoading: PropTypes.bool,
  displayType: PropTypes.string,
  calculatedTotalHotelRate: PropTypes.number
};

HotelEstimates.defaultProps = {
  displayType: '',
  rate: 0,
  isLoading: false,
  calculatedTotalHotelRate: 0
};

export default HotelEstimates;
