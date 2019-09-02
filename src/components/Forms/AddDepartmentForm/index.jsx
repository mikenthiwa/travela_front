import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from './FormFieldsets/SubmitArea';
import DepartmentFieldset from './FormFieldsets';

export default class AddDepartmentForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        parentDepartment: '',
      },
      errors: {},
      hasBlankFields: true,
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    this.setEditValues(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { department: { singleDepartment } } = this.props;
    if (prevProps.department.singleDepartment !== singleDepartment) {
      this.setEditValues(this.props);
    }
  }

  setEditValues = ({ editing, department : { singleDepartment }}) => {
    if (editing) {
      const { parentDepartment } = this.state;
      const { name, parentDepartment: parentDepartmentProps, parentDepartments  } = singleDepartment;
      const resolvedParentDepartment = parentDepartmentProps ? parentDepartments.name : parentDepartment;
      this.setState(
        {
          values: { name: _.capitalize(name), parentDepartment: resolvedParentDepartment },
        });
    }
  };

  validLengthHelper = (field, fieldLength) => {
    return fieldLength ? field.trim().length >= fieldLength :
      field.trim().length === fieldLength;
  };

  validateLength = field => {
    let { values } = this.state;

    let tempErrorsObject = {
      name: '',
    };

    let hasBlankFields = false;

    if (field === 'name') {
      this.validLengthHelper(values[field], 0) ?
        (tempErrorsObject.name = 'This field is required')
        : null;
    }

    hasBlankFields = !values['name'].trim();

    this.setState(prevState => {
      return { ...prevState, errors: { ...tempErrorsObject }, hasBlankFields };
    });

    return !hasBlankFields;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addDepartment, editing, editDepartment , department: { singleDepartment}} = this.props;
    let { values } = this.state;
    if (editing) {
      editDepartment(singleDepartment.id, values);
    } else {
      addDepartment(values);
    }
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { closeModal, department, send } = this.props;
    return (
      <FormContext values={values} errors={errors} targetForm={this} validatorName="validateLength">
        <form onSubmit={this.handleSubmit} className="new-request">
          <DepartmentFieldset
            department={department}
            value="232px"
          />
          <SubmitArea
            department={department}
            onCancel={closeModal}
            hasBlankFields={hasBlankFields}
            send={send}
          />
        </form>
      </FormContext>
    );
  }
}

AddDepartmentForm.propTypes = {
  closeModal: PropTypes.func,
  addDepartment: PropTypes.func,
  editDepartment: PropTypes.func,
  department: PropTypes.object,
  send: PropTypes.string,
  editing: PropTypes.bool
};

AddDepartmentForm.defaultProps = {
  closeModal: null,
  addDepartment: null,
  editDepartment: null,
  department: {},
  send: 'Add Reason',
  editing: false
};
