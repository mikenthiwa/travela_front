import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TemplateDetailsForm from '../Forms/NewEmailTemplateForm/TemplateDetailsForm';
import Modal from '../modal/Modal';


class TemplateDetailsModal extends Component {

    render = () => {
      const { closeModal, modalType, shouldOpen, selectedTemplate, history } = this.props;
      return(
        <div>
          <Modal
            customModalStyles="template-details"
            closeModal={closeModal} width="504px"
            visibility={(shouldOpen && (modalType === 'template details'))
              ? 'visible' : 'invisible'}
            title="View Details"
            modalContentId="template-modal">
            <TemplateDetailsForm
              closeModal={closeModal}
              selectedTemplate={selectedTemplate}
              history={history} />
          </Modal>
        </div>
      );
    };
}

TemplateDetailsModal.propTypes = {
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  selectedTemplate: PropTypes.object,
  history: PropTypes.object.isRequired
};

TemplateDetailsModal.defaultProps = {
  modalType: '',
  closeModal: () => { },
  shouldOpen: false,
  selectedTemplate:{}
};

export default TemplateDetailsModal;
