import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import withLoading from '../../components/Hoc/withLoading';
import './TravelReadinessDocuments.scss';

export class UserReadiness extends Component {
  render(){
    const { name, userId, department, passportsCount, visasCount, othersCount } = this.props;
    return (
      <tr className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data readiness__cell-name freeze table__data-pointer">
          <Link className="table__data--link button-outline table__id-pointer" to={`/travel-readiness/${userId}`}>{name}</Link>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">{department}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{passportsCount}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{visasCount}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{othersCount}</td>
      </tr>
    );
  }
}

export const TableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head freeze request_id">Name</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">Department</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">No. of Passports</th>
      <th className="mdl-data-table__cell--non-numeric table__head">No. of Visas</th>
      <th className="mdl-data-table__cell--non-numeric table__head">No. of Other Documents</th>
    </tr>
  </thead>
);

export const TableBody = ({ users }) => (
  <tbody className="table__body  approvals_table_body">
    {
      users.map(user => {
        const visasCount = user.travelDocuments.filter(document => document.type === 'visa').length;
        const passportsCount = user.travelDocuments.filter(document => document.type === 'passport').length;
        const othersCount = user.travelDocuments.filter(document => document.type === 'other').length;
        return (
          <UserReadiness
            key={user.userId}
            name={user.fullName}
            userId={user.userId}
            department={user.department}
            visasCount={visasCount}
            passportsCount={passportsCount}
            othersCount={othersCount}
          />
        );
      })
    }
  </tbody>
);

const ReadinessTable = ({ users }) => (
  <div className="table__container">
    { isEmpty(users)
      ? <h1 id="no-results">No results</h1>
      : (
        <table className="mdl-data-table mdl-js-data-table readiness-table">
          <TableHead />
          <TableBody users={users} />
        </table>
      )
    }
  </div>
);

ReadinessTable.propTypes = {
  users: PropTypes.array.isRequired,
};

UserReadiness.propTypes = {
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  department: PropTypes.string,
  passportsCount: PropTypes.number.isRequired,
  visasCount: PropTypes.number.isRequired,
  othersCount: PropTypes.number.isRequired
};

UserReadiness.defaultProps = {
  department: ''
};

TableBody.propTypes = {
  users: PropTypes.array.isRequired,
};

export default withLoading(ReadinessTable);
