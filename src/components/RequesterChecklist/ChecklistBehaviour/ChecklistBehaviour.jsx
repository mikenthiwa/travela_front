import React from 'react';
import PropTypes from 'prop-types';
import * as behaviourTypes from '../../CheckListWizard/ChecklistWizardBuilder/BuilderBehaviour/behaviourActions';
import ConnectedUploadDocument from './UploadDocument/UploadDocument';
import PreviewDocument from '../../CheckListWizard/ChecklistWizardPreview/PreviewBehaviour/PreviewDocument';
import NotifyEmail from '../../CheckListWizard/ChecklistWizardPreview/PreviewBehaviour/NotifyEmail';
import './ChecklistBehaviour.scss';

const BehaviourComponents = new Map([
  [behaviourTypes.UPLOAD_DOCUMENT, ConnectedUploadDocument],
  [behaviourTypes.PREVIEW_DOCUMENT, PreviewDocument],
  [behaviourTypes.NOTIFY_EMAIL, NotifyEmail],
]);


const ChecklistBehaviour = ({ behaviour, handleBehaviour }) => {

  if(!behaviour) return null;

  const Component = BehaviourComponents.get(behaviour.type);

  if(!Component) return null;

  return (
    <div className="checklist-behaviour">
      <Component behaviour={behaviour} handleBehaviour={handleBehaviour} />
    </div>
  );
};

ChecklistBehaviour.propTypes = {
  behaviour: PropTypes.object.isRequired,
  handleBehaviour: PropTypes.func.isRequired,
};

export default ChecklistBehaviour;
