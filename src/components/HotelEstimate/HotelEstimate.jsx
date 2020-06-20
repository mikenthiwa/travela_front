import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import WithLoadingHotelEstimateCards from './HotelEstimateCard';
import NoHotelEstimates from './NoHotelEstimate';
import DeleteEstimateModal from './DeleteEstimateModal';

class ListHotelEstimates extends Component {
  render() {
    const {
      listAllhotelEstimates: { selectedEstimate, estimates, isLoading },
      modalType, openModal, closeModal, shouldOpen,
      fetchSingleHotelEstimate, deleteHotelEstimate, isDeleting
    } = this.props;

    return (
      <div>
        {isLoading ? (
          <Preloader />
        ) : (
          <Fragment>
            {estimates.length > 0 ? (
              <div>
                <DeleteEstimateModal
                  deleteHotelEstimate={deleteHotelEstimate}
                  modalType={modalType}
                  closeModal={closeModal}
                  shouldOpen={shouldOpen}
                  selectedEstimate={selectedEstimate}
                  isDeleting={isDeleting}
                />
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
  modalType: PropTypes.string,
  isDeleting: PropTypes.bool,
  deleteHotelEstimate: PropTypes.func
};

ListHotelEstimates.defaultProps = {
  deleteHotelEstimate: () => {},
  modalType: '',
  shouldOpen: false,
  isDeleting: false
};

export default ListHotelEstimates;
