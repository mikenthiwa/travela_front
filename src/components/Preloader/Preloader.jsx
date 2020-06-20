import React from 'react';
import PropTypes from 'prop-types';
import './Preloader.scss';

const Preloader = ({ spinnerClass }) => (
  <div className="preloader">
    <div className={`spinner ${spinnerClass}`} />
  </div>
);

Preloader.propTypes = {
  spinnerClass: PropTypes.string,
};

Preloader.defaultProps = {
  spinnerClass: '',
};
export default Preloader;
