import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/Department/index';
import './addDepartmentForm.scss';

export default class DepartmentFieldset extends Component {
  render() {
    const { department: { departments } } = this.props;

    formMetadata.dropdownSelectOptions.parentDepartment = [
      ... new Set ([
        ...formMetadata.dropdownSelectOptions.parentDepartment,
        ...departments.map(dept => dept.name)
      ])];

    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="add-checklist">
        <div className="input-group">
          {renderInput('name', 'text')}
          {renderInput('parentDepartment', 'filter-dropdown-select', {
            className: 'profile_dropdown no-disable manager', disabled: false, required: false,
            size: '' })}
        </div>
      </fieldset>
    );
  }
}

DepartmentFieldset.propTypes = {
  department: PropTypes.object
};

DepartmentFieldset.defaultProps = {
  department: {},
};
