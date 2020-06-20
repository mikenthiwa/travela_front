import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import WithLoadingFlightEstimateCards from './FlightEstimatesCard';
import NoFlightEstimates from './NoFlightEstimates';
import DeleteFlightEstimateModal from './DeleteEstimateModal';

class ListFlightEstimates extends Component {

  componentDidMount() {
    const { fetchAllFlightEstimates } = this.props;
    fetchAllFlightEstimates();
  }
  render() {
    const {
      listAllFlightEstimates: { 
        flightEstimates,  
        isLoading, 
        selectedEstimate },
      modalType, 
      openModal, 
      closeModal, 
      shouldOpen, 
      isDeleting,
      fetchSingleFlightEstimate, 
      deleteFlightEstimate 
    } = this.props;
    return (
      <div>
        {isLoading
          ? <Preloader />
          : (
            <Fragment>
              {flightEstimates.length > 0 ? (
                <div>
                  <DeleteFlightEstimateModal
                    deleteFlightEstimate={deleteFlightEstimate}
                    modalType={modalType}
                    closeModal={closeModal}
                    shouldOpen={shouldOpen}
                    selectedEstimate={selectedEstimate}
                    isDeleting={isDeleting}
                  />
                  <WithLoadingFlightEstimateCards
                    flightEstimates={flightEstimates}
                    openModal={openModal}
                    fetchSingleFlightEstimate={fetchSingleFlightEstimate}
                  />
                </div>
              ) :
                (<NoFlightEstimates />)}
            </Fragment>
          )}
      </div>
    );
  }
}

ListFlightEstimates.propTypes = {
  fetchAllFlightEstimates: PropTypes.func.isRequired,
  listAllFlightEstimates: PropTypes.object.isRequired,
  fetchSingleFlightEstimate: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  isDeleting: PropTypes.bool,
  deleteFlightEstimate: PropTypes.func
};

ListFlightEstimates.defaultProps = {
  deleteFlightEstimate: () =>{},
  modalType: '',
  shouldOpen: false,
  isDeleting: false
};

export default ListFlightEstimates;
