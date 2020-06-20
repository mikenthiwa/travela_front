import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Loupe from '../../images/Loupe.svg';
import './SearchBar.scss';


/**
 * @description - Contains search bar
 *
 * @class SearchBar
 *
 * @extends {PureComponent}
 *
 */


class SearchBar extends PureComponent {

  onChange = (event) => {
    const { onChange } = this.props;
    onChange(event);
  }

  submitForm = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  }
  render() {
    const { value } = this.props;
    return (
      <div className="mdl-search searchbar__search">
        <img src={Loupe} alt="Search Icon" className="searchbar__search-icon" />
        <form id="searchForm" onSubmit={this.submitForm} action="#">
          <input
            id="search"
            className="input-format"
            type="text"
            placeholder="Search requests, team members, etc"
            size="1"
            value={value}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SearchBar.defaultProps = {
  value: '',
};

export default SearchBar;
