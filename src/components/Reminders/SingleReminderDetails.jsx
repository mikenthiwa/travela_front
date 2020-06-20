import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Modal from '../modal/Modal';
import ReminderItem from './ReminderItem';
import SubmitArea from '../Forms/NewEmailTemplateForm/FormFieldSets/SubmitArea';
import Preloader from '../Preloader/Preloader';
import Utils from '../../helper/Utils';
import './SingleReminderDetails.scss';

class SingleReminderDetails extends Component {

  handleOnSend = (event) => {
    event.preventDefault();
    const { history, singleReminder: { data: { id } }  } = this.props;
    history.push(`/settings/reminders/edit/${id}`);
  }
  
  handleCancel (event, closeModal){
    event.preventDefault();
    closeModal();
  }

  renderReminderDetails(reminders, conditionName) {
    return (
      <div className="reminder_details">
        {reminders.map(
          (reminder, index) => (
            <ReminderItem 
              key={reminder.id} 
              reminder={reminder} 
              index={index + 1}
              conditionName={conditionName}
            />
          )
        )}
      </div>
    );
  }

  render () {
    const {
      closeModal, 
      modalType, 
      shouldOpen, 
      singleReminder: { data }, 
      activeDocument,
      conditionId
    } = this.props;
    const { conditionName, reminders } = data;
    return(
      <div className="reminder__deatails">
        <Modal
          customModalStyles="template-details"
          closeModal={closeModal} width="504px"
          visibility={(shouldOpen && (modalType === `reminder details${conditionId}`))
            ? 'visible' : 'invisible'}
          title={`${Utils.makeTitleCase(activeDocument)} Expiry Reminder`}>
          { isEmpty(data.reminders) ? <Preloader /> : (
            <Fragment>
              {this.renderReminderDetails(reminders, conditionName)}
              <hr />
              <div className="submit-area">
                <SubmitArea 
                  onCancel={(event) => this.handleCancel(event, closeModal)}
                  onSend={(event) => this.handleOnSend(event)}
                  send="Edit Reminder Condition"
                  reversed
                />
              </div>
            </Fragment>
          )}
        </Modal>
      </div>
    );
  }
}

SingleReminderDetails.propTypes = {
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  conditionId: PropTypes.number,
  singleReminder: PropTypes.object,
  activeDocument: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

SingleReminderDetails.defaultProps = {
  modalType: '',
  conditionId: null,
  closeModal: () => { },
  shouldOpen: false,
  singleReminder: {
    data: {
      reminders: []
    },
  },
};

export default SingleReminderDetails;
