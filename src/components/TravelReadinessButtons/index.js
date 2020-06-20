import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Buttons';
import './TravelReadinessButtons.scss';


class TravelReadinessButtons extends Component {

  render() {
    const { activeButton, filterListOnClick } = this.props;
    return (
      <div className="travel-readiness-buttons">
        <Button 
          id="travel-readiness-all-button"
          text="All"
          buttonClass={`btn btn--${activeButton === 'all'? 'active' : ''}`}
          onClick={() => filterListOnClick('all')}          
        />
        <Button 
          id="travel-readiness-withDocuments-button"
          text="With Documents"
          buttonClass={`btn btn--${activeButton === 'withDocuments'? 'active' : ''}`}
          onClick={() => filterListOnClick('withDocuments')}
        />
      </div>
      
    );
  }
}

TravelReadinessButtons.propTypes = {
  activeButton: PropTypes.string.isRequired,
  filterListOnClick: PropTypes.func.isRequired
};

export default TravelReadinessButtons;
