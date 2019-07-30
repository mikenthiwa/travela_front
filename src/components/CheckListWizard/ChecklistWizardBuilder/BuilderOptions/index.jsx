import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import RadioOptions from './RadioOptions';
import Helper from './helper';

const BuilderOptions =  ({ item, handleItems }) => {

  const updateBehaviour = (behaviour, optionId, itemKey) => {
    const newOptions = item.configuration.options.map(item => item.id === optionId ? { ...item, [itemKey]: behaviour } : item);
    const newItem = {
      ...item,
      configuration: {
        ...item.configuration,
        options: newOptions,
      }
    };
    handleItems(newItem);
  };

  const addQuestion = () => {
    const newQuestion = { id: shortId.generate(), name: '', behaviour: {} };
    const newItem = {
      ...item,
      configuration: {
        ...item.configuration,
        options: [...item.configuration.options, newQuestion]
      }
    };
    handleItems(newItem);
  };

  const deleteQuestion = (id) => {
    const newItem = {
      ...item,
      behaviour: {},
      configuration: {
        ...item.configuration,
        options: item.configuration.options.filter(question => question.id !== id),
      }
    };
    handleItems(newItem);
  };

  const { configuration, order, type } = item;

  return (
    <div>
      {configuration.options.map((item, index) => (
        <div key={item.id}>
          <RadioOptions
            item={item}
            updateBehaviour={updateBehaviour}
            optionNumber={index + 1}
            deleteQuestion={deleteQuestion}
          />
        </div>
      ))}
      <button className="anoter-question-btn" onClick={() => addQuestion(order)} type="button">{`Add a ${Helper.getSuffix(configuration.options.length + 1)} option`}</button>
    </div>
  );
};

BuilderOptions.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired
};

export default BuilderOptions;
