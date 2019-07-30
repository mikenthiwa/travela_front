import React from 'react';
import PropTypes from 'prop-types';
import * as behaviourTypes from '../../ChecklistWizardBuilder/BuilderBehaviour/behaviourActions';
import UploadDocument from './UploadDocument';
import NotifyEmail from './NotifyEmail';
import SkipToAnotherQuestion from './SkipToAnotherQuestion';

const PreviewBehaviour = ({ behaviour, handleSkipToQuestion }) => {
  switch (behaviour.type) {
  case behaviourTypes.UPLOAD_DOCUMENT:
    return (<div className="behaviour-style"><UploadDocument behaviour={behaviour} /></div>);
  case behaviourTypes.SKIP_QUESTION:
    return (
      <div className="behaviour-style">
        <SkipToAnotherQuestion behaviour={behaviour} handleSkipToQuestion={handleSkipToQuestion} />
      </div>
    );
  case behaviourTypes.PREVIEW_DOCUMENT:
    return <div className="behaviour-style">Preview Document</div>;
  case behaviourTypes.NOTIFY_EMAIL:
    return(
      <div className="behaviour-style">
        <NotifyEmail behaviour={behaviour} />
      </div>
    );
  default:
    return <div className="behaviour-style">This option has not been given a behaviour</div>;
  }
};

PreviewBehaviour.defaultProps = {
  handleSkipToQuestion: () => {},
};

PreviewBehaviour.propTypes = {
  handleSkipToQuestion: PropTypes.func,
  behaviour: PropTypes.object.isRequired,
};

export default PreviewBehaviour;
