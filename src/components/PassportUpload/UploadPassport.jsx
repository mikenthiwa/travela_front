import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toast from 'toastr';
import NoPassportAPI from '../../services/noPassportAPI';
import { closeModal, openModal } from '../../redux/actionCreator/modalActions';
import Modal from '../modal/Modal';
import PassportForm from '../Forms/TravelReadinessForm/PassportForm';
import { createTravelReadinessDocument, scanPassport } from '../../redux/actionCreator/travelReadinessActions';
import {
  fetchUserReadinessDocuments
} from '../../redux/actionCreator/travelReadinessDocumentsActions';
import { sendNoPassportNotification } from '../../redux/actionCreator/noPassportActions';
import './UploadPassport.scss';

export class UploadPassport extends Component {
  state = {
    passport: null,
    scanned: false,
    reason: ''
  };

  handleChoice = event => {
    const { value } = event.target;
    this.setState({
      passport: !!value,
      scanned: false,
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = () => {
    const { passport } =  this.state;
    const { history } = this.props;
    this.setState({scanned: passport}, () => {
      !passport && this.handleNoPassport();
      history.push('/all-done');
    });
  };

  handleModal = () => {
    const { openModal } = this.props;
    
    openModal(true, 'add passport');

    return;
  }

  isButtonDisabled = () => {
    const { passport, scanned } = this.state;
    const {document} = this.props;
    if (passport === null) {
      return true;
    }
    if (passport !== null && document.status === 201) {
      return false;
    }
    return !((passport && scanned) || !passport);
  }

  handleScanned = (documentType, documentValues) => {
    const { createTravelReadinessDocument } = this.props;
    createTravelReadinessDocument(documentType, documentValues);
    this.setState({ scanned: true });
  }

  renderPassportModal = () => {
    const {
      closeModal, shouldOpen,
      modalType, travelReadinessDocuments, showPassportForm,
      createTravelReadinessDocument, editTravelReadinessDocument,
      fetchUserData, user, document, fetchingDocument, scanPassport, passportInfo, retrieving
    } = this.props;
    

    return (
      <Modal
        customModalStyles="add-document-item"
        closeModal={closeModal} width="680px"
        visibility={(shouldOpen && (modalType === 'add passport' || modalType === 'edit passport'))
          ? 'visible' : 'invisible'}
        title={modalType === 'add passport' ? 'Add Passport Details' : 'Edit Passport Details'}
      >
        <PassportForm
          createTravelReadinessDocument={this.handleScanned}
          editTravelReadinessDocument={editTravelReadinessDocument}
          scanPassport={scanPassport}
          {...travelReadinessDocuments} fetchUserData={fetchUserData}
          closeModal={closeModal} user={user} 
          showPassportForm={showPassportForm}
          document={document} modalType={modalType} fetchingDocument={fetchingDocument}
          passportInfo={passportInfo} retrieving={retrieving}
        />
      </Modal>
    );
  };

  
handleNoPassport = () => {
  const { sendNoPassportNotification } = this.props;
  sendNoPassportNotification();
}
 

render() {
  const {
    passport,
    scanned,
    reason,
  } = this.state;
  const {document} = this.props;
  return (
    <Fragment>
      <div>
        <div className="passport-question">
          <p className="question-body">Do you have a Valid Passport?</p>
          <div className="body">
            <div className="radio-buttons">
            
              <label htmlFor="yes" className={passport ? 'radio-button new-class' : 'radio-button'}>
Yes
                <input
                  className="input-radio-button"
                  type="radio"
                  id="yes"
                  value
                  name="passport"
                  onChange={this.handleChoice}
                />
                <div className="check" />
              </label>
              <label htmlFor="no" className={!passport ? 'radio-button new-class extra-class' : 'radio-button extra-class'}>
No
                <input
                  className="input-radio-button"
                  type="radio"
                  id="no"
                  value=""
                  name="passport"
                  onChange={this.handleChoice}
                  disabled={document.status === 201}
                />
                <div className="check" />
              </label>
          
            </div>
            {passport ? (
              <div>
                <button
                  className="upload-btn"
                  type="button"
                  onClick={() => this.handleModal()}
                  disabled={document.status === 201}
                > 
                 
                  <p>UPLOAD PASSPORT</p>
                 
 
                </button>
                {this.renderPassportModal()}
    
              </div>
            ): passport === false ? (
              <div className="reason">
                <p>Reason</p>
                <textarea
                  className="reason-textarea check"
                  onChange={this.handleInputChange}
                  value={reason}
                  name="reason"
                  placeholder="Type Reason..."
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="next-btn">
        <button
          type="button"
          className="bg-btn bg-btn--active"
          disabled={this.isButtonDisabled()}
          onClick={() => this.handleSubmit()}
        >
       Next
        </button>
      </div>
    </Fragment>
  );
}
}

const mapStateToProps = ({ modal, travelReadinessDocuments, readiness, user }) => ({
  ...modal.modal, travelReadinessDocuments,
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading, user: user,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
  passportInfo: travelReadinessDocuments.passportInfo, 
  retrieving: travelReadinessDocuments.scanning, 
  showPassportForm: travelReadinessDocuments.showForm,
});

const matchDispatchToProps = {
  openModal, closeModal, createTravelReadinessDocument,
  fetchUserData: fetchUserReadinessDocuments,
  scanPassport,
  sendNoPassportNotification,
};

UploadPassport.propTypes = {
  closeModal: PropTypes.func.isRequired, openModal: PropTypes.func.isRequired,
  modalType: PropTypes.string, 
  shouldOpen: PropTypes.bool.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  scanPassport: PropTypes.func.isRequired,
  showPassportForm: PropTypes.bool.isRequired
};

UploadPassport.defaultProps = { modalType: 'add passport' };

export default connect(
  mapStateToProps, matchDispatchToProps
)(UploadPassport);
