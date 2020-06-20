class ReminderUtils {

  static removeReminderField (reminderFieldDefaults, newValues, stateObject, reminderIndex) {
    const { totalReminders, errors, values, reminders } = stateObject;
    reminderFieldDefaults.map((field) => {
      let index = reminderIndex;
      while (index < totalReminders) {
        newValues[`${field}-${index}`] = newValues[`${field}-${index + 1}`];
        index++;
      }

      delete newValues[`${field}-${index - 1}`];
      delete errors[`${field}-${index - 1}`];
    });
  }

  static generateFormItems(reminders) {
    const reminderItems = [];
    reminders.reverse()
      .forEach((temp, index) => {
        const reminderInputs = {
          [`date-${index}`]: temp.frequency.split(' ')[0],
          [`period-${index}`]: temp.frequency.split(' ')[1],
          [`reminderTemplate-${index}`]: `${temp.reminderEmailTemplateId}`,
        };
        reminderItems.push(reminderInputs);
      });

    return reminderItems;
  }
}

export default ReminderUtils;
