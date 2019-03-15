import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from './FormFieldsets/SubmitArea';
import TravelReasonFieldset from './FormFieldsets';

export default class NewTravelReasonForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        title: '',
        description: '',
      },
      errors: {},
      hasBlankFields: true,
      ofMinLength: true,
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    this.setEditValues(this.props);
  }

  setEditValues = ({ editing, travelReason : { editReason }}) => {
    if (editing) {
      const { title, description } = editReason;
      this.setState(
        {
          values: { title, description }
        });
    }
  };

  validLengthHelper = (field, fieldLength) => {
    return fieldLength ? field.trim().length >= fieldLength :
      field.trim().length === fieldLength;
  }

  validateLength = field => {
    let { values } = this.state;
    const { editing, travelReason: { editReason } } = this.props;

    let tempErrorsObject = {
      title: '',
      description: ''
    };

    let hasBlankFields = false;

    switch (field) {
    case 'title':
      this.validLengthHelper(values[field], 0) ?
        (tempErrorsObject.title = 'This field is required')
        : null;
      this.validLengthHelper(values[field], 18)? (
        tempErrorsObject.title = 'Titles can only be 18 characters long')
        : null;
      values.title = values.title.slice(0,18);
      break;
    case 'description':
      this.validLengthHelper(values[field], 0)?
        (tempErrorsObject.description = 'This field is required')
        : null;
      values[field].trim().length > 140 || values[field].trim().length < 10 ?
        (tempErrorsObject.description = 'Descriptions can only be between 10 and 140 characters')
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

    if ( editing && !hasBlankFields && editReason.title && editReason.description ){
      const title = values.title ? values.title.toLowerCase() : '';
      const description = values.description ? values.description.toLowerCase() : '';
      hasBlankFields = title === editReason.title.toLowerCase() &&
        description === editReason.description.toLowerCase();
    }

    return !hasBlankFields;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { createNewTravelReason,
      editing, editTravelReason ,
      travelReason: { editReason}} = this.props;
    let { values } = this.state;
    if (editing) {
      editTravelReason({id: editReason.id, ...values});
    }else {
      createNewTravelReason(values);
    }
  };

  render() {
    const { values, errors, hasBlankFields, ofMinLength } = this.state;
    const { closeModal, travelReason, send } = this.props;
    return (
      <FormContext values={values} errors={errors} targetForm={this} validatorName="validateLength">
        <form onSubmit={this.handleSubmit} className="new-request">
          <TravelReasonFieldset
            value="232px"
          />
          <SubmitArea
            travelReason={travelReason}
            onCancel={closeModal}
            hasBlankFields={ofMinLength || hasBlankFields}
            send={send}
          />
        </form>
      </FormContext>
    );
  }
}

NewTravelReasonForm.propTypes = {
  closeModal: PropTypes.func,
  createNewTravelReason: PropTypes.func,
  editTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
  send: PropTypes.string,
  editing: PropTypes.bool
};

NewTravelReasonForm.defaultProps = {
  closeModal: null,
  createNewTravelReason: null,
  editTravelReason: null,
  travelReason: {},
  send: 'Add Reason',
  editing: false
};
