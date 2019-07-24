import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckListWizardHeader from '../../components/CheckListWizard/ChecklistWizardHeader';
import CheckListWizardBuilder from '../../components/CheckListWizard/ChecklistWizardBuilder';
import CheckListWizardPreview from '../../components/CheckListWizard/ChecklistWizardPreview';
import { ChecklistModel, OptionModel } from './checklistModel';
import {
  handleAddChecklistItem,
  handleChecklistItems,
  addChecklistQuestion,
  deleteChecklistItems,
  deleteChecklistQuestion,
  updateChecklistBehaviour,
  updateChecklistNationality,
  updateChecklistDestination,
  createDynamicChecklist
} from '../../redux/actionCreator/travelChecklistWizardActions';
import helpers from './helpers';
import './index.scss';

export class ChecklistWizard extends Component {
  addNewChecklistItem = () => {
    const { checklistWizard: { items }, handleAddChecklistItem } = this.props;
    let newOrder;
    items.length ? newOrder = items[items.length - 1].order : newOrder = 0;
    const newItem = ChecklistModel(newOrder);
    const currentItemsState = items;
    const newItems = helpers.arrangeChecklistByOrder([...currentItemsState, newItem]);
    handleAddChecklistItem(newItems);
  };

  deleteItem = order => {
    const { deleteChecklistItems } = this.props;
    deleteChecklistItems(order);
  }

  handleItems = ({ target }, order, itemKey) => {
    const { checklistWizard: { items }, handleChecklistItems } = this.props;
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    item[itemKey] = target.value;
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    handleChecklistItems(newItems);
  }

  addQuestion = (order) => {
    const { checklistWizard: { items }, addChecklistQuestion } = this.props;
    const newItem = OptionModel();
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    item.configuration.options.push(newItem);
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    addChecklistQuestion(newItems);
  }

  deleteQuestion = (order, optionId) => {
    const { checklistWizard: { items }, deleteChecklistQuestion } = this.props;
    const item = items.find(item => item.order === order);
    item.behaviour = {};
    const newState = items.filter(item => item.order !== order);
    const newOptions = item.configuration.options.filter(question => question.id !== optionId);
    item.configuration.options = newOptions;
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    deleteChecklistQuestion(newItems);
  }

  updateBehaviour = (behaviour, order, optionId, itemKey, type) => {
    const { checklistWizard: { items }, updateChecklistBehaviour } = this.props;
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    if (type === 'checkbox') {
      items.map(item => {
        if (item.order === order) {
          item.behaviour = behaviour;
        }
        return item;
      });
    } else {
      item.configuration.options.map(item => {
        if (item.id === optionId) {
          item[itemKey] = behaviour;
        }
        return item;
      });
    }
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    updateChecklistBehaviour(newItems);
  };

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

  render() {
    const { checklistWizard } = this.props;
    return (
      <div>
        <CheckListWizardHeader />
        <div className="checklist-wizard-container">
          <CheckListWizardBuilder
            items={checklistWizard.items}
            handleItems={this.handleItems}
            addNewChecklistItem={this.addNewChecklistItem}
            updateBehaviour={this.updateBehaviour}
            addQuestion={this.addQuestion}
            nationality={checklistWizard.nationality}
            updateNationality={this.updateNationality}
            deleteItem={this.deleteItem}
            deleteQuestion={this.deleteQuestion}
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
    );
  }
}


ChecklistWizard.propTypes = {
  checklistWizard: PropTypes.object.isRequired,
  handleAddChecklistItem: PropTypes.func.isRequired,
  handleChecklistItems: PropTypes.func.isRequired,
  addChecklistQuestion: PropTypes.func.isRequired,
  deleteChecklistItems: PropTypes.func.isRequired,
  deleteChecklistQuestion: PropTypes.func.isRequired,
  updateChecklistBehaviour: PropTypes.func.isRequired,
  updateChecklistNationality: PropTypes.func.isRequired,
  updateChecklistDestination: PropTypes.func.isRequired,
  createDynamicChecklist: PropTypes.func.isRequired
};

export const mapStateToProps = checklistWizard => checklistWizard;

const mapDispatchToProps = {
  handleAddChecklistItem,
  handleChecklistItems,
  addChecklistQuestion,
  deleteChecklistItems,
  deleteChecklistQuestion,
  updateChecklistBehaviour,
  updateChecklistNationality,
  updateChecklistDestination,
  createDynamicChecklist
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistWizard);
