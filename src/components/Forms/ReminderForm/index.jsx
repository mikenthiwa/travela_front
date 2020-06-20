import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import ReminderFormInputFields from './ReminderFormFieldSets/ReminderFormInputFields';
import ReminderUtils from '../../../helper/reminder/ReminderUtils';
import Preloader from '../../Preloader/Preloader';

class ReminderForm extends Component {
  constructor(props) {
    super(props);
    const initialReminderFieldsValues = {
      ...this.getReminderFieldsValues(0),
      ...this.getReminderFieldsValues(1),
    };
    this.initialState = {
      values: {
        conditionName: '',
        ...initialReminderFieldsValues
      },
      hasBlankFields: true,
      errors: {},
      totalReminders: 2,
      reminders: [],
      documentTypeChanged: false,
    };
    this.state = { ...this.initialState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount(){
    const { getSingleReminder, location: { pathname }, isEditMode } = this.props;
    const conditionId = pathname.split('/')[4];
    if(isEditMode) {
      getSingleReminder(conditionId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errors, editModeErrors, isEditMode, singleReminder: { data, isLoading },
      documentType: nextDocumentType } = nextProps;
    const { singleReminder:
      { data: currentReminder,
        isLoading: currentIsLoading },
    setReminderType, documentType
    } = this.props;
    this.handleDocumentTypeChange(documentType, nextDocumentType);

    if ((isEmpty(currentReminder) || (isLoading && !currentIsLoading)) && !isEmpty(data)) {
      const { documentType, reminders } = data;
      setReminderType(documentType);
      const reminderItems = ReminderUtils.generateFormItems(reminders);
      this.updateReminderState(reminderItems, nextProps);
    }
    this.setState({ errors: isEditMode ? editModeErrors : errors });
  }

  setReminderCurrentUpdateValues(reminders) {
    return reminders
      .map(item => {
        return {
          date: item.frequency.split(' ')[0],
          period: item.frequency.split(' ')[1],
          reminderTemplate: `${item.reminderEmailTemplateId}`,
          id:  item.id
        };
      });
  }

  getReminderFieldsValues = (index) => ({
    [`reminderTemplate-${index}`]: '',
    [`date-${index}`]: '',
    [`period-${index}`]: 'Months',
  });

  addNewReminder = () => {
    const { totalReminders, values } = this.state;
    const newReminderFieldValues = this.getReminderFieldsValues(totalReminders);

    this.setState({
      values: { ...values, ...newReminderFieldValues },
      totalReminders: totalReminders+ 1,
    }, this.validate);
  }

  removeReminder = (reminderIndex) => {
    const reminderFieldDefaults = ['reminderTemplate', 'date', 'period'];
    const { errors, values, reminders } = this.state;
    const newValues = { ...values };
    const newErrors = { ...errors };
    const newReminders = [...reminders ];

    ReminderUtils.removeReminderField(reminderFieldDefaults, newValues, this.state, reminderIndex);
    newReminders.splice(reminderIndex, 1);
    this.setState((prevState) => {
      return {
        totalReminders: prevState.totalReminders - 1,
        values: newValues,
        errors: newErrors,
        reminders: newReminders,
      };
    }, this.validate);
  }

  handleCancel = () => {
    const { isEditMode, history } = this.props;
    isEditMode
      ? history.goBack()
      : this.setState({ ...this.initialState });
  }

  updateReminderFormState = (formFieldId, formFieldName, value ) => {
    const { reminders } = this.state;
    const newReminders = [...reminders];

    if (!newReminders[formFieldId]) {
      newReminders[formFieldId] = {
        period: 'Months'
      };
    }

    newReminders[formFieldId][formFieldName.replace(/-\d+/, '')] = value;
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [formFieldName]: value
      },
      reminders: newReminders
    }), this.validate);
  }

  handleInputChange = (event) => {
    const { name, value, id } = event.target;
    this.updateReminderFormState(id, name, value);
  }

  handleReminderTemplateChange = (value, id) => {
    this.updateReminderFormState(id, `reminderTemplate-${id}`, value);
  }

  handleReminderPeriodChange = (value, id) => {
    this.updateReminderFormState(id, `period-${id}`, value);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { reminders, values: { conditionName } } = this.state;
    const { createReminder, editReminder, isEditMode, documentType, history } = this.props;

    const reminderList = reminders.map((reminder) => {
      return {
        frequency: `${reminder.date} ${reminder.period}`,
        reminderEmailTemplateId: reminder.reminderTemplate,
        id: reminder.id
      };
    });

    const payload = {
      conditionName,
      documentType,
      reminders: reminderList,
    };

    if(isEditMode) {
      const { location: { pathname }} = this.props;
      const conditionId = pathname.split('/')[4];
      editReminder(payload, history, conditionId);
      return;
    }

    createReminder(payload, history);
  }

  handleDocumentTypeChange(documentType, nextDocumentType) {
    if(documentType && (nextDocumentType !== documentType)){
      this.setState({
        documentTypeChanged: true
      });
    }
  }

  updateReminderState(reminderItems, nextProps) {
    const { errors, singleReminder: { data } } = nextProps;
    const { conditionName, reminders } = data;
    const prevReminderValue = reminderItems.reduce((acc, curr) => {
      return {...acc, ...curr};
    }, {});
    this.newState = {
      values: {
        conditionName,
        ...prevReminderValue
      },
      totalReminders: reminders.length,
      reminders: [
        ...this.setReminderCurrentUpdateValues(reminders)
      ]
    };
    this.setState({errors, ...this.newState });
  }

  renderSubmitArea =(isEditMode, documentTypeChanged, documentType,
    isCreating, isUpdating, hasBlankFields) => {
    return (
      <SubmitArea
        send="Save"
        hasBlankFields={isEditMode ? (!documentTypeChanged && hasBlankFields)
          : (hasBlankFields || !documentType)}
        isCreating={isCreating || isUpdating}
        onCancel={this.handleCancel}
      />
    );
  };


  render() {
    const { hasBlankFields, errors, values, totalReminders , documentTypeChanged } = this.state;
    const {
      documentType, templates, currentPage, loading,
      fetchAllEmailTemplates, pageCount, isUpdating,
      isEditMode, isCreating, singleReminder
    } = this.props;
    const { isLoading } = singleReminder;
    return (
      <div>
        {isLoading ? <Preloader /> : (
          <FormContext values={values} targetForm={this} errors={errors}>
            <div className="reminder-card">
              <form onSubmit={this.handleFormSubmit}>
                <ReminderFormInputFields
                  totalReminders={totalReminders} addNewReminder={this.addNewReminder}
                  removeReminder={this.removeReminder} onInputChange={this.handleInputChange}
                  onReminderTemplateChange={this.handleReminderTemplateChange}
                  onReminderPeriodChange={this.handleReminderPeriodChange}
                  templates={templates} currentPage={currentPage}
                  loading={loading} pageCount={pageCount}
                  values={values}
                  fetchAllEmailTemplates={fetchAllEmailTemplates}
                />
                {this.renderSubmitArea(isEditMode,documentTypeChanged,documentType,
                  isCreating,isUpdating, hasBlankFields)}
              </form>
            </div>
          </FormContext>)}
      </div>
    );
  }
}

ReminderForm.propTypes = {
  documentType: PropTypes.string, templates: PropTypes.array,
  currentPage: PropTypes.number,
  fetchAllEmailTemplates: PropTypes.func.isRequired,
  createReminder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired, isCreating: PropTypes.bool,
  pageCount: PropTypes.number, errors: PropTypes.object,
  editModeErrors: PropTypes.object, history: PropTypes.object.isRequired,
  getSingleReminder: PropTypes.func.isRequired,
  editReminder: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired, isUpdating: PropTypes.bool,
  location: PropTypes.object.isRequired,
  singleReminder: PropTypes.object,
  setReminderType: PropTypes.func.isRequired
};

ReminderForm.defaultProps = {
  documentType: '',
  templates: [],
  currentPage: 1, pageCount: 100,
  errors: {}, editModeErrors: {},
  singleReminder: {
    condition: {
      conditionName: '',
      documentType: 'Passport'
    },
    reminders: []
  },
  isCreating: false, isUpdating: false
};

export default ReminderForm;
