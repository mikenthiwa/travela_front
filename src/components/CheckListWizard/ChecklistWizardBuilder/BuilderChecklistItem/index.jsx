/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import BuilderOptionConfiguration from '../BuilderOptionConfiguration';
import DeleteIcon from '../../Shared/deleteIcon';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import DragIndicatorIcon from '../../images/baseline-drag_indicator-24px.svg';
import DraggingIndicatorIcon from '../../images/drag-active-indicator.svg';
import './index.scss';

class BuilderChecklistItem extends Component {

  orderNumberRef = React.createRef();

  componentDidUpdate (prevProps) {
    const { index } = this.props;
    this.orderNumberRef.current.classList[index === prevProps.index ? 'remove' : 'add']('animate');
  }

  handleItemType = (value) => {
    const { item, handleItems } = this.props;
    const newItem = { ...item, type: value };
    handleItems(newItem);
  }

  handlePromptChange = e => {
    const { item, handleItems } = this.props;
    const newItem = { ...item, prompt: e.target.value };
    handleItems(newItem);
  }

  renderSelectItemTypes = () => {
    const { item: { prompt, id }, deleteItem } = this.props;
    return (
      <div>
        <div>
          <p className="builder-prompt-title">Prompt</p>
          <div className="prompt-item">
            <input id="prompt-input" className="prompt-input" type="text" value={prompt} onChange={this.handlePromptChange} placeholder="e.g. Do you have a valid visa?" />
            <DeleteIcon id="prompt-del-icon" onClick={() => deleteItem(id)} />
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
    const { item, handleItems, index } = this.props;
    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided, { isDragging, draggingOver }) => {
          return (
            <div 
              className={`builder-checklist-item ${isDragging ? 'dragging' : ''} ${!draggingOver ? 'invalid' : ''}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="left-side-builder-checklist-item">
                <div className="drag-icon-wrapper">
                  <img 
                    {...provided.dragHandleProps}
                    className="drag-indicator-icon"
                    src={isDragging ? DraggingIndicatorIcon : DragIndicatorIcon} 
                    alt="drag-indicator-icon"
                  />
                </div>
                <div ref={this.orderNumberRef} className="order-number">{item.order}</div>
              </div>
              <div>
                {this.renderSelectItemTypes()}
                <BuilderOptionConfiguration
                  item={item}
                  handleItems={handleItems}
                />
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

BuilderChecklistItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default BuilderChecklistItem;
