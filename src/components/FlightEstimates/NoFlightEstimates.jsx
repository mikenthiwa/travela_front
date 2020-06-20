import React from 'react';
import Icon from '../../images/no-document.svg';

const NoFlightEstimates = () => (
  <div className="no-templates list-templates">
    <div className="content no-estimates">
      <img src={Icon} alt="" />
      <p>No Flight Estimates have been created</p>
    </div>
  </div>
);
export default NoFlightEstimates;
