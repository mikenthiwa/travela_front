import React from 'react';
import PropTypes from 'prop-types';
import BuilderOptions from '../BuilderOptions';
import RenderCheckbox from '../CheckboxBuilder';
import ImageOptions from '../BuilderImage';
import VideoOptions from '../BuilderVideo';


const BuilderOptionConfiguration = ({ item, handleItems }) => {
  switch (item.type) {
  case 'radio':
    return (
      <BuilderOptions
        item={item}
        handleItems={handleItems}
      />
    );
  case 'checkbox':
    return (
      <RenderCheckbox
        item={item}
        handleItems={handleItems}
      />
    );
  case 'dropdown':
    return (
      <BuilderOptions
        item={item}
        handleItems={handleItems}
      />
    );
  case 'image':
    return (
      <ImageOptions
        item={item}
        handleItems={handleItems}
      />
    );
  case 'video':
    return (
      <VideoOptions 
        item={item}
        handleItems={handleItems} 
      />
    );
  case 'scale':
    return <div>This is scale</div>;
  default:
    return null;
  }
};

BuilderOptionConfiguration.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired,
};

export default BuilderOptionConfiguration;
