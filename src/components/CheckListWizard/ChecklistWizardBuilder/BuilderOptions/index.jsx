import React from 'react';
import PropTypes from 'prop-types';
import RadioOptions from './RadioOptions';
import Helper from './helper';

const BuilderOptions =  ({ type, addQuestion, configuration, updateBehaviour, order, deleteQuestion }) => (
  <div>
    {configuration.options.map((item, idx) => (
      <div key={item.id}>
        <RadioOptions
          type={type}
          updateBehaviour={updateBehaviour}
          order={order}
          name={item.name}
          optionId={item.id}
          optionNumber={idx + 1}
          deleteQuestion={deleteQuestion}
        />
      </div>
    ))}
    <button className="anoter-question-btn" onClick={() => addQuestion(order)} type="button">{`Add a ${Helper.getSuffix(configuration.options.length + 1)} option`}</button>
  </div>
);

BuilderOptions.propTypes = {
  order: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
  addQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default BuilderOptions;
