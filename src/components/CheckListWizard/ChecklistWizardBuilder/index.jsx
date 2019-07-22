import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderChecklistItem from './BuilderChecklistItem';
import Nationality from './Nationality';
import Destination from './Destination';
import './index.scss';

class ChecklistWizardBuilder extends Component {
  render() {
    const { items, addNewChecklistItem, handleItems, addQuestion, updateBehaviour, deleteItem, deleteQuestion, updateNationality, updateDestinations } = this.props;
    return (
      <div className="checklist-wizard-builder checklist-wizard-col">
        <p className="builder-header">Setup the Checklist</p>
        <Nationality updateNationality={updateNationality}  />
        <Destination updateDestinations={updateDestinations} />
        <p className="builder-header">Checklist Item</p>
        {items.map(item => (
          <div key={item.order}>
            <BuilderChecklistItem 
              type={item.type}
              order={item.order}
              prompt={item.prompt}
              configuration={item.configuration}
              handleItems={handleItems}
              updateBehaviour={updateBehaviour}
              addQuestion={addQuestion}
              deleteItem={deleteItem}
              deleteQuestion={deleteQuestion}
            />
          </div>
        ))}
        <div className="new-checklist-container">
          <div onClick={addNewChecklistItem} tabIndex={0} role="button" onKeyUp={addNewChecklistItem} className="new-checklist-icon">+</div>
          <button className="wiz-btn" onClick={addNewChecklistItem} type="button">
            Add a Checklist Item
          </button>
        </div>
      </div>
    );
  }
}

ChecklistWizardBuilder.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  addNewChecklistItem: PropTypes.func.isRequired,
  handleItems: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateNationality: PropTypes.func.isRequired,
  updateDestinations: PropTypes.func.isRequired
};


export default ChecklistWizardBuilder;
