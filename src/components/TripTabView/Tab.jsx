import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../images/icons/new-request-icons/icon.svg';
import '../Forms/NewRequestForm/TravelCosts/TravelCosts.scss';


const Tab = ({title, subTitle, onClick, active}) => {
  return (
    <div
      role="presentation" 
      className={active ? 'trip-header-box-selected' : 'trip-header-box'} 
      onClick={onClick} 
      onKeyDown={onClick}> 
      <p className={active ? 'trip-header-text-title-selected' : 'trip-header-text-title'}>
        {title}
        {active ? <img className="active-icon" src={icon} alt="Hotel" /> : ''}
      </p>
      <p className={active ? 'overflow trip-header-text-content-selected' : 'overflow trip-header-text-content'}>
        { subTitle }
      </p>
    </div>
  );
};
Tab.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

Tab.defaultProps = {
  title: '',
  subTitle: '',
  onClick: () => {},
  active: false,
};

export default Tab;
