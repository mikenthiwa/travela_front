import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component{

  render() {
    const { classNames, onClick, children} = this.props;
    return (
      <li
        className={classNames}
        role="presentation"
        onClick={onClick}>
        <span>{children}</span>
      </li>
    );
  }
}

MenuItem.propTypes = {
  classNames: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]
  ).isRequired
};
