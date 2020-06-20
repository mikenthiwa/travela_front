import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import './GuestHouseDetailCard.scss';

class GuestHouseDetailCard extends PureComponent {
  render() {
    const {label, value, period} = this.props;
    return (
      <div className="guesthouse-detail-card">
        <div className="guesthouse-detail-card__description">
          <div className="description-type">
            {label}
          </div>
          <div className="time-font">
            {period || 'Today'}
          </div>
        </div>
        <div className="guesthouse-detail-card__value">
          {value}
        </div>
      </div>
    );
  }
}

GuestHouseDetailCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  period:  PropTypes.string.isRequired,
};

export default GuestHouseDetailCard;
