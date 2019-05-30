import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TripModifications.scss';
import Modal from '../modal/Modal';
import ButtonLoadingIcon from '../Forms/ButtonLoadingIcon';
import FormContext from '../Forms/FormsAPI/FormContext/FormContext';
import InputRenderer from '../Forms/FormsAPI';

class TripModificationReasonModal extends Component {

  state = {
    values: {
      reason: ''
    },
    errors: {
    },
    hasBlankFields: true
  };

  inputRenderer = new InputRenderer({
    inputLabels: {
      reason: {
        label: ''
      }
    }
  });

  componentWillReceiveProps(nextProps){
    const { message } = nextProps;
    this.inputRenderer = new InputRenderer({
      inputLabels: {
        reason: {
          label: message
        }
      }
    });
  }

  onCancel = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  renderSubmitArea = () => {
    const { type, submittingReason } = this.props;
    const { hasBlankFields } = this.state;
    return (
      <fieldset>
        <div className="submit-area">
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            onClick={this.onCancel} id="cancel">
          Cancel
          </button>
          <button
            type="submit"
            disabled={hasBlankFields}
            className="restore-checklist-items__footer--delete"
            id="oncancel"
          >
            <ButtonLoadingIcon isLoading={submittingReason} buttonText={type} />
          </button>
        </div>
      </fieldset>
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, closeModal } = this.props;
    const { values: { reason }} = this.state;
    onSubmit(reason);
    closeModal();
    this.setState({ values: { reason: ''}});
  };

  render() {
    const { closeModal, title, type, modalType, shouldOpen} = this.props;
    const { values, errors } = this.state;
    const { renderInput } = this.inputRenderer;
    return (
      <div className="trip-modification-reason-modal">
        <Modal
          closeModal={closeModal}
          title={title}
          visibility={
            shouldOpen && modalType === `${type} request modification`
              ? 'visible': 'invisible'
          }
        >
          <FormContext values={values} targetForm={this} errors={errors}>
            <form onSubmit={this.onSubmit}>
              <div className="trip-modification-reason-modal__content">
                <div className="trip-modification-reason-modal__content__body">
                  {renderInput('reason', 'textarea', { maxLength: 140 })}
                </div>
                {this.renderSubmitArea()}
              </div>
            </form>
          </FormContext>
        </Modal>
      </div>
    );
  }
}

TripModificationReasonModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  submittingReason: PropTypes.bool,
  modalType: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

TripModificationReasonModal.defaultProps = {
  submittingReason: false,
  modalType: ''
};

export default TripModificationReasonModal;

