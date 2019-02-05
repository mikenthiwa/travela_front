import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import addButton from '../../../../images/add.svg';
import deleteBtnRed from '../../../../images/delete.svg';
import AddInputRowButton from '../../AddInputRowButton';
import * as formMetaData from '../../FormsMetadata/ReminderForm/index';

class ReminderFormInputFields extends Component {
  state = {};

  renderTemplateDropDown(reminderIndex) {
    const { renderInput } = this.inputRenderer;
    const { templates, currentPage, loading, pageCount, fetchAllEmailTemplates, onReminderTemplateChange } = this.props;

    const templateChoices = templates.map(item => ({ value: `${item.id}`, label: item.name }));

    return renderInput(`reminderTemplate-${reminderIndex}`, 'dropdown-select', {
      label: `Reminder ${reminderIndex + 1}`,
      choices: templateChoices,
      templatesCount: templateChoices.length,
      currentPage: currentPage,
      loading: loading,
      pageCount: pageCount,
      fetchAllEmailTemplates: fetchAllEmailTemplates,
      onChange: value => onReminderTemplateChange(value, reminderIndex),
    });
  }

  renderDatePeriodInputGroup(reminderIndex) {
    const { renderInput } = this.inputRenderer;
    const { onReminderPeriodChange, onInputChange } = this.props;
    return (
      <Fragment>
        <div className="dropdown-input-group">
          {renderInput(`date-${reminderIndex}`, 'number', { min: 1, id: reminderIndex, onChange: onInputChange })}
          {renderInput(`period-${reminderIndex}`, 'dropdown-select', {
            className: 'period',
            onChange: value => onReminderPeriodChange(value, reminderIndex),
          })}
        </div>
        <p>To Expiry</p>
      </Fragment>
    );
  }

  renderRemoveReminderButton(reminderIndex) {
    const { removeReminder } = this.props;
    return (
      <button
        type="button"
        className="delete-icon"
        onClick={() => removeReminder(reminderIndex)}
      >
        <img src={deleteBtnRed} alt="clicked" className="addsvg" />
      </button>
    );
  }

  renderReminder(reminderIndex) {
    const { renderInput } = this.inputRenderer;
    return (
      <div key={reminderIndex} className="reminders-fieldset">
        {this.renderTemplateDropDown(reminderIndex)}
        {this.renderDatePeriodInputGroup(reminderIndex)}
        {reminderIndex > 0 && this.renderRemoveReminderButton(reminderIndex)}
      </div>
    );
  }

  renderConditionInput() {
    const { renderInput } = this.inputRenderer;
    return renderInput('conditionName', 'text');
  }

  renderReminderInputSets(totalReminders) {
    const reminders = [];
    for (let i = 0; i < totalReminders; i++) {
      reminders.push(this.renderReminder(i));
    }
    return reminders;
  }

  renderAddReminderButton() {
    const { addNewReminder } = this.props;
    return (
      <AddInputRowButton
        text="Add a Reminder"
        addRowHandler={addNewReminder}
        wrapperClassName="add-reminder__border-dashed"
        buttonClassName="add-reminder__button"
      />
    );
  }


  render() {
    this.inputRenderer = new InputRenderer(formMetaData);
    const { totalReminders } = this.props;
    return (
      <fieldset>
        {this.renderConditionInput()}
        {this.renderReminderInputSets(totalReminders)}
        {this.renderAddReminderButton()}
      </fieldset>
    );
  }
}

ReminderFormInputFields.propTypes = {
  totalReminders: PropTypes.number.isRequired,
  addNewReminder: PropTypes.func.isRequired,
  removeReminder: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onReminderTemplateChange: PropTypes.func.isRequired,
  onReminderPeriodChange: PropTypes.func.isRequired,
  templates: PropTypes.array,
  currentPage: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number,
  fetchAllEmailTemplates: PropTypes.func.isRequired,
};

ReminderFormInputFields.defaultProps = {
  templates: [],
  currentPage: 1,
  pageCount: 100,
};

export default ReminderFormInputFields;