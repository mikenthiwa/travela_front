import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import '../Documents/Documents.scss';

class ReadinessInteractiveModal extends Component {
  constructor(props) {
    super(props);
  }

  getContext = documentContext => {
    return documentContext === 'other' ? 'document' : documentContext;
  };

  renderInteractiveModal() {
    const { closeModal, shouldOpen, modalType, documentContext, handleModals } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="add-checklist-item delete-document"
        width="480px"
        visibility={
          shouldOpen && modalType === 'interactive' ? 'visible' : 'invisible'
        }
        title={`Add another  ${this.getContext(documentContext) }`}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Do you have another
          <strong>
            { `${this.getContext(documentContext) } ?`}
          </strong>
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button
            type="button"
            className="delete-checklist-item__footer--cancel"
            id="no" onClick={closeModal}>
            No
          </button>
          <button
            type="button" id="yes"
            className="bg-btn delete-document-button-yes"
            onClick={()=> handleModals(documentContext)}>
            Yes
          </button>
        </div>
      </Modal>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderInteractiveModal()}
      </Fragment>
    );
  }
}

const interactiveModalPropTypes = {
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  handleModals: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  documentContext: PropTypes.string.isRequired,
};

ReadinessInteractiveModal.propTypes = { ...interactiveModalPropTypes };

export default ReadinessInteractiveModal;
