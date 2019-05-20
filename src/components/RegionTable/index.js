import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import './RegionTable.scss';

export class RegionTable extends PureComponent {
  renderRegions(region) {
    return (
      <tr key={region.id} className="table__row table__effects">
        <td
          className="mdl-data-table__cell--non-numeric table__data freeze table__data-pointer">
          <button 
            type="button"
            className="table__data--link button-outline table__id-pointer">
            {region.region}
          </button>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
          {region.description}
        </td>
      </tr>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze request_id">
          Region Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Description
        </th>
      </tr>
    );
  }
  
  render() {
    const { regions } = this.props;
    const body=regions.length ? (
      <div className="table__container user-roles">
        <table className="mdl-data-table mdl-js-data-table table__requests">
          <thead>
            {this.renderTableHeader()}
          </thead>
          <tbody className="table__body approvals_table_body">
            {regions.map(region => this.renderRegions(region))}
          </tbody>
        </table>
      </div>
    ): (
      <div className="table__requests--empty">
        { 
          'No regions Added' 
        }
      </div>
    );
    return body;
  }
}

RegionTable.propTypes = {
  regions: PropTypes.array,
};

RegionTable.defaultProps = {
  regions: [],
};

export default withLoading(RegionTable);
