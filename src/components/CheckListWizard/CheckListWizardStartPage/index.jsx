
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';
import checklistImage from '../../../images/checklist-image.svg';

const ChecklistWizardStartPage = ({fullName}) => {
  return ( 
    <div className="start-page">
      <p className="intro">Welcome to The Travel CheckList Wizard</p>
      <img src={checklistImage} alt="checklist" />
      <p className="welcome-message">
        Hi 
        {' '}
        {fullName.split(' ')[0]}
        , here you can setup travel checklists to enable Andelans get prepared for their journey.
      </p>
      <Link
        href="/trip-planner/checklist-wizard"
        to="/trip-planner/checklist-wizard"
      >
        <button 
          type="button" 
          className="get-started"
        >
        Get Started
        </button>
      </Link>
     
    </div>
  );
};

ChecklistWizardStartPage.propTypes = {
  fullName: PropTypes.string.isRequired
};

export default ChecklistWizardStartPage;
