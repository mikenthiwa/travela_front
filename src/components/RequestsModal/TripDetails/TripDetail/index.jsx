import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../../RequestsModal.scss';

const TripDetail = (props) => {
  const {label, value } = props;
  return (
    <div className="modal__trip-detail">
      <div className="modal__trip-detail-label">
        {label}
      </div>
      <div className="modal__trip-detail-text">
        {value}
      </div>
    </div>
  );
};

TripDetail.propTypes = {
  label: PropTypes.string.isRequired,
  value:PropTypes.string.isRequired
};


export default TripDetail;
