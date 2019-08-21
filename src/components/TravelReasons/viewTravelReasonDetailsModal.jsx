import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from '../modal/Modal';
import FormContext from '../Forms/FormsAPI/FormContext/FormContext';
import formMetadata from '../Forms/FormsMetadata/NewTravelReasonFormMetadata/TravelReasonDetails';
import PreLoader from '../Preloader/Preloader';
import './travelReasons.scss';

const RenderTravelReasonDetails = (props) => {
  const { closeModal, reasonDetails } = props;
  return (
    <Fragment>
      <div>
        <div className="veiw-titles">TITLE:</div>
        <p className="show-reason"> 
          {_.capitalize(reasonDetails.title)}
        </p>
      </div>
        
      <div>
        <div className="veiw-titles">REASON:</div>
        <p className="show-reason">
          {_.capitalize(reasonDetails.description)}
        </p>
      </div>
      
      <button
        type="button" onClick={closeModal} id="cancel" style={{color:'red'}}
        className="bg-btn bg-btn--inactive bg-btn--reason">
          Cancel
      </button>
    </Fragment>
  );
};

const ViewTravelReasonDetailsModal = (props) => {
  const { shouldOpen, closeModal, modalType, reasonDetails, id, isFetching } = props;
  return (
    <Modal
      customModalStyles="modal--view-reason" closeModal={closeModal} width="480px" title="Travel Reason Details"
      visibility={shouldOpen && modalType === `view travel reason details-${id}` ? 'visible' : 'invisible'}
    >
      <Fragment>
        <FormContext>
          <form className="reason-details">
            {isFetching ?
              <PreLoader /> :
              RenderTravelReasonDetails({closeModal, reasonDetails})
            }
          </form>
        </FormContext>
      </Fragment>
    </Modal>
  );
};

ViewTravelReasonDetailsModal.propTypes = {
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  id: PropTypes.number,
  reasonDetails: PropTypes.object,
  isFetching: PropTypes.bool,
};

RenderTravelReasonDetails.propTypes = {
  closeModal: PropTypes.func,
  reasonDetails: PropTypes.object,
};

ViewTravelReasonDetailsModal.defaultProps = {
  closeModal: null,
  modalType: null,
  shouldOpen: false,
  id: '',
  reasonDetails: {},
  isFetching: false,
};

RenderTravelReasonDetails.defaultProps = {
  closeModal: null,
  reasonDetails: {},
};

export default ViewTravelReasonDetailsModal;
