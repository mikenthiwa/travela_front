import React, { PureComponent } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import AddRegionFields from './FormFieldSets/AddRegionFields';

class AddRegionForm extends PureComponent {
  constructor(props) {
    super(props);
    const { regionDetail } = this.props;
    let defaultValues = {
      region: regionDetail ? regionDetail.region: '',
      description: regionDetail ? regionDetail.description : ''
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
    const { addRegion, myTitle, regionDetail } = this.props;
    if (this.validate()) {
      let data = values;
      myTitle === addRegion(data);
    }
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };
  validLengthHelper = (field, fieldLength) => {
    return fieldLength ? field.trim().length >= fieldLength :
      field.trim().length === fieldLength;
  }
  validate = field => {
    let { values} = this.state;
    let tempErrorsObject = {
      region: '',
      description: ''
    };
    let hasBlankFields = false;
    switch (field) {
    case 'region':
      this.validLengthHelper(values[field], 0) ?
        (tempErrorsObject.region = 'This field is required')
        : null;
      this.validLengthHelper(values[field], 50)? (
        tempErrorsObject.region = 'Region can only be 50 characters long')
        : null;
      values.region = values.region.slice(0,50);
      break;
    case 'description':
      this.validLengthHelper(values[field], 0)?
        (tempErrorsObject.description = 'This field is required')
        : null;
      values[field].trim().length > 140 || values[field].trim().length < 10 ?
        (tempErrorsObject.description = 'Description can only be between 10 and 140 characters')
        : null;
      this.setState({ofMinLength: values[field].trim().length < 10});
      values.description = values.description.slice(0, 140);
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
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { addingRegion, myTitle } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request" id="add-region-form">
          <AddRegionFields
            values={values}
          />
          <hr />
          <SubmitArea
            isCreating={addingRegion}
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send={myTitle}
          />
        </form>
      </FormContext>
    );
  }
}

AddRegionForm.propTypes = {
  addRegion: PropTypes.func.isRequired,
  addingRegion: PropTypes.bool,
  myTitle: PropTypes.string,
  regionDetail: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};

AddRegionForm.defaultProps = {
  addingRegion: false,
  myTitle: '',
  regionDetail: {},
};

export default AddRegionForm;
