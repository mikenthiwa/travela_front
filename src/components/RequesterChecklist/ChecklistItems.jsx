import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewImage from '../CheckListWizard/ChecklistWizardPreview/PreviewImage';
import PreviewVideo from '../CheckListWizard/ChecklistWizardPreview/PreviewVideo';

class ChecklistItems extends Component {
  
  render () {
    const { config } = this.props;
    switch (config.type) {
    case 'checkbox':
      return  (<div>This is a checkbox option</div>);
    case 'image':
      return (<PreviewImage item={config} />);
    case 'radio':
      return (<div>This is a radio option</div>);
    case 'dropdown':
      return <div>This is dropdown</div>;
    case 'video':
      return (<PreviewVideo item={config} />);
    case 'scale':
      return <div>This is scale</div>;
    default:
      return null;
    }
  }
}

ChecklistItems.propTypes = {
  config: PropTypes.object.isRequired
};

export default ChecklistItems;
