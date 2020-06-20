import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const AnalyticsCard = ({ title, children }) => (
  <div className="analytics-card">
    <h3 className="analytics-card__title">{title}</h3>
    {children}
  </div>
);

AnalyticsCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
};

export default AnalyticsCard;
