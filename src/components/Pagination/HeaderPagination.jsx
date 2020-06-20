import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../helper/Utils';
import './_headerPagination.scss';
import SelectDropDown from '../SelectDropDown/SelectDropDown';

const numberLimits = [
  {
    name: '10',
    value: 10,
  },
  {
    name: '20',
    value: 20,
  },
  {
    name: '30',
    value: 30,
  },
];
class HeaderPagination extends PureComponent {
  render() {
    const { getRequestsWithLimit, url } = this.props;
    const limit = Utils.getCurrentLimit(url);
    return (
      <div className="cell-items-per-page">
        <div className="cell-items-per-page-text">
          <span className="items-per-page-text">
            Items per page
          </span>
        </div>
        <div className="items-per-page-paginator">
          <SelectDropDown
            onClickItem={getRequestsWithLimit}
            dropDownItems={numberLimits}
            defaultSelected={limit}
          />
        </div>
      </div>
    );
  }
}

HeaderPagination.propTypes = {
  getRequestsWithLimit: PropTypes.func,
  url: PropTypes.string,
};
HeaderPagination.defaultProps = {
  getRequestsWithLimit: null,
  url: ''
};

export default HeaderPagination;
