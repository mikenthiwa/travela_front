import React, { Component } from 'react';
import {WithContext as ReactTags } from 'react-tag-input';
import { PropTypes }  from 'prop-types';
import './TagsInput.scss';

class TagsInput extends Component{

  state = {
    tags:  []
  };

  static getDerivedStateFromProps(nextProps) {
    const tags = nextProps.value;
    return tags ? { tags: tags.map( tag => ({ id: tag, text: tag}))} : null;
  }

  handleAddition =(tag) => {
    const { handleAddition } = this.props;
    this.addTag(tag, handleAddition);
  };

  addTag = ( tag, addHandler) => {
    const { max } = this.props;
    const { tags } = this.state;
    if( !max || ( max && tags.length < max) ) {
      const newTags = [...tags, tag];
      this.setState({tags: newTags});
      addHandler(newTags.map( tag => tag.text));
    }
  };

  handleDeletion = (i) => {
    const { handleDelete } = this.props;
    const { tags: prevTags } = this.state;
    prevTags.splice(i, 1);
    this.setState({tags: prevTags});
    handleDelete(prevTags.map( tag => tag.text));
  };

  handleInputBlur = (value) => {
    const { tags } = this.state;
    const { handleInputBlur } = this.props;
    if( value.trim() !== ''){
      this.addTag({id: value, text: value}, handleInputBlur);
    } else {
      handleInputBlur(tags.map( tag => tag.text));
    }
  };

  render() {
    const { tags } = this.state;
    return (
      <ReactTags
        tags={tags}
        inline
        {...this.props}  
        autofocus={false}
        handleAddition={this.handleAddition}
        handleDelete={this.handleDeletion}
        handleInputBlur={this.handleInputBlur}
        allowDragDrop={false}
      />
    );
  }
}

TagsInput.propTypes = {
  handleAddition: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired,
  max: PropTypes.number
};

TagsInput.defaultProps =  {
  max: null
};

export const KeyCodes = {
  COMMA : 188,
  ENTER: 13,
  TAB: 9
};

export default TagsInput;
