import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './_dropdownItem.scss';

const DropdownItem = (props) => {
  const { children, link_to, exact } = props;

  return (
    <NavLink exact={exact} to={link_to} className="dropdown-item">
      {children}
    </NavLink>
  );
};

DropdownItem.propTypes = {
  link_to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

DropdownItem.defaultProps = {
  exact: false
};

export default DropdownItem;
