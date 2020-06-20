import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WarningImg from '../../../images/warning-img.svg';
import './TripModificationsConfirmation.scss';
import Modal from '../../modal/Modal';

class TripModificationReasonModal extends Component {
  onCancel = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  onSubmit = () => {
    const { onSubmit, type, title, message } = this.props;
    onSubmit(type, title, message);
  };

  renderSubmitArea = () => {
    const { type } = this.props;
    return (
      <fieldset>
        <div className="trip-modification-confirmation-modal__submit-area">
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            onClick={this.onCancel} id="cancel">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => this.onSubmit()}
            className="submit-area__modifyTrip"
            id="submit"
          >
          Modify
          </button>
        </div>
      </fieldset>
    );
  };

  render() {
    const { closeModal, title, type, modalType, shouldOpen} = this.props;
    return (
      <div className="trip-modification-confirmation-modal">
        <Modal
          closeModal={closeModal}
          title={title}
          visibility={
            shouldOpen && modalType === `${type} request modification confirmation`
              ? 'visible': 'invisible'
          }
        >
          <div className="trip-modification-confirmation-modal__content">
            <img src={WarningImg} alt="Warning" />
            <div className="trip-modification-confirmation-modal__contentText">
              <p>A request modification would reset the status</p>
              <p>
                of your request back to
                <span className="trip-modification-confirmation-modal__contentTextOpen">Open</span>
                and undo all
              </p>
              <p>
                the previous
                <span className="trip-modification-confirmation-modal__contentTextApprovals">Approvals</span>
                If your changes to the
              </p>
              <p>request have financial implications.</p>
            </div>
          </div>
          {this.renderSubmitArea()}
        </Modal>
      </div>
    );
  }
}

TripModificationReasonModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

TripModificationReasonModal.defaultProps = {
  modalType: ''
};

export default TripModificationReasonModal;

