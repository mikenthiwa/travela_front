import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderOptionConfiguration from '../BuilderOptionConfiguration';
import DeleteIcon from '../../Shared/deleteIcon';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import DragIndicatorIcon from '../../images/baseline-drag_indicator-24px.svg';
import './index.scss';

class BuilderChecklistItem extends Component {
  handleItemType = (value) => {
    const { order, handleItems } = this.props;
    const event = {target: { value }};
    handleItems(event, order, 'type');
  }

  renderSelectItemTypes = (prompt, order, deleteItem) => {
    const { handleItems } = this.props;
    return (
      <div>
        <div>
          <p className="builder-prompt-title">Prompt</p>
          <div className="prompt-item">
            <input id="prompt-input" className="prompt-input" type="text" value={prompt} onChange={e => handleItems(e, order, 'prompt')} placeholder="e.g. Do you have a valid visa?" />
            <DeleteIcon id="prompt-del-icon" onClick={() => deleteItem(order)} />
          </div>
        </div>
        <div className="item-type-container">
          <p>Item Type</p>
          <div className="item-type-dropdown">
            <Dropdown dropdownOptions={MetaData.itemTypeDropdownMetaData} changeFunc={this.handleItemType} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { order, type, prompt, addQuestion, configuration, updateBehaviour, deleteItem, deleteQuestion } = this.props;
    return (
      <div className="builder-checklist-item">
        <div className="left-side-builder-checklist-item">
          <div>
            <img className="drag-indicator-icon" src={DragIndicatorIcon} alt="drag-indicator-icon" />
          </div>
          <div className="order-number">
            {order}
          </div>
        </div>

        <div>
          {this.renderSelectItemTypes(prompt, order, deleteItem)}
          <BuilderOptionConfiguration
            type={type}
            configuration={configuration}
            updateBehaviour={updateBehaviour}
            order={order}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        </div>
      </div>
    );
  }
}

BuilderChecklistItem.propTypes = {
  order: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
  handleItems: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default BuilderChecklistItem;
