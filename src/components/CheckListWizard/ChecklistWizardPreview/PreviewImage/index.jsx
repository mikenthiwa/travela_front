import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PreviewImage = ({ item }) => (
  <div className="single-preview-item image">
    <div className="preview-image-container">
      <img
        className="preview-image"
        src={item.imageURL || 'https://res.cloudinary.com/kossy360/image/upload/v1563066359/Rectangle.png'}
        alt="preview"
      />
    </div>
  </div>
);

PreviewImage.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PreviewImage;
