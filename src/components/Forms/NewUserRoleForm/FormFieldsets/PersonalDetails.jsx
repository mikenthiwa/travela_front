import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';
import './PersonalDetails.scss';

class PersonalDetailsFiedset extends Component {
  render() {
    const { roleName, values, allMails, addDepartment, removeDepartment, myTitle, departments } = this.props;
    const emails = allMails.map(email => email.text);
    const allDepartments = departments.map(dept => dept.text);
    const disabled = myTitle === 'Edit Budget Checker Role';
    formMetadata.dropdownSelectOptions.email = emails;
    formMetadata.dropdownSelectOptions.department = allDepartments;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
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
          {roleName === 'Budget Checker' ? (
            <div>
              <div className="size_in" onBlur={this.handleBlur} onFocus={this.handleFocus}>
                <div className="add_dept">
                  {renderInput('department', 'filter-dropdown-select',
                    {
                      className: 'department_dropdown', size: ''
                    })
                  }
                </div>
                <button
                  type="button"
                  onClick={addDepartment}
                  disabled={values.department.length < 1}
                  className={values.department.length > 1 ? 'add_button' : 'disable_button'}>
                  Add
                </button>
              </div>
              <div className="">
                <table className="mdl-js-data-table table__requests" style={{ backgroundColor: 'white'}}>
                  {values.departments.map((list, i) =>
                    (
                      <tbody key={Math.floor((Math.random() * 5000) + 1)} className="table__body">
                        <tr className="table__row" style={{ backgroundColor: '#F8F8F8' }}>
                          <td className="mdl-data-table__cell--non-numeric table__data" style={{ textTransform: 'capitalize', borderLeft: 'none' }}>
                            {list}
                          </td>
                          <td style={{ borderRight: 'none'}}>
                            <i
                              role="button"
                              className="remove_department"
                              id="remove"
                              onKeyDown={this.handleKeyDown}
                              tabIndex="0"
                              onClick={() =>removeDepartment(i)}>
                              X
                            </i>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          ) : null
          }
        </div>
      </fieldset>
    );
  }
}

const roleName = PropTypes.string;
const allMails = PropTypes.array;
const values = PropTypes.object;
const addDepartment = PropTypes.func;
const removeDepartment = PropTypes.func;
const departments = PropTypes.array
;
PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  allMails: allMails.isRequired,
  values: values,
  removeDepartment: removeDepartment,
  addDepartment: addDepartment,
  myTitle: PropTypes.string,
  departments: PropTypes.array
};

PersonalDetailsFiedset.defaultProps = {
  removeDepartment: () => {},
  addDepartment: () => {},
  values: {},
  myTitle: '',
  departments: []
};

export default PersonalDetailsFiedset;
