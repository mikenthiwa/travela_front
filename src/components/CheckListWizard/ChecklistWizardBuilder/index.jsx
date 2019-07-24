import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderChecklistItem from './BuilderChecklistItem';
import Nationality from './Nationality';
import Destination from './Destination';
import './index.scss';


class ChecklistWizardBuilder extends Component {
  render() {
    const { 
      items, 
      addNewChecklistItem, 
      handleItems, 
      addQuestion, 
      updateBehaviour, 
      deleteItem, 
      deleteQuestion, 
      updateNationality, 
      updateDestinations,
      postChecklist
    } = this.props;
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
              items={items}
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
          <button className="wiz-btn" onClick={() => addNewChecklistItem(items)} type="button">
            Add a Checklist Item
          </button>
          <button className="wiz-btn" type="button" onClick={postChecklist}>
            Save As Draft
          </button>
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
  addQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func,
  deleteItem: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateNationality: PropTypes.func.isRequired,
  updateDestinations: PropTypes.func.isRequired,
  postChecklist: PropTypes.func.isRequired
};

export default ChecklistWizardBuilder;
