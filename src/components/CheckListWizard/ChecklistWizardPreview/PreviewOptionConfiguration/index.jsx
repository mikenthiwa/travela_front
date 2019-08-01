import React from 'react';
import PropTypes from 'prop-types';
import PreviewRadio from '../PreviewRadio';
import VideoPreview from '../PreviewVideo';
import PreviewCheckbox from '../PreviewCheckbox';
import PreviewImage from '../PreviewImage';

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
    return <div>This is dropdown</div>;
  case 'image':
    return (<PreviewImage item={item} />);
  case 'video':
    return (<VideoPreview item={item} />);
  case 'scale':
    return <div>This is scale</div>;
  default:
    return null;
  }
};

PreviewOptionConfiguration.propTypes = {
  handleSkipToQuestion: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PreviewOptionConfiguration;
