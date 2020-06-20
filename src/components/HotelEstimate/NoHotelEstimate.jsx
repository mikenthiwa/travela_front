import React from 'react';
import Icon from '../../images/no-document.svg';

const NoHotelEstimates = () => (
  <div className="no-templates list-templates">
    <div className="content no-estimates">
      <img src={Icon} alt="" />
      <p>No Hotel Estimates have been created</p>
    </div>
  </div>
);
export default NoHotelEstimates;
