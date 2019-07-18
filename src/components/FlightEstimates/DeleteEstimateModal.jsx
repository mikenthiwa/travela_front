import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import SubmitArea from '../TravelStipends/FormFieldSets/SubmitArea';

class DeleteFlightEstimateModal extends Component {
  onCancel = (event) => {
    event.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  };

  onSend = (event) => {
    const { selectedEstimate: { id }, deleteFlightEstimate } = this.props;
    event.preventDefault();
    deleteFlightEstimate(id);
  };

  render = () => {
    const {
      closeModal,
      modalType,
      shouldOpen,
      isDeleting,
      selectedEstimate: { 
        originCountry, 
        destinationCountry, 
        originRegion, 
        destinationRegion }
    } = this.props;
    const displayOrigin = originCountry || originRegion;
    const displayDestination = destinationCountry || destinationRegion;
    return (
      <div>
        <Modal
          customModalStyles="delete-stipend"
          closeModal={closeModal}
          width="504px"
          visibility={shouldOpen && modalType === 'Delete flight estimate' ? 
            'visible' : 'invisible'}
          title="Confirm Delete"
        >
          <div className="content">
            <p>
              {'Are you sure you want to delete flight estimate for '}
              {displayOrigin}
              {' to '}
              {displayDestination}
              ?
            </p>
          </div>
          <hr />
          <SubmitArea 
            onCancel={this.onCancel} 
            onSend={this.onSend} 
            send="Delete" 
            loading={isDeleting} 
          />
        </Modal>
      </div>
    );
  };
}

DeleteFlightEstimateModal.propTypes = {
  closeModal: PropTypes.func,
  selectedEstimate: PropTypes.object,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  isDeleting: PropTypes.bool,
  deleteFlightEstimate: PropTypes.func.isRequired
};

DeleteFlightEstimateModal.defaultProps = {
  modalType: '',
  closeModal: () => {},
  shouldOpen: false,
  selectedEstimate: {},
  isDeleting: false
};

export default DeleteFlightEstimateModal;
