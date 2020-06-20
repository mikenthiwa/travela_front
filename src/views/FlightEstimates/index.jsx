import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  fetchAllFlightEstimates,
  createFlightEstimate,
  fetchSingleFlightEstimate,
  updateFlightEstimate,
  deleteFlightEstimate
} from '../../redux/actionCreator/flightEstimatesActions';
import { fetchRegions } from '../../redux/actionCreator/travelRegionActions';

import { NewFlightEstimateForm } from '../../components/Forms';
import PageHeader from '../../components/PageHeader';
import ListFlightEstimates from '../../components/FlightEstimates/FlightEstimates';

export class FlightEstimates extends Component {
  componentDidMount = () => {
    const { fetchRegions } = this.props;
    fetchRegions();
  };

  renderCreateFlightEstimateModal = () => {
    const { openModal } = this.props;
    openModal(true, 'create flight estimate');
  };
  
  renderNewFlightEstimateForm() {
    const {
      modalType,
      shouldOpen,
      closeModal,
      createFlightEstimate,
      listAllFlightEstimates,
      history,
      fetchSingleFlightEstimate,
      updateFlightEstimate,
      travelRegion
    } = this.props;
    const editing = /edit flight estimate/.test(modalType);
    return (
      <Modal
        customModalStyles="modal--add-user"
        width="480px"
        visibility={shouldOpen && /(create|edit) flight estimate/.test(modalType) ? 'visible' : 'invisible'}
        title={editing ? 'Edit Flight Estimate' : 'Add Flight Estimate'}
        closeModal={closeModal}
      >
        <NewFlightEstimateForm
          history={history}
          closeModal={closeModal}
          handleCreateFlightEstimate={createFlightEstimate}
          listAllFlightEstimates={listAllFlightEstimates}
          editing={editing}
          fetchSingleFlightEstimate={fetchSingleFlightEstimate}
          updateFlightEstimate={updateFlightEstimate}
          travelRegion={travelRegion}
        />
      </Modal>
    );
  }

  render() {
    const {
      fetchAllFlightEstimates,
      listAllFlightEstimates,
      fetchSingleFlightEstimate,
      deleteFlightEstimate,
      flightEstimates,
      shouldOpen,
      modalType,
      openModal,
      closeModal,
    } = this.props;
    const title = 'FLIGHT ESTIMATES';
    return (
      <Fragment>
        <div className="travelStipends--header">
          <PageHeader
            title={`${title}`}
            actionBtn="Add Estimate"
            actionBtnClickHandler={this.renderCreateFlightEstimateModal}
          />
        </div>
        {this.renderNewFlightEstimateForm()}
        <ListFlightEstimates
          history={history}
          listAllFlightEstimates={listAllFlightEstimates}
          fetchAllFlightEstimates={fetchAllFlightEstimates}
          fetchSingleFlightEstimate={fetchSingleFlightEstimate}
          deleteFlightEstimate={deleteFlightEstimate}
          flightEstimates={flightEstimates}
          openModal={openModal}
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
        />
      </Fragment>
    );
  }
}

FlightEstimates.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  fetchSingleFlightEstimate: PropTypes.func.isRequired,
  createFlightEstimate: PropTypes.func,
  listAllFlightEstimates: PropTypes.object,
  fetchAllFlightEstimates: PropTypes.func.isRequired,
  updateFlightEstimate: PropTypes.func,
  deleteFlightEstimate: PropTypes.func,
  history: PropTypes.object,
  flightEstimates: PropTypes.object,
  travelRegion: PropTypes.array.isRequired,
  fetchRegions: PropTypes.func.isRequired
};

FlightEstimates.defaultProps = {
  openModal: null,
  closeModal: null,
  modalType: '',
  listAllFlightEstimates: {
    flightEstimates: []
  },
  createFlightEstimate: () => {},
  updateFlightEstimate: () => {},
  deleteFlightEstimate: () => {},
  flightEstimates: {},
  history: {
    push: () => {}
  }
};

export const mapStateToProps = ({ modal, listAllFlightEstimates, travelRegion:{regions} }) => ({
  ...modal.modal,
  listAllFlightEstimates,
  travelRegion:regions
});

const actionCreators = {
  openModal,
  closeModal,
  createFlightEstimate,
  fetchAllFlightEstimates,
  fetchSingleFlightEstimate,
  updateFlightEstimate,
  deleteFlightEstimate,
  fetchRegions
};

export default connect(mapStateToProps, actionCreators)(FlightEstimates);
