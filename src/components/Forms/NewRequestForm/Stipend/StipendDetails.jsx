import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StipendRow from './StipendRow';
import Preloader from '../../../Preloader/Preloader';
import './StipendDetails.scss';


const StipendDetails = ({ travelStipends, isLoading, total }) => {
  return (
    <div className={`${isLoading && 'stipend-container-with-loading'} stipend-container-block`}> 
      {isLoading
        ? <Preloader />
        :  (
          <Fragment>
            <div className="stipend-row header-tile">
              <div>Destination</div>
              <div>Daily Rate</div>
              <div>Duration</div>
              <div>SubTotal</div>
            </div>
            {
              travelStipends.map((stipend) => StipendRow(stipend))
            }
            <div className="total-stipend">
              <span className="total-title">Total</span>
              {total}
            </div>
          </Fragment>
        )
      }
    </div>
  );
};

export default StipendDetails;

StipendDetails.propTypes = {
  travelStipends: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  total: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  isLoading: PropTypes.bool,
};

StipendDetails.defaultProps = {
  isLoading: false,
  travelStipends: []
};
