import React from 'react';
import { Link } from 'react-router-dom';
import '../TravelStipends/TravelStipends.scss';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';

const handleAction = (action, id, openModal, fetchSingleHotelEstimate) => {
  action === 'edit' && openModal(true, 'edit hotel estimate');
  action === 'delete' && openModal(true, 'Delete hotel estimate');
  fetchSingleHotelEstimate(id);
};

export const HotelEstimateCard = ({
  region,
  country,
  estimate,
  openModal,
  id,
  fetchSingleHotelEstimate,
  regionId
}) => {
  const linkToCountries = `/travel-cost/hotel-estimates?region=${regionId}&country=true`;
  const linkPointerEvent = !country ? 'auto' : 'none';

  return (
    <div className="card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--3-col-phone">
      <div className="travel_stipend_menu">
        <ContextMenu classNames="table__menu-container">
          <MenuItem
            classNames="edit"
            onClick={() =>
              handleAction('edit', id, openModal, fetchSingleHotelEstimate)
            }
          >
            Edit
          </MenuItem>
          <MenuItem
            classNames="delete"
            onClick={() =>
              handleAction('delete', id, openModal, fetchSingleHotelEstimate)
            }
          >
            Delete
          </MenuItem>
        </ContextMenu>
      </div>
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

export const HotelEstimateCards = ({
  estimates,
  openModal,
  fetchSingleHotelEstimate
}) => {
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
            openModal={openModal}
            fetchSingleHotelEstimate={fetchSingleHotelEstimate}
          />
        );
      })}
    </div>
  );
};

HotelEstimateCard.propTypes = {
  region: PropTypes.string,
  country: PropTypes.string,
  estimate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  fetchSingleHotelEstimate: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  regionId: PropTypes.number
};

HotelEstimateCards.propTypes = {
  estimates: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchSingleHotelEstimate: PropTypes.func.isRequired
};

HotelEstimateCard.defaultProps = {
  estimate: null,
  country: '',
  regionId: null,
  region: ''
};

export default withLoading(HotelEstimateCards, RequestPlaceholder);
