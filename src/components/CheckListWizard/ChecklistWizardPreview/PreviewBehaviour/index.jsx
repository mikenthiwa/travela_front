import React from 'react';
import PropTypes from 'prop-types';
import * as behaviourTypes from '../../ChecklistWizardBuilder/BuilderBehaviour/behaviourActions';
import UploadDocument from './UploadDocument';
import NotifyEmail from './NotifyEmail';
import SkipToAnotherQuestion from './SkipToAnotherQuestion';
import PreviewDocument from './PreviewDocument';

const PreviewBehaviour = ({ behaviour }) => {
  if (!behaviour) return <div className="behaviour-style">This option has not been given a behaviour</div>;
  switch (behaviour.type) {
  case behaviourTypes.UPLOAD_DOCUMENT:
    return (<div className="behaviour-style"><UploadDocument behaviour={behaviour} /></div>);
  case behaviourTypes.PREVIEW_DOCUMENT:
    return (
      <div className="behaviour-style">
        <PreviewDocument 
          behaviour={behaviour}
        />
      </div>
    );
  case behaviourTypes.NOTIFY_EMAIL:
    return(
      <div className="behaviour-style">
        <NotifyEmail behaviour={behaviour} />
      </div>
    );
  default:
    return null;
  }
};

PreviewBehaviour.propTypes = {
  behaviour: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default PreviewBehaviour;
