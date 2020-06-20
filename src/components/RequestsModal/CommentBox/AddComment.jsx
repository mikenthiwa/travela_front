
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageLink from '../../image-link/ImageLink';

class AddComment extends Component {
  render() {
    const { image } = this.props;
    return (
      <div className="modal__modal1">
        <span className="modal__oval-copy">
          <ImageLink
            imageSrc={image}
            altText="avatar"
            imageClass="modal__oval-copy" />
        </span>
        <span className="modal__add-comment">
            Add a comment
        </span>
      </div>
    );
  }
}

AddComment.propTypes = {
  image: PropTypes.string
};

AddComment.defaultProps = {
  image: ''
};

export default AddComment;
