import React, { Children } from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChecklistWizard, mapStateToProps } from '..';



const props = {
  checklistWizard : {
    nationality: { 
      name: '', 
      emoji: ''
    },
    destinations: [],
    items: [
      {
        id: 'id',
        order: 1,
        prompt: '',
        type: '',
        behaviour: {},
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
      {
        id: 'id1',
        order: 2,
        prompt: '',
        type: '',
        behaviour: {},
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
  },
  handleChecklistItems: jest.fn(),
  updateChecklistNationality: jest.fn(),
  updateChecklistDestination: jest.fn(),
  createDynamicChecklist: jest.fn(),
  mapStateToProps: jest.fn()
};

jest.mock('../../../components/CheckListWizard/ChecklistWizardHeader', () => {
  const Component = () => (<div />);
  return Component;
});


describe('<ChecklistWizard />', () => {
  const mockStore = configureStore();
  const store = mockStore('nukuknkun');


  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });


  it('should handle update nationality', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateNationality('nigeria', '9jaflag');
    expect(props.updateChecklistNationality).toHaveBeenCalledTimes(1);
  });


  it('should handle update destination', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateDestinations(['USA', 'Brazil', 'Japan']);
    expect(props.updateChecklistDestination).toHaveBeenCalledTimes(1);
  });


  it('should handle new checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().addNewChecklistItem();
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });

  it('should handle item', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().handleItems(props.checklistWizard.items[0]);
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });
  
  it('should delete item', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().deleteItem('id');
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });

  it('should create a checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().postChecklist();
    expect(props.createDynamicChecklist).toHaveBeenCalledTimes(1);
  });

  it('should handle drag end', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 0 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 1 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });

  it('does not call handlecheclistitems when position does not change', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 1 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(0);
  });

  it('does not call handlecheclistitems when drop area is invalid', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().onDragEnd({ destination: null, source: { index: 1 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(0);
  });

  it('returns the reducer passed to it', () => {
    const result = mapStateToProps(props.checklistWizard);
    expect(result).toEqual(props.checklistWizard);
  });
});
