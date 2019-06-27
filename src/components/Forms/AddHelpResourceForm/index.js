import React, { PureComponent } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import AddHelpResourceFields from './FormFieldSets/AddHelpResourceFields';

class AddHelpResourceForm extends PureComponent {
  constructor(props) {
    super(props);
    const { linkDetail } = this.props;
    let defaultValues = {
      link: linkDetail ? linkDetail.link: '',
      address: linkDetail ? linkDetail.address : ''
    };
    this.defaultState = {
      values: defaultValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { values } = this.state;
    event.preventDefault();
    const { addResource, myTitle, linkDetail } = this.props;
    if (Object.keys(values).find(value => !this.validate(value))) return;
    addResource( values);
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  validLengthHelper = (field, fieldLength) => {
    return fieldLength ? field.trim().length >= fieldLength :
      field.trim().length === fieldLength;
  };

  validate = field => {
    let { values} = this.state;
    let tempErrorsObject = {
      link: '',
      address: ''
    };
    let hasBlankFields = false;
    switch (field) {
    case 'link':
      tempErrorsObject.link = this.validLengthHelper(values[field], 0) && 'This field is required';
      tempErrorsObject.link = this.validLengthHelper(values[field], 50) && 'Label can only be 50 characters long';
      values.link = values.link.slice(0,50);
      break;
    case 'address':
      tempErrorsObject.address = this.validLengthHelper(values[field], 0) && 'This field is required';
      tempErrorsObject.address = (values[field].trim().length < 3) && 
        'Address can not be less than three characters';
      tempErrorsObject.address = !values[field].trim().match(/(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]+/gim) && 'Enter a valid url';
      this.setState({ofMinLength: values[field].trim().length < 10});
      values.address = values.address.slice(0, 140);
      break;
    default:
      break;
    }

    hasBlankFields = Object.keys(values).some(
      key => !values[key].trim()
    );
    this.setState(prevState => {
      return { ...prevState, errors: { ...tempErrorsObject }, hasBlankFields };
    });
    return !hasBlankFields && !tempErrorsObject.link && !tempErrorsObject.address;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { addingHelpResource, myTitle } = this.props;

    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request" id="add-help-resource-form">
          <AddHelpResourceFields
            values={values}
          />
          <hr />
          <SubmitArea
            isCreating={addingHelpResource}
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send={myTitle}
          />
        </form>
      </FormContext>
    );
  }
}

AddHelpResourceForm.propTypes = {
  addResource: PropTypes.func.isRequired,
  addingHelpResource: PropTypes.bool,
  myTitle: PropTypes.string,
  linkDetail: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};

AddHelpResourceForm.defaultProps = {
  addingHelpResource: false,
  myTitle: '',
  linkDetail: {},
};

export default AddHelpResourceForm;
