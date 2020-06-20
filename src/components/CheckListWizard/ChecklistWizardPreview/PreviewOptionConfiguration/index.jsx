import React from 'react';
import PropTypes from 'prop-types';
import PreviewRadio from '../PreviewRadio';
import VideoPreview from '../PreviewVideo';
import PreviewCheckbox from '../PreviewCheckbox';
import PreviewImage from '../PreviewImage';
import PreviewDropdown from '../PreviewDropdown';
import ScalePreview from '../PreviewScaleOption/PreviewScale';

const PreviewOptionConfiguration = ({ item, handleSkipToQuestion }) => {
  switch (item.type) {
  case 'radio':
    return (
      <PreviewRadio
        item={item}
        handleSkipToQuestion={handleSkipToQuestion}
      />
    );
  case 'checkbox':
    return (
      <PreviewCheckbox
        item={item}
        handleSkipToQuestion={handleSkipToQuestion}
      />
    );
  case 'dropdown':
    return (
      <PreviewDropdown 
        item={item}
      />
    );
  case 'image':
    return (<PreviewImage item={item} />);
  case 'video':
    return (<VideoPreview item={item} />);
  case 'scale':
    return (
      <ScalePreview item={item} />
    );
  default:
    return null;
  }
};

PreviewOptionConfiguration.propTypes = {
  handleSkipToQuestion: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PreviewOptionConfiguration;
