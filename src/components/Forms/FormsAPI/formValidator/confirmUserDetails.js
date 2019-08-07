function validate(field)  {
  const targetForm = this;
  let { values, errors, optionalFields, trips } = targetForm.state;
  [errors, values] = [{ ...errors }, { ...values }];
  let hasBlankFields = false;

  hasBlankFields = Object.keys(values)
    .some(key => !values[key] && !isOptional(key, optionalFields));

  errors[field] = !values[field] && !isOptional(field, optionalFields)
    && 'This field is required';

  targetForm.setState(prevState => ({ ...prevState, errors, hasBlankFields}));
  return !hasBlankFields;
}

export const isOptional = (field, optionalFields) => {
  return optionalFields && optionalFields;
};


const getDefaultBlanksValidatorFor = (targetForm) => {
  return validate.bind(targetForm);
};

export default getDefaultBlanksValidatorFor;
