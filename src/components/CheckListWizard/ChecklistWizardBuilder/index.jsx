import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import BuilderChecklistItem from './BuilderChecklistItem';
import Nationality from './Nationality';
import Destination from './Destination';
import addIcon from '../images/add-icon.svg';
import './index.scss';


class ChecklistWizardBuilder extends Component {
  render() {
    const { 
      items, 
      addNewChecklistItem, 
      handleItems, 
      addQuestion, 
      deleteItem, 
      updateNationality, 
      updateDestinations,
      postChecklist,
      nationality,
      destinations,
    } = this.props;
    return (
      <div className="checklist-wizard-builder checklist-wizard-col">
        <div className="checklist-wizard-builder-wrapper">
          <p className="builder-header first">Setup the Checklist</p>
          <Nationality nationality={nationality} updateNationality={updateNationality}  />
          <Destination destinations={destinations} updateDestinations={updateDestinations} />
          <p className="builder-header second">Checklist Item</p>
          <Droppable droppableId={1}>
            {provided => (
              <div className="main-builder" ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <BuilderChecklistItem
                    index={index}
                    key={item.id}
                    item={item}
                    handleItems={handleItems}
                    addQuestion={addQuestion}
                    deleteItem={deleteItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="new-checklist-container">
            <button className="new-checklist-icon" onClick={addNewChecklistItem} type="button">
              <img src={addIcon} alt="checklist icon" />
            </button>
            <div className="checklist-action-btns-wrapper">
              <button className="wiz-btn" onClick={addNewChecklistItem} type="button">
              Add a Checklist Item
              </button>
              <button className="wiz-btn" type="button" onClick={postChecklist}>
              Save As Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChecklistWizardBuilder.defaultProps = {
  updateBehaviour: () => {},
};

ChecklistWizardBuilder.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  addNewChecklistItem: PropTypes.func.isRequired,
  handleItems: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func,
  deleteItem: PropTypes.func.isRequired,
  updateNationality: PropTypes.func.isRequired,
  updateDestinations: PropTypes.func.isRequired,
  postChecklist: PropTypes.func.isRequired,
  nationality: PropTypes.objectOf(PropTypes.string).isRequired,
  destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChecklistWizardBuilder;
