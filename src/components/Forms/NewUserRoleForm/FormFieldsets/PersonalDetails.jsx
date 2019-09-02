import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';
import DepartmentHelper from '../../../../helper/departmentsHelper';
import './PersonalDetails.scss';

class PersonalDetailsFiedset extends Component {
  render() {
    const { roleName, values, allMails, addItem, removeItem, myTitle, departments, centers } = this.props;
    const emails = allMails.map(email => email.text);
    const allDepartments = departments.map(dept => dept.text);
    const departmentOptions = DepartmentHelper.setDepartmentDropdownOptions(departments);
    const allCenters = centers.map(center => center.location);
    const dropDown = roleName === 'Budget Checker' ? departmentOptions : allCenters;
    const disabled = myTitle.split(' ')[0] === 'Edit';
    formMetadata.dropdownSelectOptions.email = emails;
    formMetadata.dropdownSelectOptions.item = dropDown;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const displayInput =  (label) => (
      <div className="size_in">
        <div className="add_dept">
          {renderInput('item', label === 'Departments' ? 'select-choice-dropdown' : 'filter-dropdown-select',
            {
              className: 'department_dropdown',
              size: '',
              label: label,
              options: label === 'Departments' ? departmentOptions : null
            })
          }
        </div>
        <button
          type="button"
          onClick={addItem}
          disabled={values.item.length < 1}
          className={values.item.length > 1 ? 'add_button' : 'disable_button'}>
      Add
        </button>
      </div>
    );

    const displayDefaultCenters = () => (
      <div>
        Centers
        <div className="btn-group center-button-group">
          {allCenters.map(center => (
            <button
              key={Math.floor((Math.random() * 5000) + 1)}
              type="button"
              className="center_buttons">
              {center}
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('email', 'filter-dropdown-select',
              {
                className: 'email_dropdown', size: '', disabled
              })
            }
          </div>

          <div>
            {roleName === 'Budget Checker' ?
              displayInput('Departments') :
              roleName === 'Super Administrator' && myTitle === 'Add User' ?
                displayDefaultCenters() :
                !(/Manager|Requester/.test(roleName)) && displayInput('Country')
            }
          </div>
          <div className="center-button-group-edit">
            {values.items.map((list, cancelIcon) => (
              <button
                style={{ textTransform: 'capitalize' }}
                key={Math.floor((Math.random() * 5000) + 1)}
                type="button"
                className="center_buttons">
                {list}
                <span
                  className="remove_department"
                  role="button"
                  id="remove"
                  onKeyDown={this.handleKeyDown}
                  tabIndex="0"
                  onClick={() =>removeItem(cancelIcon)}>
                              X
                </span>
              </button>
            ))}
          </div>
        </div>
      </fieldset>
    );
  }
}

const roleName = PropTypes.string;
const allMails = PropTypes.array;
const values = PropTypes.object;
const addItem = PropTypes.func;
const removeItem = PropTypes.func;
const items = PropTypes.array
;
PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  allMails: allMails.isRequired,
  values: values,
  removeItem: removeItem,
  addItem: addItem,
  myTitle: PropTypes.string,
  departments: PropTypes.array,
  centers: PropTypes.array
};

PersonalDetailsFiedset.defaultProps = {
  removeItem: () => {},
  addItem: () => {},
  values: {},
  myTitle: '',
  departments: [],
  centers: []
};

export default PersonalDetailsFiedset;
