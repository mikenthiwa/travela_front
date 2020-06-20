import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReminderTable from './ReminderTable';
import PageHeader from '../../components/PageHeader';
import {
  fetchEmailReminder,
  disableReminderCondition,
  enableDisabledReminderCondition
} from '../../redux/actionCreator/emailReminderAction';
import { getSingleReminder } from '../../redux/actionCreator/reminderActions';
import NoEmailReminder from '../../components/EmailReminderSetup/NoEmailReminder';
import './Reminder.scss';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import DisableReminderTemplateForm from '../../components/Forms/DisableReminderTemplateForm/DisableReminderTemplate';
import EnableDisabledReminderConditionForm from '../../components/Forms/EnableReminderEmailTemplateForm/EnableReminderEmailTemplateForm';
import TemplatesPagination from '../../components/ReminderSetup/TemplatesPagination';


export class Reminders extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeDocument: 'passport',
      disableReason: '',
      conditionId: '',
      conditionName: '',
      conditionReason: ''
    };
  }

  componentDidMount() {
    const { location: { search }, fetchEmailReminder} = this.props;
    const params = new URLSearchParams(search);
    const document = params.get('document') || 'passport';
    const page = params.get('page') || 1;
    fetchEmailReminder({document, page});
    this.setCurrentDocument(document);
  }

  setCurrentDocument = (activeDocument) => {
    this.setState({ activeDocument});
  };

  setItemToDisable = (check,reminder, reason,event) => {
    const { openModal } = this.props;
    if (reminder.disabled && event.target.textContent === 'Enable') {
      this.setState({
        conditionId: reminder.id,
      });
      openModal(true, 'enable disabled reminder');
    } else {
      this.setState({
        conditionId: reminder.id,
        conditionName: reminder.conditionName,
        conditionReason: reason || ''
      });
      openModal(true, 'disable reminder condtion');
    }
  }

  handleInputChange = (event) => {
    this.setState({ disableReason: event.target.value });
  }

  disableEmailReminder = (event) => {
    event.preventDefault();
    const { disableReminderCondition } = this.props;
    const { conditionId } = this.state;
    disableReminderCondition(conditionId, this.state);
    this.setState({ disableReason: null });
  }

  enableDisabledReminder = (event) => {
    event.preventDefault();
    const { enableDisabledReminderCondition } = this.props;
    const { conditionId } = this.state;
    enableDisabledReminderCondition(conditionId);
  }

  onPageChangeEvent = (previousOrNext) => {
    const { activeDocument: document } = this.state;
    const {  meta: {pagination: {currentPage}},  history } = this.props;
    const page = currentPage + (previousOrNext === 'previous' ? -1 : 1);
    history.push(`/settings/reminders?document=${document}&page=${page}`);
  };


  isActive = (buttonState) => {
    const {activeDocument} = this.state;
    return activeDocument === buttonState;
  };

  toggleButton = (type) => {
    const { history } = this.props;
    history.push(`/settings/reminders?document=${type}`);
  };

  renderDisableReminderConditionForm() {
    const { shouldOpen, modalType, closeModal, isDisabling } = this.props;
    const { itemName, disableReason, templateReason, conditionReason } = this.state;
    return (
      <DisableReminderTemplateForm
        shouldOpen={shouldOpen} 
        disableEmailReminder={this.disableEmailReminder}
        handleInputChange={this.handleInputChange} 
        itemName={itemName}
        disableReason={disableReason}
        modalType={modalType}
        closeModal={closeModal}
        templateReason={templateReason}
        conditionReason={conditionReason}
        isDisabling={isDisabling}
      />
    );
  }

  renderEnableDisabledReminderConditionForm() {
    const { shouldOpen, modalType, closeModal, isEnablingReminder } = this.props;
    const { itemName } = this.state;
    return (
      <EnableDisabledReminderConditionForm
        shouldOpen={shouldOpen} 
        isEnabling={isEnablingReminder}
        enableReminder={this.enableDisabledReminder}
        itemName={itemName} 
        modalType={modalType} 
        closeModal={closeModal} 
      />
    );
  }

  renderReminderDocumentButton = (text, active, onclick, total, otherProps) => {
    let className = 'document-button_group';
    return (
      <button
        className={`${className}${active? '__active': '__inactive'}`}
        type="button"
        onClick={onclick}
        {...otherProps}
      >
        {text}
        &ensp;
        <span>
          {total && total !== 0 && total}
        </span>
      </button>
    );
  };

  renderButtonGroup = () => {
    const {meta, history } = this.props;
    return (
      <div className="document_header_group_button">
        <div>
          {this.renderReminderDocumentButton('Passports',
            this.isActive('passport'),
            () =>this.toggleButton('passport'),
            meta.documentCount.Passport || 0,
            {id: 'passportButton'}
          )}

          {this.renderReminderDocumentButton('Visas',
            this.isActive('visa'),
            () =>this.toggleButton('visa'),
            meta.documentCount.Visa || 0,
            {id: 'visaButton'}
          )}
        </div>
        <button
          onClick={() => { history.push('/settings/reminders/create');}}
          type="button"
          className="create-new">
          CREATE NEW
        </button>
      </div>
    );
  }

  renderRemindersTable = () => {
    const { reminders, history, getSingleReminder, singleReminder, isLoading } = this.props;
    const  { activeDocument } = this.state;
    return (
      <Fragment>
        <ReminderTable
          fetchEmailReminder={fetchEmailReminder}
          activeDocument={activeDocument}
          reminders={reminders} 
          setItemToDisable={this.setItemToDisable}
          history={history}
          isLoading={isLoading}
          getSingleReminder={getSingleReminder}
          singleReminder={singleReminder}
        />
      </Fragment>
    );
  }

  renderRemindersPagination = () => {
    const { meta: {pagination} } = this.props;
    return (
      <Fragment>
        <TemplatesPagination
          onPageChange={this.onPageChangeEvent}
          pageCount={pagination.pageCount?pagination.pageCount: 1}
          currentPage={pagination.currentPage? pagination.currentPage: 1}
        />
      </Fragment>
    );
  }

  render() {
    const { reminders, meta: {pagination}, isLoading } = this.props;
    return (
      <Fragment>
        <PageHeader
          title="REMINDER CONDITIONS"
        />
        {!isLoading && this.renderButtonGroup()}
        <div>
          {' '}
          { this.renderRemindersTable() }
          {(!isLoading && reminders.length !== 0) && this.renderRemindersPagination() }
        </div>
        {this.renderDisableReminderConditionForm()}
        {this.renderEnableDisabledReminderConditionForm()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal,
  fetchEmailReminder,
  disableReminderCondition,
  enableDisabledReminderCondition,
  getSingleReminder,
};

const mapStateToProps = ({ modal, emailReminders, reminders }) => ({
  ...modal.modal,
  ...reminders,
  ...emailReminders,
  isDisabling: emailReminders.disabling,
  isEnablingReminder: emailReminders.enabling,
});

Reminders.propTypes = {
  history: PropTypes.object.isRequired,
  disableReminderCondition: PropTypes.func.isRequired,
  enableDisabledReminderCondition: PropTypes.func.isRequired,
  fetchEmailReminder: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
