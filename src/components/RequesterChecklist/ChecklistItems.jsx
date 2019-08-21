import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewImage from '../CheckListWizard/ChecklistWizardPreview/PreviewImage';
import PreviewVideo from '../CheckListWizard/ChecklistWizardPreview/PreviewVideo';
import RequesterViewCheckbox from '../CheckListWizard/ChecklistWizardRequester/PreviewCheckbox/index';
import PreviewScale from '../CheckListWizard/ChecklistWizardPreview/PreviewScaleOption';
import PreviewDropdown from '../CheckListWizard/ChecklistWizardPreview/PreviewDropdown';

class ChecklistItems extends Component {
  render () {
    const { config, handleSkipToQuestion } = this.props;
    switch (config.type) {
    case 'checkbox':
      return (
        <RequesterViewCheckbox 
          handleSkipToQuestion={handleSkipToQuestion}
          item={config}
        
        />
      );
    case 'image':
      return (<PreviewImage item={config} />);
    case 'radio':
      return (<div>This is a radio option</div>);
    case 'dropdown':
      return (<PreviewDropdown item={config} />);
    case 'video':
      return (<PreviewVideo item={config} />);
    case 'scale':
      return (<PreviewScale item={config} />);
    default:
      return null;
    }
  }
}

ChecklistItems.propTypes = {
  config: PropTypes.object.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired
};

export default ChecklistItems;
