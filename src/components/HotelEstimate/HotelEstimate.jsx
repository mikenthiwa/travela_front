import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import WithLoadingHotelEstimateCards from './HotelEstimateCard';
import NoHotelEstimates from './NoHotelEstimate';

class ListHotelEstimates extends Component {
  render() {
    const {
      listAllhotelEstimates: { estimates, isLoading },
      modalType,
      openModal,
      closeModal,
      shouldOpen,
      fetchSingleHotelEstimate
    } = this.props;

    return (
      <div>
        {isLoading ? (
          <Preloader />
        ) : (
          <Fragment>
            {estimates.length > 0 ? (
              <div>
                <WithLoadingHotelEstimateCards
                  estimates={estimates}
                  openModal={openModal}
                  fetchSingleHotelEstimate={fetchSingleHotelEstimate}
                />
              </div>
            ) : (
              <NoHotelEstimates />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

ListHotelEstimates.propTypes = {
  listAllhotelEstimates: PropTypes.object.isRequired,
  fetchSingleHotelEstimate: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string
};

ListHotelEstimates.defaultProps = {
  modalType: '',
  shouldOpen: false
};

export default ListHotelEstimates;
