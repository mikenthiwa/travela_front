import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';
import './PersonalDetails.scss';

class PersonalDetailsFiedset extends Component {
  render() {
    const { roleName, values, allMails, addItem, removeItem, myTitle, departments, centers } = this.props;
    const emails = allMails.map(email => email.text);
    const allDepartments = departments.map(dept => dept.text);
    const allCenters = centers.map(center => center.location);
    const dropDown = roleName === 'Budget Checker' ? allDepartments : allCenters;
    const disabled = myTitle.split(' ')[0] === 'Edit';
    formMetadata.dropdownSelectOptions.email = emails;
    formMetadata.dropdownSelectOptions.item = dropDown;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const displayInput =  (label) => (
      <div className="size_in">
        <div className="add_dept">
          {renderInput('item', 'filter-dropdown-select',
            {
              className: 'department_dropdown',
              size: '',
              label: label
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
          <div className="">
            <table className="mdl-js-data-table table__requests" style={{ backgroundColor: 'white'}}>
              {values.items.map((list, i) =>
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
                          onClick={() =>removeItem(i)}>
                              X
                        </i>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
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
