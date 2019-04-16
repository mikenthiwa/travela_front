import React from 'react';
import PropTypes from 'prop-types';
import travelStipendHelper from '../../../../helper/request/RequestUtils';


const StipendRow = ({
  location,
  duration,
  subTotal,
  dailyRate,
  centerExists
}) => {
  return (
    <div className="stipend-row single-trip" key={location}>
      <div className="item">
        {
          location
        }
      </div>
      <div className="item">
        {
          dailyRate !== 'N/A' ? `$ ${dailyRate}` : dailyRate
        }
      </div>
      <div className="item">{`${duration} ${duration <= 1 ? 'day' : 'days'}`}</div>
      <div className="item">
        {centerExists
          ? `$ ${subTotal}`
          : 'N/A'
        }
      </div>
    </div>
  );
};

StipendRow.propTypes = {
  location: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  subTotal: PropTypes.number.isRequired,
  dailyRate: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number
    ]
  ).isRequired,
  centerExists: PropTypes.bool.isRequired,
};

export default StipendRow;
