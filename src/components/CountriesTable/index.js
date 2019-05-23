import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import './countriesTable.scss';

export class CountryTable extends PureComponent {
  renderCountries(country) {
    return (
      <tr key={country.id} className="table__row table__effects">
        <td className="mdl-data-table__cell--non-numeric table__data freeze role-user__name table__data-pointer">
          {country.country}
        </td>
      </tr>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze request_id">
          Country Name
        </th>
      </tr>
    );
  }

  render() {
    const { countries, searched } = this.props;
    const body = countries.length ? (
      <div className="table__container user-roles">
        <table className="mdl-data-table mdl-js-data-table table__requests">
          <thead>{this.renderTableHeader()}</thead>
          <tbody className="table__body approvals_table_body">
            {countries.map(country => this.renderCountries(country))}
          </tbody>
        </table>
      </div>
    ) : ( 
      <div className="table__requests--empty">
        {searched === true ? 'No results found for the searched country' : 'No country records found'}
      </div>
    );
    return body;
  }
}

CountryTable.propTypes = {
  countries: PropTypes.array,
  searched: PropTypes.bool
};

CountryTable.defaultProps = {
  countries: [],
  searched: false
};

export default withLoading(CountryTable);
