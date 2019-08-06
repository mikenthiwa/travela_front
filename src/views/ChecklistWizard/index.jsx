import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import CheckListWizardHeader from '../../components/CheckListWizard/ChecklistWizardHeader';
import CheckListWizardBuilder from '../../components/CheckListWizard/ChecklistWizardBuilder';
import CheckListWizardPreview from '../../components/CheckListWizard/ChecklistWizardPreview';
import { ChecklistModel } from './checklistModel';
import {
  handleChecklistItems,
  updateChecklistNationality,
  updateChecklistDestination,
  createDynamicChecklist,
  undoChecklist,
  redoChecklist,
  resetChecklist,
} from '../../redux/actionCreator/travelChecklistWizardActions';
import './index.scss';

export class ChecklistWizard extends Component {

  componentWillMount() {
    const { resetChecklist } = this.props;
    resetChecklist();
  }

  componentWillUnmount() {
    const { resetChecklist } = this.props;
    resetChecklist();
  }

  addNewChecklistItem = () => {
    const { checklistWizard: { items }, handleChecklistItems } = this.props;
    const newItems = [...items, ChecklistModel(items.length)];
    handleChecklistItems(newItems);
  };

  deleteItem = id => {
    const { checklistWizard: { items }, handleChecklistItems } = this.props;
    const newItems = items.filter(item => item.id !== id)
      .map((item, index) => ({ ...item, order: index + 1 }));
    handleChecklistItems(newItems);
  }

  handleItems = (updatedItem) => {
    const { checklistWizard: { items }, handleChecklistItems } = this.props;
    const newItems = items.map((item) => item.id === updatedItem.id ? updatedItem : item);
    handleChecklistItems(newItems);
  }

  updateNationality = (name, emoji) => {
    const { updateChecklistNationality } = this.props;
    updateChecklistNationality({ name, emoji });
  }

  updateDestinations = (selectedCountries) => {
    const { updateChecklistDestination } = this.props;
    updateChecklistDestination(selectedCountries);
  }

  postChecklist = () => {
    const { checklistWizard, createDynamicChecklist } = this.props;
    createDynamicChecklist(checklistWizard);
  }

  onDragEnd = ({ destination, source, draggableId }) => {
    if(!destination) { return; }
    if(source.index === destination.index) { return; }

    const { checklistWizard: { items }, handleChecklistItems } = this.props;
    let newItems = items.filter(item => item.id !== draggableId);

    newItems.splice(destination.index, 0, items[source.index]);
    newItems = newItems.map((item, index) => ({ ...item, order: index + 1 }));
    handleChecklistItems(newItems);
  }

  render() {
    const { checklistWizard, undoChecklist, redoChecklist } = this.props;
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <div>
          <CheckListWizardHeader 
            disableUndo={checklistWizard.disableUndo}  
            disableRedo={checklistWizard.disableRedo}  
            undoChecklist={undoChecklist} 
            redoChecklist={redoChecklist}
            resetChecklist={resetChecklist}
          />
          <div className="checklist-wizard-container">
            <CheckListWizardBuilder
              items={checklistWizard.items}
              handleItems={this.handleItems}
              addNewChecklistItem={this.addNewChecklistItem}
              nationality={checklistWizard.nationality}
              destinations={checklistWizard.destinations}
              updateNationality={this.updateNationality}
              deleteItem={this.deleteItem}
              updateDestinations={this.updateDestinations}
              postChecklist={this.postChecklist}
            />
            <CheckListWizardPreview
              nationality={checklistWizard.nationality}
              destinations={checklistWizard.destinations}
              items={checklistWizard.items}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}


ChecklistWizard.propTypes = {
  checklistWizard: PropTypes.object.isRequired,
  handleChecklistItems: PropTypes.func.isRequired,
  updateChecklistNationality: PropTypes.func.isRequired,
  updateChecklistDestination: PropTypes.func.isRequired,
  createDynamicChecklist: PropTypes.func.isRequired,
  undoChecklist: PropTypes.func.isRequired,
  redoChecklist: PropTypes.func.isRequired,
  resetChecklist: PropTypes.func.isRequired,
};

export const mapStateToProps = checklistWizard => checklistWizard;

const mapDispatchToProps = {
  handleChecklistItems,
  updateChecklistNationality,
  updateChecklistDestination,
  createDynamicChecklist,
  undoChecklist,
  redoChecklist,
  resetChecklist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistWizard);
