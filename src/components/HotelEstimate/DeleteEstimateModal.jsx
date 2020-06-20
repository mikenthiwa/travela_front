import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import SubmitArea from '../TravelStipends/FormFieldSets/SubmitArea';
import './hotelEstimate.scss';

class DeleteEstimateModal extends Component {
  onCancel = event => {
    event.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  };

  onSend = event => {
    event.preventDefault();
    const {
      selectedEstimate: { id },
      deleteHotelEstimate
    } = this.props;
    deleteHotelEstimate(id);
  };

  render = () => {
    const {
      closeModal,
      modalType,
      shouldOpen,
      isDeleting,
      selectedEstimate: { country, region }
    } = this.props;
    return (
      <div>
        <Modal
          customModalStyles="delete-estimate"
          closeModal={closeModal}
          width="504px"
          visibility={
            shouldOpen && modalType === 'Delete hotel estimate'
              ? 'visible'
              : 'invisible'
          }
          title="Confirm Delete"
        >
          <div className="content">
            <p>
              {'Are you sure you want to delete estimate for '}
              {country}
              {region}
?
            </p>
          </div>
          <hr />
          <div className="submit-area">
            <SubmitArea
              onCancel={this.onCancel}
              onSend={this.onSend}
              send="Delete"
              loading={isDeleting}
            />
          </div>
        </Modal>
      </div>
    );
  };
}
DeleteEstimateModal.propTypes = {
  closeModal: PropTypes.func,
  selectedEstimate: PropTypes.object,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  isDeleting: PropTypes.bool,
  deleteHotelEstimate: PropTypes.func.isRequired
};

DeleteEstimateModal.defaultProps = {
  modalType: '',
  closeModal: () => {},
  shouldOpen: false,
  selectedEstimate: {},
  isDeleting: false
};

export default DeleteEstimateModal;
