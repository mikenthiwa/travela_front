function updateFormValues(value, targetField, validate) {
  let { values } = { ...this.state };
  values = {
    ...values,
    [targetField]: value
  };
  validate = validate ? validate : () => {};
  this.setState({ values }, () => validate(targetField));
}

export function getInputChangeHandler(targetForm, validate, targetField) {
  return e => {
    let value = e.target.value;
    updateFormValues.call(targetForm, value, targetField, validate);
  };
}

export function getTagsAddHandler(targetForm, validate, targetField) {
  return tags => {
    updateFormValues.call(targetForm, tags.length === 0 ? null : tags, targetField, validate);
  };
}

export function getTagsDeleteHandler(targetForm, validate, targetField) {
  return tags => {
    updateFormValues.call(targetForm, tags.length === 0  ? null : tags, targetField, validate);
  };
}

export function getTogglerHandler(targetForm, validate, targetField) {
  return opt => updateFormValues.call(targetForm, opt, targetField, validate);
}

export function getDateHandler(targetForm, validate, targetField) {
  return date =>
    updateFormValues.call(
      targetForm,
      date && date.format('MM/DD/YYYY'),
      targetField,
      validate
    );
}

export function getDropdownHandler(targetForm, validate, targetField) {
  return value =>
    updateFormValues.call(targetForm, value, targetField, validate);
}

export function getFilterDropdownSelect(targetForm, validate, targetField) {
  return value => {
    updateFormValues.call(targetForm, value, targetField, validate);
  };
}

export function getOnBlurHandler(targetForm, validate, targetField) {
  return () => validate(targetField);
}

export function getCheckBoxHandler(targetForm, validate, targetField) {
  return (checkStatus) => {
    let value = checkStatus;
    updateFormValues.call(targetForm, value, targetField);
  };
}
