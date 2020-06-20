import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import './RoleTable.scss';

const testColor = {
  color: 'blue',
};
export class RoleTable extends PureComponent {
  renderRoles(role) {
    const { handleEditRole } = this.props;
    return (
      <tr key={role.id} className="table__row table__effects">
        <td
          className="mdl-data-table__cell--non-numeric table__data freeze table__data-pointer">
          <Link
            className="table__data--link button-outline table__id-pointer" to={`/settings/roles/${role.id}`}>
            {role.roleName}
          </Link>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
          {role.description}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {role.users ? role.users.length : 0}
        </td>
        <td
          className="mdl-data-table__cell--non-numeric table__requests__status table__data delete"
          style={testColor}
        >
          &ensp; &ensp;  &ensp;  &ensp;
          <span
            onClick={() => handleEditRole(role)}
            id="editRole" role="presentation" onKeyDown={this.key}>
            Edit
          </span>
        </td>
      </tr>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze request_id">
          Role Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Description
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
        Users
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Actions
        </th>
      </tr>
    );
  }

  render() {
    const { roles } = this.props;
    return (
      <Fragment>
        <div className="table__container user-roles">
          {roles &&
            roles.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>
                {this.renderTableHeader()}
              </thead>
              <tbody className="table__body approvals_table_body">
                {roles.map(role => this.renderRoles(role))}
              </tbody>
            </table>
          )}
        </div>
      </Fragment>
    );
  }
}

RoleTable.propTypes = {
  roles: PropTypes.array,
  handleEditRole: PropTypes.func
};

RoleTable.defaultProps = {
  roles: [],
  handleEditRole: () => {}
};

export default withLoading(RoleTable);
