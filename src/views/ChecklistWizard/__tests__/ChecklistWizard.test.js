import React, { Children } from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
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
  resetChecklist: jest.fn(),
  mapStateToProps: jest.fn(),
  undoChecklist: jest.fn(),
  redoChecklist: jest.fn(),
  resetChecklist: jest.fn(),
  getSingleChecklist: jest.fn(),
  updateChecklist: jest.fn(),
  getChecklistFromStorage: jest.fn(),
  match: { params: { checklistId: 1 } },
  location: { search: 'make_copy?=2' },
};

jest.mock('../../../components/CheckListWizard/ChecklistWizardHeader', () => {
  const Component = () => (<div />);
  return Component;
});

describe('<ChecklistWizard />', () => {
  const mockStore = configureStore();

  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should call debounce when component did update', () => {
    const updatedChecklist = {
      nationality: { name: 'Nigeria' },
      items: [{ name: 'items' }],
      destinations: [{name: 'Nigeria'}, {name: 'Kenya'}]
    }
    const wrapper = shallow(<ChecklistWizard {...props} />);

    jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ checklistWizard: updatedChecklist })
    expect(wrapper.instance().props.checklistWizard).toEqual(updatedChecklist);

    wrapper.unmount();
  });

  it('should clear the form when the component unmounts', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    const componentWillUnmount = jest.spyOn(
      wrapper.instance(),
      'componentWillUnmount'
    );
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
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

  it('should call getSingleChecklist', () => {
    const queryId = 1;
    const wrapper = shallow(<ChecklistWizard {...props} queryId={queryId} />);
    wrapper.instance().componentDidMount();
    expect(props.getSingleChecklist).toHaveBeenCalledWith(queryId);
  });

  it('should update the checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} match={{params: {checklistId: 1 }}} />);
    wrapper.instance().postChecklist();
    expect(props.updateChecklist).toHaveBeenCalled();
  });

  it('should create a checklist', () => {
    const match = { params: { checklistId: 1 }}
    const wrapper = shallow(<ChecklistWizard {...props} match={{params: {checklistId: '' }}}  />);
    wrapper.instance().postChecklist();
    expect(props.createDynamicChecklist).toHaveBeenCalled();
  });

  it('should handle drag end', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 0 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 1 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });

  it('does not call handlechecklistitems when position does not change', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    props.handleChecklistItems.mockClear();
    wrapper.instance().onDragEnd({ destination: { index: 1 }, source: { index: 1 }, draggableId: 'id' });
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(0);
  });

  it('does not call handlechecklistitems when drop area is invalid', () => {
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
