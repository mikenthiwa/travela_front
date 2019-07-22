import React, { Component } from 'react';
import CheckListWizardHeader from '../../components/CheckListWizard/ChecklistWizardHeader';
import CheckListWizardBuilder from '../../components/CheckListWizard/ChecklistWizardBuilder';
import CheckListWizardPreview from '../../components/CheckListWizard/ChecklistWizardPreview';
import { ChecklistModel, OptionModel } from './checklistModel';
import helpers from './helpers';
import './index.scss';

class ChecklistWizard extends Component {
  state = {
    nationality: { name: '', emoji: ''},
    destinations: [],
    items: [
      {
        order: 1,
        prompt: '',
        type: '',
        configuration: {
          options: [
            {
              id: 1,
              name: '',
              behaviour: {}
            },
          ]
        }
      },
      
    ],
  }

  updateNationality = (name, emoji) => {
    this.setState({ nationality: {name, emoji }});
  }

  updateDestinations = (selectedCountries) => {
    this.setState({destinations: selectedCountries});
  }

  addNewChecklistItem = () => {
    const { items } = this.state;
    let newOrder; 
    items.length ?  newOrder = items[items.length - 1].order :  newOrder = 0;
    const newItem = ChecklistModel(newOrder);
    const currentItemsState = items;
    const newItems = helpers.arrangeChecklistByOrder([...currentItemsState, newItem]);
    this.setState({ items: newItems });
  };

  addQuestion = (order) => {
    const { items } = this.state;
    const newItem = OptionModel();
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    item.configuration.options.push(newItem);
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    this.setState({items: newItems});
  }

  deleteQuestion = (order, optionId) => {
    const { items } = this.state;
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    const newOptions= item.configuration.options.filter(question => question.id !== optionId);
    item.configuration.options = newOptions;
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    this.setState({items: newItems});
  }

  updateBehaviour = (behaviour, order, optionId, itemKey) => {
    const { items } = this.state;
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    item.configuration.options.map(item => {
      if (item.id === optionId) {
        item[itemKey] = behaviour;
      }
      return item;
    });
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    this.setState({items: newItems});
  };

  handleItems = ({target}, order, itemKey) => {
    const { items } = this.state;
    const item = items.find(item => item.order === order);
    const newState = items.filter(item => item.order !== order);
    item[itemKey] = target.value;
    const newItems = helpers.arrangeChecklistByOrder([item, ...newState]);
    this.setState({items: newItems});
  }

  deleteItem =  order => {
    const { items } = this.state;
    const newState = items.filter(item => item.order !== order);
    const newItems = helpers.arrangeChecklistByOrder([...newState]);
    const reorderItems = helpers.reorderItems(newItems);
    this.setState({items: [...reorderItems]});
  }



  render() {
    const { items, nationality, destinations } = this.state;
    return (
      <div>
        <CheckListWizardHeader />
        <div className="checklist-wizard-container">
          <CheckListWizardBuilder 
            items={items} 
            addNewChecklistItem={this.addNewChecklistItem}
            handleItems={this.handleItems}
            updateBehaviour={this.updateBehaviour}
            addQuestion={this.addQuestion}
            nationality={nationality}
            updateNationality={this.updateNationality}
            deleteItem={this.deleteItem}
            deleteQuestion={this.deleteQuestion}
            updateDestinations={this.updateDestinations}
          />
          <CheckListWizardPreview nationality={nationality} destinations={destinations} items={items} />
        </div>
      </div>
    );
  }
}

export default ChecklistWizard;

