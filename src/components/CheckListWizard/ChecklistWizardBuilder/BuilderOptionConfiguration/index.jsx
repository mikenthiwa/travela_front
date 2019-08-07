import React from 'react';
import PropTypes from 'prop-types';
import BuilderOptions from '../BuilderOptions';
import RenderCheckbox from '../CheckboxBuilder';
import ImageOptions from '../BuilderImage';
import VideoOptions from '../BuilderVideo';
import ScaleOptionBuilder from '../ScaleOptionBuilder';


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
    return (
      <ScaleOptionBuilder item={item} handleItems={handleItems} />
    );
  default:
    return null;
  }
};

BuilderOptionConfiguration.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired,
};

export default BuilderOptionConfiguration;
