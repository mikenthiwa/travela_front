import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import './index.scss';
import Preloader from '../Preloader/Preloader';

class DocumentTypesForm extends Component {

  state = {
    value: '',
    error: ''
  }

  inputRef = createRef();

  componentDidUpdate(prevProps) {
    const { shouldOpen } = this.props;
    shouldOpen !== prevProps.shouldOpen && this.resetState();
    this.inputRef.current && this.inputRef.current.focus();
  }
  
  resetState = () => {
    const { initialValue: value } = this.props;
    this.setState({ value, error: '' });
  }

  nameInputValidator = value => this.setState({ error: value ? '' : 'this field is required' });
 
  onInputChange = ({ target: { value }}) => {
    this.setState({
      value,
    }, this.nameInputValidator(value));
  }

  onSubmit = () => {
    const { createDocumentTypes, editDocumentTypes, modalType } = this.props;
    const { value } = this.state;
    if (modalType === 'EDIT_DOCUMENT_TYPE') editDocumentTypes(value);
    else createDocumentTypes({ name: value });
  }

  renderForm = () => {
    const { value, error } = this.state;
    const { closeModal, isLoading } = this.props;
    return (
      <div className="document-type-form">
        <label className="input-label" htmlFor="create-document-type-form">
          <span className="label-text">Name</span>
          <input
            id="create-document-type-form"
            type="text"
            className={`document-type-input form-input ${error ? 'error' : ''}`}
            value={value}
            onChange={this.onInputChange}
            name="name"
            ref={this.inputRef}
          />
          <div className="input-errors">{error}</div>
        </label>
        <div className="document-type-button wrapper">
          <button
            type="button"
            onClick={closeModal}
            className="close-button"
          >
            CLOSE
          </button>
          <button
            type="button"
            onClick={this.onSubmit}
            className="save-button"
            disabled={isLoading || error || !value}
          >
            SAVE
            {isLoading && <Preloader />}
          </button>
        </div>
      </div>
    );
  }
  render() {
    const { shouldOpen, modalType, closeModal } = this.props;
    const visibility = shouldOpen && modalType === 'CREATE_DOCUMENT_TYPE' || modalType === 'EDIT_DOCUMENT_TYPE'
      ? 'visible' : 'invisible';
    return (
      <Modal
        customModalStyles="modal--add-user"
        visibility={visibility}
        title={`${modalType === 'EDIT_DOCUMENT_TYPE' ? 'Edit' : 'Add'} Document Type`}
        width="480px"
        closeModal={closeModal}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

DocumentTypesForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  initialValue: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  editDocumentTypes: PropTypes.func.isRequired,
  createDocumentTypes: PropTypes.func.isRequired,
};

DocumentTypesForm.defaultProps = {
  modalType: '',
};

export default DocumentTypesForm;
