import {connect} from 'react-redux';
import React, { Fragment } from 'react';
import Base from '../../Base';
import PageHeader from '../../../components/PageHeader';
import NewEmailTemplateForm from '../../../components/Forms/NewEmailTemplateForm';
import {createReminderEmailTemplate} from '../../../redux/actionCreator/reminderManagementActions';
import '../ReminderSetup.scss';
import {getAllUsersEmail} from '../../../redux/actionCreator/userActions';

class CreateEmailTemplate extends Base{

  render() {
    return (
      <Fragment>
        <div className="readiness-header">
          <PageHeader
            addLink
            title="CREATE AN EMAIL TEMPLATE"
            iconLink="/settings/reminder-setup"
          />
          <div className="reminder-email-template__container">
            <NewEmailTemplateForm {...this.props} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ reminderManagement }) => ({
  ...reminderManagement
});


export default connect(mapStateToProps, { createReminderEmailTemplate, getAllUsersEmail }) (CreateEmailTemplate);
