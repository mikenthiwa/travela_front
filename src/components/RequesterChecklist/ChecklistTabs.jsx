import React, { Component, Fragment } from 'react'; 
import PropTypes from 'prop-types';
import './ChecklistTabs.scss';
import activeIcon from '../../images/icons/new-request-icons/icon.svg';

class ChecklistTabs extends Component {
  
  render() {
    const { checklist: { name, config }, tripNum, onTabClick, isActive } = this.props;
    
    return (
      <button
        type="button"
        onClick={onTabClick}
        className={`tab-header ${isActive ? 'selected' : ''}`}
      >
        <div className="tab-header-text-wrapper">
          <span className="tab-header-text">
            {`TRIP ${tripNum}`}
          </span>
          {isActive && (<img className="active-icon" src={activeIcon} alt="active-icon" />)}
        </div>
        <p className="tab-header-name">{name}</p>
      </button> 
    );
  }
}
ChecklistTabs.propTypes = {

  checklist: PropTypes.object.isRequired,
  tripNum: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default ChecklistTabs;
