import React from 'react';
import PropTypes from 'prop-types';
import * as behaviourTypes from '../CheckListWizard/ChecklistWizardBuilder/BuilderBehaviour/behaviourActions';
import ConnectedUploadDocument from './UploadDocument/UploadDocument';
import './ChecklistBehaviour.scss';

const ChecklistBehaviour = ({ behaviour, handleBehaviour}) => {
  switch (behaviour.type) {
  case behaviourTypes.UPLOAD_DOCUMENT:
    return (
      <div className="checklist-behaviour">
        <ConnectedUploadDocument behaviour={behaviour} handleBehaviour={handleBehaviour} />
      </div>);
  default:
    return <div className="behaviour-style">This option has not been given a behaviour</div>;
  }
};

ChecklistBehaviour.propTypes = {
  behaviour: PropTypes.object.isRequired,
};

export default ChecklistBehaviour;
