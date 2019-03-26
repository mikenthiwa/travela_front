import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';
import './PersonalDetails.scss';

class PersonalDetailsFiedset extends Component {

  render() {
    const { roleName, values, allMails, addDepartment, removeDepartment, myTitle } = this.props;
    const emails = allMails.map(email => email.text);
    const disabled = myTitle === 'Edit Budget Checker Role';
    formMetadata.dropdownSelectOptions.email = emails;
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
              <div className="size_in">
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
              <div className="back table__container">
                <table className="mdl-data-table mdl-js-data-table table__requests" style={{ width: '104%'}}>
                  { values.departments.length > 0 ?
                    (
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze">
                      Departments
                          </th>
                        </tr>
                      </thead>
                    ) : null
                  }
                  {values.departments.map((list, i) =>
                    (
                      <tbody key={Math.floor((Math.random() * 500) + 1)} className="table__body">
                        <tr className="table__row">
                          <td className="mdl-data-table__cell--non-numeric table__data" style={{ textTransform: 'capitalize'}}>
                            {list}
                          </td>
                          <td>
                            <i
                              role="button"
                              className="remove_department"
                              id="remove"
                              onKeyDown={this.handleKeyDown}
                              tabIndex="0"
                              onClick={() =>removeDepartment(i)}>
                              remove
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
const removeDepartment = PropTypes.func
;
PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  allMails: allMails.isRequired,
  values: values,
  removeDepartment: removeDepartment,
  addDepartment: addDepartment,
  myTitle: PropTypes.string
};

PersonalDetailsFiedset.defaultProps = {
  removeDepartment: () => {},
  addDepartment: () => {},
  values: {},
  myTitle: ''
};

export default PersonalDetailsFiedset;
