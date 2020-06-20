import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import withLoading from '../Hoc/withLoading';
import listTravelReasonsPlaceHolder from '../Placeholders/TravelReasonsPlaceholders';
import NoTemplates from '../ReminderSetup/NoTemplates';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';

const className = 'mdl-data-table__cell--non-numeric';

export class DepartmentsTable extends Component {
  renderDepartmentsTableHead() {
    return (
      <thead>
        <tr>
          <th className={`${className} table__head`}>Departments</th>
          <th className={`${className} table__head`}><span /></th>
          <th className={`${className} table__head`}>Parent Department</th>
          <th className={`${className} table__head`}><span /></th>
          <th className={`${className} table__head`}>Created By</th>
          <th className={`${className} table__head`}><span /></th>
          <th className={`${className} table__head`}>Created On</th>
          <th className={`${className} table__head`} />
        </tr>
      </thead>
    );
  }

  renderDepartmentsTableRow({
    id, key, parentDepartment, name, createdOn, createdBy }) {
    const {
      shouldOpen, closeModal, modalType, editDepartments  } = this.props;
    return (
      <Fragment key={key}>
        <tr className="table__rows">
          <td className={`${className} table__data readiness__cell-name`}>
            {_.capitalize(name)}
          </td>
          <td className={`${className} table__data`} />
          <td className={`${className} table__data readiness__cell-name`}>{parentDepartment}</td>
          <td className={`${className} table__data`} />
          <td className={`${className} table__data`}>{createdBy}</td>
          <td className={`${className} table__data`} />
          <td className={`${className} table__data`}>
            {moment(new Date(createdOn)).format('DD-MM-YYYY')}
          </td>
          <td className="table__data">
            <ContextMenu>
              <MenuItem
                classNames="edit"
                onClick={() => editDepartments(id)}>
                Edit
              </MenuItem>
            </ContextMenu>
          </td>
        </tr>
      </Fragment>
    );
  }

  renderDepartmentsBody(departments) {
    return (
      <tbody className="table__body">
        {
          departments.map(department => {
            return (
              this.renderDepartmentsTableRow({
                id: department.id,
                key: department.id,
                parentDepartment: department.parentDepartment ? department.parentDepartments.name : 'None',
                name: department.name,
                createdOn: department.createdAt,
                createdBy: department.creator ? department.creator.fullName : 'BambooHR'
              })
            );
          })
        }
      </tbody>
    );
  }

  render() {
    const { departments } = this.props;
    return (
      departments && departments.length > 0 ?
        (
          <div className="list-reasons">
            <div className="table__container">
              <table className="mdl-data-table mdl-js-data-table readiness-table">
                {this.renderDepartmentsTableHead()}
                {this.renderDepartmentsBody(departments)}
              </table>
            </div>
          </div>
        )
        : (<NoTemplates message="No Departments have been created" />)
    );
  }
}

DepartmentsTable.propTypes = {
  shouldOpen: PropTypes.bool,
  editDepartments: PropTypes.func,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  departments: PropTypes.array,
};

DepartmentsTable.defaultProps = {
  shouldOpen: false,
  editDepartments: null,
  closeModal: null,
  departments: null,
  modalType: '',
};

export default withLoading(DepartmentsTable, listTravelReasonsPlaceHolder);
