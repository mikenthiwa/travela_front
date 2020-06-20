import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../images/icons/new-request-icons/icon.svg';
import '../Forms/NewRequestForm/TravelCosts/TravelCosts.scss';
import './Tab.scss';

const Tab = ({
  title,
  subTitle,
  onClick,
  active,
  complete,
  hideActiveTick
}) => {
  return (
    <div
      role="presentation"
      className={`trip-tab ${
        active || complete ? 'trip-header-box-selected' : 'trip-header-box'
      }
        ${active ? 'active' : 'not-active'}
      `}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <p
        className={
          active || complete
            ? 'trip-header-text-title-selected'
            : 'trip-header-text-title'
        }
      >
        {title}
        {((active && !hideActiveTick) || complete) ? (
          <img className="active-icon" src={icon} alt="Hotel" />
        ) : (
          ''
        )}
      </p>
      <p
        className={
          active || complete
            ? 'overflow trip-header-text-content-selected'
            : 'overflow trip-header-text-content'
        }
      >
        {subTitle}
      </p>
    </div>
  );
};
Tab.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  complete: PropTypes.bool,
  hideActiveTick: PropTypes.bool
};

Tab.defaultProps = {
  title: '',
  subTitle: '',
  onClick: () => {},
  active: false,
  complete: false,
  hideActiveTick: false
};

export default Tab;
