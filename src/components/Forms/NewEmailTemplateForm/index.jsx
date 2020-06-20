import React from 'react';
import { PropTypes } from 'prop-types';
import { isEmpty } from 'lodash';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import EmailTemplateDetails from './FormFieldSets/EmailTemplateDetails';
import './NewEmailTemplateForm.scss';
import SubmitArea from './FormFieldSets/SubmitArea';
import Preloader from '../../Preloader/Preloader';

class NewEmailTemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      optionalFields: ['cc'],
      values: {
        name: '',
        from: '',
        cc: [],
        subject: '',
        message: ''
      },
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    const {
      getSingleReminderEmailTemplate,
      match: {
        params: { templateId }
      },
      history,
      getAllUsersEmail
    } = this.props;
    getSingleReminderEmailTemplate(templateId, history);
    getAllUsersEmail();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ errors: nextProps.editing ?
      nextProps.updatedEmailTemplate.errors :  nextProps.newEmailTemplate.errors });
    this.setUpdateData(nextProps);
    if (nextProps.data && !isEmpty(nextProps.data.cc)) {
      const {
        data: { name, from, cc, subject, message, id }
      } = nextProps;

      this.setState({
        values: {
          name,
          from,
          cc: cc.filter(c => c !== '').length === 0 ? null : cc,
          subject,
          message,
          id
        }
      });
    }
  }

  setUpdateData = ({ editing, updatedEmailTemplate}) => {
    if (editing && updatedEmailTemplate.data){
      const {data: { name, from, message, subject, id, cc} } = updatedEmailTemplate;
      this.setState({values: {
        name,
        from,
        message,
        subject,
        id,
        cc: cc.filter(c => c !== '').length === 0 ? null : cc,
      }});
    }
  }

  hasErrors = () => {
    const { errors, values } = this.state;
    return Object.keys(values).some(value => errors[value]);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { values, hasBlankFields } = this.state;
    const { cc } = values;
    if (!hasBlankFields) {
      const {
        createReminderEmailTemplate,
        history,
        editing,
        updateSingleReminderEmailTemplate
      } = this.props;
      if (editing) {
        updateSingleReminderEmailTemplate(values.id, history, {
          ...values,
          cc: cc || []
        });
      } else {
        createReminderEmailTemplate({ ...values, cc: cc || [] }, history);
      }
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/settings/reminder-setup');
  };

  renderEmailTemplate(disabled, values){
    const { newEmailTemplate, getUsersEmail, editing, updatedEmailTemplate } = this.props;
    const loading = updatedEmailTemplate && updatedEmailTemplate.isSaving
      || newEmailTemplate && newEmailTemplate.isSaving;
    return (
      <form className="new-email-template-form" onSubmit={this.handleSubmit}>
        <EmailTemplateDetails values={values} emails={getUsersEmail} />
        <SubmitArea
          onCancel={this.handleCancel}
          hasBlankFields={disabled}
          send={editing ? 'Update' : 'Save'}
          loading={loading}
        />
      </form>
    );
  }
  render() {
    const {
      values,
      errors,
      hasBlankFields,
      values: { message }
    } = this.state;
    const disabled = hasBlankFields || this.hasErrors();
    const { updatedEmailTemplate } = this.props;
    const { isFetching } = updatedEmailTemplate;
    return (
      <FormContext
        values={values}
        errors={errors}
        targetForm={this}
        validatorName="validate"
      >
        {
          isFetching
            ? <Preloader />
            :this.renderEmailTemplate(disabled, values)
        }
      </FormContext>
    );
  }
}

NewEmailTemplateForm.defaultProps = {
  editing: false,
  createReminderEmailTemplate: () => {},
  getSingleReminderEmailTemplate: () => {},
  updateSingleReminderEmailTemplate: () => {},
  updatedEmailTemplate: {},
  data: {
    cc: []
  }
};

NewEmailTemplateForm.propTypes = {
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createReminderEmailTemplate: PropTypes.func,
  editing: PropTypes.bool,
  newEmailTemplate: PropTypes.object.isRequired,
  getSingleReminderEmailTemplate: PropTypes.func,
  updatedEmailTemplate: PropTypes.object,
  updateSingleReminderEmailTemplate: PropTypes.func,
  match: PropTypes.object.isRequired,
  data: PropTypes.object,
  getAllUsersEmail: PropTypes.func.isRequired,
  getUsersEmail: PropTypes.array.isRequired
};

export default NewEmailTemplateForm;
