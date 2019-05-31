import React from 'react';
import { Link } from 'react-router-dom';
import '../TravelStipends/TravelStipends.scss';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';

export const HotelEstimateCard = ({ region, country, estimate, regionId }) => {
  const linkToCountries = `/travel-cost/hotel-estimates?region=${regionId}&country=true`;
  const linkPointerEvent = !country ? 'auto' : 'none';

  return (
    <div className="card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--3-col-phone">
      <Link to={linkToCountries} style={{ pointerEvents: linkPointerEvent }}>
        <div className="card_title">
          {region}
          {country}
          {' '}
        </div>
        <div className="card_stipend">
          &#36;
          {estimate}
          {' '}
        </div>
        <p className="card_p">Hotel Estimate</p>
      </Link>
    </div>
  );
};

export const HotelEstimateCards = ({ estimates }) => {
  return (
    <div className="stipend-list mdl-grid">
      {estimates.map(estimate => {
        return (
          <HotelEstimateCard
            key={estimate.id}
            id={estimate.id}
            region={estimate.region}
            regionId={estimate.regionId}
            country={estimate.country}
            estimate={estimate.amount}
          />
        );
      })}
    </div>
  );
};

HotelEstimateCard.propTypes = {
  region: PropTypes.string,
  country: PropTypes.string,
  estimate: PropTypes.number.isRequired,
  regionId: PropTypes.number
};

HotelEstimateCards.propTypes = {
  estimates: PropTypes.array.isRequired
};

HotelEstimateCard.defaultProps = {
  country: '',
  regionId: null,
  region: ''
};

export default withLoading(HotelEstimateCards, RequestPlaceholder);
