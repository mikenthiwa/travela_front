import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StatsAnalytics = ({color, stats, icon, error }) => (
  <Fragment>
    { error 
      ? (
        <p className="dashboard-component__error-text--style">
          Oops! An error occurred in retrieving this data
        </p>
      )
      : (
        <div className={`analytics-card__stats ${color}`}>
          <div className="analytics-card__icon">
            <img src={icon} alt="" />
          </div>
          <div className="analytics-card__stat">
            <h4>{stats}</h4>
          </div>
        </div>
      )
    }
  </Fragment>
);

StatsAnalytics.propTypes = {
  color: PropTypes.string,
  stats: PropTypes.number,
  icon: PropTypes.string,
  error: PropTypes.string,
};

StatsAnalytics.defaultProps = {
  color: '',
  icon: '',
  stats: 0,
  error: '',
};

export default StatsAnalytics;
