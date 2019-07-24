import React from 'react';
import PropTypes from 'prop-types';
import BuilderOptions from '../BuilderOptions';
import RenderCheckbox from '../CheckboxBuilder';


const BuilderOptionConfiguration = ({
  type,
  configuration,
  updateBehaviour,
  order,
  addQuestion,
  deleteQuestion,
  items
}) => {
  switch (type) {
  case 'radio':
    return (
      <BuilderOptions
        type={type}
        configuration={configuration}
        order={order}
        items={items}
        updateBehaviour={updateBehaviour}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  case 'checkbox':
    return (
      <RenderCheckbox
        configuration={configuration}
        order={order}
        items={items}
        updateBehaviour={updateBehaviour}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  case 'dropdown':
    return <div>This is dropdown</div>;
  case 'image':
    return <div>This is image</div>;
  case 'video':
    return <div>This is video</div>;
  case 'scale':
    return <div>This is scale</div>;
  default:
    return null;
  }
};

BuilderOptionConfiguration.propTypes = {
  order: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
  addQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default BuilderOptionConfiguration;
